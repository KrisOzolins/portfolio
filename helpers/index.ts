import ReactDOMServer from 'react-dom/server';

const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function parseWorkExperience(input: string) {
  const workExperience: any[] = [];
  const lines = input.split('\n');

  let currentJob: any = null;

  lines.forEach((line: string) => {
    if (line.startsWith('##')) {
      if (currentJob) {
        // Add the previous job to the workExperience array before starting a new one.
        workExperience.push(currentJob);
      }

      // Start a new job entry
      const header = line.replace('##', '').trim().split(' / ');
      currentJob = {
        title: header[0], // Position.
        company: header.length > 1 ? header[1] : '', // Company, if exists.
        date: '',
        tech: '',
        desc: '',
      };
    } else if (line.startsWith('* Date:')) {
      // Extract the date.
      currentJob.date = line.replace('* Date:', '').trim();
    } else if (line.startsWith('* Tech:')) {
      // Extract the technologies used.
      currentJob.tech = line.replace('* Tech:', '').trim();
    } else if (line.startsWith('* Desc:')) {
      // Extract the job description.
      currentJob.desc = line.replace('* Desc:', '').trim();
    }
  });

  // Don't forget to add the last job.
  if (currentJob) {
    workExperience.push(currentJob);
  }

  return workExperience;
}

function parseEducation(input: string) {
  const education: any[] = [];
  const lines = input.split('\n');

  let currentInstitution: any = null;

  lines.forEach((line) => {
    if (line.startsWith('##')) {
      if (currentInstitution) {
        // Push the previous institution before starting a new one.
        education.push(currentInstitution);
      }

      // Start a new institution entry.
      currentInstitution = {
        title: line.replace('##', '').trim(),
        date: '',
        desc: '',
      };
    } else if (line.startsWith('* Date:')) {
      // Extract date.
      currentInstitution.date = line.replace('* Date:', '').trim();
    } else if (line.startsWith('* Desc:')) {
      // Extract description.
      currentInstitution.desc = line.replace('* Desc:', '').trim();
    }
  });

  // Don't forget to add the last institution.
  if (currentInstitution) {
    education.push(currentInstitution);
  }

  return education;
}

function parseSkills(input: string) {
  const skills: any[] = [];

  // Split the input by lines.
  const lines = input.split('\n');

  let currentCategory: any = null;

  lines.forEach((line) => {
    // Check if the line is a category header.
    if (line.startsWith('##')) {
      // Extract the category name by removing '##' and trimming whitespace.
      const categoryName = line.replace('##', '').trim();

      // Create a new category object and add it to the skills array.
      currentCategory = { name: categoryName, skills: [] };
      skills.push(currentCategory);
    } else if (line.startsWith('*')) {
      // It's a skill, add it to the current category's skills array.
      // We remove the '*' and trim whitespace to get the skill name.
      const skillName = line.replace('*', '').trim();

      if (currentCategory) {
        currentCategory.skills.push(skillName);
      }
    }
  });

  return skills;
}

// Function which detects if the input string is a url or a Markdown url and returns <a>.
function detectUrl(input: string) {
  // If ends with .com or .lv.
  if (input.endsWith('.com') || input.endsWith('.lv')) {
    const url = !input.startsWith('http') ? `https://${input}` : input;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${input}</a>`;
  }

  // If regex matches MD url format.
  const mdUrlRegex = /\[(.*?)\]\((.*?)\)/;
  const mdUrlMatch = input.match(mdUrlRegex);
  if (mdUrlMatch) {
    return `<a href="${mdUrlMatch[2]}" target="_blank" rel="noopener noreferrer">${mdUrlMatch[1]}</a>`;
  }

  return input;
}

function parseMD(markdownText: string) {
  let htmlText;

  // Convert links: [text](href) to <a href="href">text</a>.
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  htmlText = markdownText.replace(linkRegex, '<a href="$2" class="underline" target="_blank">$1</a>');

  // Convert newlines to <br> tags.
  htmlText = htmlText.replace(/\n/g, '<br>');

  // Convert bold text: **text** to <strong>text</strong>.
  const boldRegex = /\*\*(.*?)\*\*/g;
  htmlText = htmlText.replace(boldRegex, '<strong>$1</strong>');

  // Convert italic text: *text* to <em>text</em>.
  const italicRegex = /\*(.*?)\*/g;
  htmlText = htmlText.replace(italicRegex, '<em>$1</em>');

  // Convert code text: `text` to <code>text</code>.
  const codeRegex = /`(.*?)`/g;
  htmlText = htmlText.replace(codeRegex, '<code>$1</code>');

  // Convert titles to h1 - h6 tags.
  const titleRegex = /^#{1,6} (.*$)/gm;
  htmlText = htmlText.replace(titleRegex, (match, p1) => {
    const level = match.split(' ')[0].length;
    return `<h${level}>${p1}</h${level}>`;
  });

  // todo: Complete and test the list and paragraph conversion below.

  // Convert lists to li tags.
  // const listRegex = /^\* (.*)$/gm;
  // htmlText = htmlText.replace(listRegex, '<li>$1</li>');
  // Wrap groups of li tags in ul tags. Each group of li tags is separated by any other element which is not <li> or </li> on both sides, or a newline on either side.
  // const ulRegex = /(?<!<\/li>)(?<!<li>)(\n|^)(<li>.*<\/li>)+(\n|$)/gm;
  // htmlText = htmlText.replace(ulRegex, (match) => {
  //   return `<ul>${match.replace(/\n/g, '')}</ul>`;
  // });

  // Convert paragraphs to p tags.
  // const paragraphRegex = /^.*$/gm;
  // htmlText = htmlText.replace(paragraphRegex, (match) => {
  //   if (match.length > 0) {
  //     return `<p>${match}</p>`;
  //   }
  //   return '';
  // });

  return htmlText;
}

const detectColorMode = () => {
  if (
    typeof window !== 'undefined' &&
    (document.documentElement.classList.contains('dark') || window.localStorage.getItem('colorMode') === 'dark')
    /* (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) */
  ) {
    return 'dark';
  }

  return 'light';
};

const svgToDataURL = (svgComponent: any) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svgComponent);
  const encodedData = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=UTF-8,${encodedData}`;
};

export { capitalize, sleep, parseWorkExperience, parseEducation, parseSkills, detectUrl, parseMD, svgToDataURL, detectColorMode };
