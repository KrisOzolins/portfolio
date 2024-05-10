const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

function parseWorkExperience(input) {
  const workExperience = [];
  const lines = input.split('\n');

  let currentJob = null;

  lines.forEach((line) => {
    if (line.startsWith('##')) {
      if (currentJob) {
        // Add the previous job to the workExperience array before starting a new one
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
      // Extract the date
      currentJob.date = line.replace('* Date:', '').trim();
    } else if (line.startsWith('* Tech:')) {
      // Extract the technologies used
      currentJob.tech = line.replace('* Tech:', '').trim();
    } else if (line.startsWith('* Desc:')) {
      // Extract the job description
      currentJob.desc = line.replace('* Desc:', '').trim();
    }
  });

  // Don't forget to add the last job
  if (currentJob) {
    workExperience.push(currentJob);
  }

  return workExperience;
}

function parseEducation(input) {
  const education = [];
  const lines = input.split('\n');

  let currentInstitution = null;

  lines.forEach((line) => {
    if (line.startsWith('##')) {
      if (currentInstitution) {
        // Push the previous institution before starting a new one
        education.push(currentInstitution);
      }

      // Start a new institution entry
      currentInstitution = {
        title: line.replace('##', '').trim(),
        date: '',
        desc: '',
      };
    } else if (line.startsWith('* Date:')) {
      // Extract date
      currentInstitution.date = line.replace('* Date:', '').trim();
    } else if (line.startsWith('* Desc:')) {
      // Extract description
      currentInstitution.desc = line.replace('* Desc:', '').trim();
    }
  });

  // Don't forget to add the last institution
  if (currentInstitution) {
    education.push(currentInstitution);
  }

  return education;
}

function parseSkills(input) {
  const skills = [];

  // Split the input by lines
  const lines = input.split('\n');

  let currentCategory = null;

  lines.forEach((line) => {
    // Check if the line is a category header
    if (line.startsWith('##')) {
      // Extract the category name by removing '##' and trimming whitespace
      const categoryName = line.replace('##', '').trim();

      // Create a new category object and add it to the skills array
      currentCategory = { name: categoryName, skills: [] };
      skills.push(currentCategory);
    } else if (line.startsWith('*')) {
      // It's a skill, add it to the current category's skills array
      // We remove the '*' and trim whitespace to get the skill name
      const skillName = line.replace('*', '').trim();

      if (currentCategory) {
        currentCategory.skills.push(skillName);
      }
    }
  });

  return skills;
}

// Function which detects if the input string is a url or a Markdown url and returns <a>.
function detectUrl(input) {
  // If ends with .com or .lv
  if (input.endsWith('.com') || input.endsWith('.lv')) {
    const url = !input.startsWith('http') ? `https://${input}` : input;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${input}</a>`;
  }

  // If regex matches MD url format
  const mdUrlRegex = /\[(.*?)\]\((.*?)\)/;
  const mdUrlMatch = input.match(mdUrlRegex);
  if (mdUrlMatch) {
    return `<a href="${mdUrlMatch[2]}" target="_blank" rel="noopener noreferrer">${mdUrlMatch[1]}</a>`;
  }

  return input;
}

function parseMD(markdownText) {
  // Convert links: [text](href) to <a href="href">text</a>.
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let htmlText = markdownText.replace(linkRegex, '<a href="$2" class="underline" target="_blank">$1</a>');

  // Convert newlines to <br> tags.
  htmlText = htmlText.replace(/\n/g, '<br>');

  return htmlText;
}

export { capitalize, parseWorkExperience, parseEducation, parseSkills, detectUrl, parseMD };
