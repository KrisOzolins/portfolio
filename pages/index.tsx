// System imports
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import React, { useState, useEffect, useRef, createRef, FormEventHandler, FormEvent } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setNotification, setError } from '@/store/slices/appSlice';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import ReCAPTCHA from 'react-google-recaptcha';
import Mail from '@/lib/services/Mail';
import { withWidth } from '@/lib/hooks/useWidth';
import useActiveSection from '@/lib/hooks/useActiveSection';
import { parseWorkExperience, parseEducation, parseSkills, detectUrl } from '@/helpers';
import config from '@/config';

// Components
import ConditionalWrapper from '@/components/common/ConditionalWrapper';
import Meta from '@/components/common/Meta';
import Icon from '@/components/common/Icon';
import ScrollTop from '@/components/common/ScrollTop';
import Input from '@/components/portfolio/Input';
import LocalTime from '@/components/portfolio/LocalTime';
import Lightbox from '@/components/common/Lightbox';
// ...

// Resources
// import logo from './logo.svg';
import profile from '@/assets/profile.jpg';

// Styles
import styles from '@/styles/pages/Portfolio.module.scss';

// Fonts
// ...

// Functions
const getSkillId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-skills`;

// Custom config
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
// ...

const basicData = [
  {
    sectionTitle: 'Skills',
    icon: 'asterisk',
    items: [
      {
        title: 'Front-end',
        desc: 'HTML5, CSS3, JS, RWD, React, UI/UX, etc.',
        percentage: 95,
        url: '#front-end-skills',
      },
      {
        title: 'Back-end',
        desc: 'Node.js, (No)SQL, PHP, RoR, etc.',
        percentage: 95,
        url: '#back-end-skills',
      },
      {
        title: 'DevOps',
        desc: 'Linux, Docker, cloud platforms, PaaS, etc.',
        percentage: 80,
        url: '#back-end-skills',
      },
      {
        title: 'Unity',
        desc: '',
        percentage: 60,
        url: '#unity-skills',
      },
    ],
  },
  {
    sectionTitle: 'Languages',
    icon: 'globe',
    items: [
      {
        title: 'Latvian',
        desc: '',
        percentage: 100,
        url: '',
      },
      {
        title: 'English',
        desc: '',
        percentage: 85,
        url: '',
      },
    ],
  },
  {
    sectionTitle: 'Other interests',
    icon: 'icons',
    items: [
      {
        title: 'Guitar',
        desc: 'Still got a lot to practice...',
        percentage: 20,
        url: '',
      },
      {
        title: 'Traveling',
        desc: 'Would like to do more.',
        percentage: 50,
        url: '',
      },
      {
        title: 'Workouts',
        desc: 'Doing something every day.',
        percentage: 80,
        url: '',
      },
      {
        title: 'Minimalism',
        desc: 'Just trying to live simple.',
        percentage: 80,
        url: '',
      },
    ],
  },
];

const services = [
  {
    title: 'Full-stack web development',
    desc: "Primarily JS based, but could be <span class='details' title='(~3 years of experience)'>Ruby/Rails</span> or <span class='details' title='(10+ years of experience)'>PHP/Laravel</span> based as well.",
    more: "From concept to launch, I'm here to help you build your online presence. I'll work with you to create a custom website that suits your needs and showcases your unique brand.",
    icon: 'code',
  },
  {
    title: 'App development',
    desc: 'I provide mobile app development using RN or desktop app development using Electron.',
    icon: 'mobile-alt',
  },
  {
    title: 'DevOps',
    desc: 'I can provide a help with Linux server administration, CI/CD, Docker, cloud platforms (e.g. DO or AWS), etc.',
    icon: 'server',
  },
  {
    title: 'Consulting',
    desc: 'Need a help with code review or advice on your project? I can help you with that too.',
    icon: 'comments',
  },
  {
    title: 'Unity game development',
    desc: 'Although I primarily focus on web developer, I also have few years of experience in Unity game development.',
    more: "I can help you bring your game ideas to life. I've been working with Unity for over 5 years, creating 2D and 3D games for various platforms. I can help you with game design, development, and publishing. Preferrably small (ultra-casual category) to medium sized games. Let's turn your game idea into reality!",
    icon: 'gamepad',
  },
  {
    title: 'Other',
    desc: "Have a project that doesn't fit into any of the above categories? I'm always up for a challenge.",
    icon: 'ellipsis-h',
  },
];

// Components
const SemanticDate = ({ date }: { date: string }) => {
  const isRange = date.includes(' - ');

  if (isRange) {
    const [startDate, endDate] = date.split(' - ');

    return (
      <>
        <time dateTime={startDate}>{startDate}</time> - <time dateTime={endDate}>{endDate}</time>
      </>
    );
  } else {
    return <time dateTime={date}>{date}</time>;
  }
};

// Home
function Portfolio({ isBlog = false, isWiki = false, width = 0, ssrProp }: { isBlog?: boolean; isWiki?: boolean; width?: number; ssrProp: string }) {
  const formFields = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // Redux state.
  const notification = useSelector((state: any) => state.app.notification);
  const error = useSelector((state: any) => state.app.error);
  const dispatch = useDispatch();

  // Local state.
  const [work, setWork] = useState([] as any[]);
  const [education, setEducation] = useState([] as any[]);
  const [skills, setSkills] = useState([] as any[]);
  const [expandedDetailsSection, setExpandedDetailsSection]: [string | null, any] = useState('all'); // work
  const [showMore, setShowMore]: [number | null, any] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(formFields);
  const [formData, setFormData] = useState(formFields);
  // const [notification, setNotification] = useState('');
  // const [error, setError] = useState('');
  const [showProfilePicLightbox, setShowProfilePicLightbox] = useState(false);

  const recaptchaRef = createRef<ReCAPTCHA>();

  useEffect(() => {
    axios
      .get(`${config.apiServerUrl}/details`)
      .then((response) => {
        setWork(parseWorkExperience(response.data.details.find((detail: any) => detail.file === 'work.md')?.content || '').slice(1));
        setEducation(parseEducation(response.data.details.find((detail: any) => detail.file === 'education.md')?.content || ''));
        setSkills(parseSkills(response.data.details.find((detail: any) => detail.file === 'skills.md')?.content || ''));
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        // ...
      });

    return () => {};
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormLoading(true);

    try {
      const data = await Mail.sendContactMail({ ...formData, token: recaptchaRef.current?.getValue() as string });
      // console.log(data);

      dispatch(setNotification(data?.message || 'Message sent successfully!'));
      setEmailSent(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      const { data } = error.response;
      // console.error('Error:', error);

      dispatch(setError(data?.message || 'Failed to send the message!'));

      if (data?.errors) {
        setFormErrors(data.errors);
      }
    } finally {
      // console.log('Contact form submitted.');

      setFormLoading(false);
    }
  };

  const aboutSectionRef = useRef(null);
  const detailsSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  return (
    <>
      {/* <Meta title='Portfolio - KrisOzolins.com' /> */}
      <Head>
        <title>Portfolio - KrisOzolins.com</title>
      </Head>
      <section className="py-[50px] pt-[100px] container mx-auto max-w-[1000px] w-full px-3 lg:px-0" id="about" ref={aboutSectionRef}>
        <figure>
          <Image
            src={profile}
            alt="Krisjanis Ozolins profile picture"
            className="h-48 w-48 lg:h-64 lg:w-64 rounded-full mx-auto mb-5 border-4 border-primary-accent"
            width={width >= 1024 ? 256 : 192}
            height={width >= 1024 ? 256 : 192}
            onClick={() => setShowProfilePicLightbox(true)}
          />
        </figure>
        <div className="flex justify-center mb-5">
          <a href="https://github.com/KrisOzolins" target="_blank" className="hover:text-primary-accent transition ease-linear duration-300">
            <Icon name="github" style="brands" size="2x" />
          </a>
          <a href="https://www.linkedin.com/in/krisozolins" target="_blank" className="hover:text-primary-accent transition ease-linear duration-300">
            <Icon name="linkedin" style="brands" size="2x" />
          </a>
          <a href="https://instagram.com/krisozolins" target="_blank" className="hover:text-primary-accent transition ease-linear duration-300">
            <Icon name="instagram" style="brands" size="2x" />
          </a>
          <a href="#contact" className="hover:text-primary-accent transition ease-linear duration-300">
            <Icon name="envelope" size="2x" />
          </a>
        </div>
        <h2 className="heading-border text-3xl mb-5 font-header font-bold tracking-wider">
          About <span className="text-primary-accent">Me</span>
        </h2>
        <h3 className="text-xl mb-5 font-header font-bold">Hi, I'm Krisjanis Ozolins. I'm a software engineer.</h3>
        <p className="mb-3">
          I'm a self-employed (mostly) software and web developer with a passion for creating functional and user-friendly websites and applications.
          Been curious and passionate about understanding tech and how things work all my life. With computers it all started as soon as I got my
          first computer at the age of 10. I immediately became fascinated with the endless possibilities that the technology offered, and I've been
          exploring them ever since.
        </p>
        <p className="mb-3">
          Initially I started to explore the more DevOps-like (a.k.a. system/network-administration) type of things - learning all about hardware,
          networking, playing with and exploring operating systems, etc. I also tried programming at the age of 11, starting out with languages such
          as Visual Basic, Delphi, Lua, even Assembly. It was interesting, but scary at the same time, so I just used those tools for some scripts and
          experiments, but was afraid to take it further. I was fascinated about the freedom this knowledge brings. Later, I realized that I don't
          want to just routinely deal with fixing hardware and software (re)installation all the time, I want to dive much deeper and create it, that
          it's not really that scary, and so I started to learn web development more seriously a couple years later. Since then I've been working on
          various different projects, learning new technologies, and improving my skills non-stop, as much as my brain allows me to.
        </p>
        <p className="mb-3">
          Professionally I started to work as a web developer more than 12 years ago, but my journey with coding started much earlier. I specialize in
          front-end and back-end development, but I can also handle DevOps. Nowadays I mostly tend to focus on JS based development (JS/TS, React,
          Node.js, React Native, Electron, etc.) as JS has come a long way to be a quite decent ecosystem of tools and libraries, although it requires
          some experience to filter out what's good and goes together, as the JS world can be very noisy and over-saturated. Besides that, I am also
          proficient in a variety of other programming languages and things, including PHP, Ruby, C# and Python, related libraries and frameworks,
          database management, system administration, etc. See more on that below.
        </p>
        <p className="mb-3">
          Apart from being a web developer, I enjoy running and working out, music, practicing blues guitar, traveling (which I'd like to be doing
          more), minimalism, nature and all survival/bushcraft type things.
        </p>
        <p>
          Check out my{' '}
          <a href="/now" className="underline text-secondary-accent-regular hover:text-primary-accent">
            now page
          </a>{' '}
          too, to see what I'm currently up to.
        </p>
      </section>
      <section
        className="py-[50px] pt-[100px] container mx-auto max-w-[1200px] px-3 lg:px-0 h-full min-h-[100vh]"
        id="details"
        ref={detailsSectionRef}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 lg:pl-3">
            <section className="mb-0 lg:mb-7 border-b-2 border-gray-regular">
              <h2 className="text-3xl mb-5 font-header font-bold tracking-wider">
                <Icon name="user-large" className="inline lg:hidden" />
                <ConditionalWrapper
                  condition={width < 1024}
                  wrapper={(children: React.JSX.Element) => <span className="border-b-primary-accent border-b-2">{children}</span>}
                >
                  <>Krisjanis Ozolins</>
                </ConditionalWrapper>
              </h2>
              <p className="text-foreground-alt mb-3">
                <Icon name="briefcase" /> Full-stack web developer
              </p>
              <p className="text-foreground-alt mb-3">
                <a href="https://google.com/maps/place/Riga" target="_blank" rel="noreferrer noopener">
                  <Icon name="location-pin" /> Riga, Latvia
                </a>
              </p>
              <p className="text-foreground-alt mb-3">
                <Icon name="birthday-cake" /> Age {new Date().getFullYear() - 1991}
              </p>
              <p className="text-foreground-alt mb-3">
                <Icon name="hammer" /> Available for hire and freelance
              </p>
              <p className="text-foreground-alt mb-3">
                <a href={`mailto:${config.email}`} target="_blank" rel="noreferrer noopener">
                  <Icon name="envelope" /> {config.email}
                </a>
              </p>
              <p className="text-foreground-alt mb-7">
                <a href={`tel:${config.phone.replace(' ', '')}`} target="_blank" rel="noreferrer noopener">
                  <Icon name="phone" /> {config.phone}
                </a>
              </p>
              <a
                href={`${config.apiServerUrl}/download/cv`}
                className="bg-primary-accent hover:bg-gray-regular transition-colors ease-in duration-200 w-32 h-10 mb-10 lg:mb-7 uppercase font-bold flex justify-center items-center"
              >
                <Icon name="download" />
                CV
              </a>
            </section>
            {basicData.map((data, dataIdx) => (
              <section key={dataIdx} className="mb-7 hidden lg:block">
                <h3 className="text-xl mb-5 font-header font-bold tracking-wider">
                  <Icon name={data.icon} /> {data.sectionTitle}
                </h3>
                {data.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-foreground-alt mb-3">
                    <p className="font-bold mb-2">
                      <ConditionalWrapper
                        condition={item.url.length as any}
                        wrapper={(children: React.JSX.Element) => (
                          <a href={item.url} className="hover:text-primary-accent">
                            {children}
                          </a>
                        )}
                      >
                        <>
                          {item.title} {item.desc.length ? <small>({item.desc})</small> : ''}
                        </>
                      </ConditionalWrapper>
                    </p>
                    {/* todo: Maybe use <progress> here? */}
                    <div className="w-full bg-white rounded-full h-4 max-w-[400px]">
                      <div
                        className="bg-gray-regular h-4 rounded-full flex justify-center items-center text-xs"
                        style={{ width: `${item.percentage}%` }}
                      >
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
          <div className="lg:col-span-2 lg:pr-3">
            <section className="mb-10 border-b-2 border-gray-regular">
              <h3 className={`text-2xl font-header font-bold tracking-wider border-s-primary-accent border-s-4 ps-3 cursor-pointer mb-7`}>
                <Icon name="suitcase" /> Work experience
              </h3>
              {[...work].reverse().map((job, idx) => (
                <article key={idx} className={idx === work.length - 1 ? 'mb-10' : 'mb-6'}>
                  <h4 className="mb-2 font-header">
                    <strong dangerouslySetInnerHTML={{ __html: `${job.title}${job.company.length ? ` / ${detectUrl(job.company)}` : ''}` }} />
                  </h4>
                  <p className="mb-2 text-secondary">
                    <Icon name="calendar" /> <SemanticDate date={job.date} />
                    {/* <span className="bg-foreground-alt text-secondary-accent-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                      Current
                    </span> */}
                  </p>
                  <p className="mb-2 text-secondary">
                    <strong>Tech</strong>: {job.tech}
                  </p>
                  <p>{job.desc}</p>
                </article>
              ))}
              <p className="mb-10 text-foreground-alt text-sm">
                <Icon name="info-circle" /> Unfortunately I can't provide access to the source code for the projects I've worked on, as they're all
                closed-source and IP of the companies/clients I've worked for.
              </p>
            </section>
            <section className="mb-10 border-b-2 border-gray-regular">
              <h3 className={`text-2xl font-header font-bold tracking-wider border-s-primary-accent border-s-4 ps-3 cursor-pointer mb-7`}>
                <Icon name="certificate" /> Education
              </h3>
              {[...education].reverse().map((edu, idx) => (
                <article key={idx} className={idx === education.length - 1 ? 'mb-10' : 'mb-6'}>
                  <h4 className="mb-2 font-header">
                    <strong>{edu.title}</strong>
                  </h4>
                  <p className="mb-2">
                    <Icon name="calendar" /> {edu.date}
                  </p>
                  <p>{edu.desc}</p>
                </article>
              ))}
            </section>
            <section>
              <h3 className={`text-2xl font-header font-bold tracking-wider border-s-primary-accent border-s-4 ps-3 cursor-pointer mb-7`}>
                <Icon name="asterisk" /> Skills
              </h3>
              {skills.map((skill, idx) => (
                <article key={idx} className={idx === skills.length - 1 ? 'mb-10' : 'mb-6'} id={getSkillId(skill.name)}>
                  <h4 className="mb-2 font-header">
                    <strong>{skill.name}</strong>
                  </h4>
                  <p>{skill.skills.join(', ')}</p>
                </article>
              ))}
              <p className="mb-10 text-foreground-alt text-sm">
                <Icon name="info-circle" /> It's difficult and also unnecessary to list all the technologies I've learned and/or worked with over the
                years, but these are the main ones and with which I have the most experience. For more specific information please{' '}
                <a href="#contact" className="underline">
                  contact me
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
      <section className="py-[50px] pt-[100px] container mx-auto max-w-[1200px] px-3 " id="services" ref={servicesSectionRef}>
        <h2 className="text-3xl mb-5 font-header font-bold tracking-wider text-center lg:text-left">
          <Icon name="wrench" /> <span className="border-b-primary-accent border-b-2">Services</span>
        </h2>
        <div className="container mx-auto lg:mx-0 mb-10 flex flex-col lg:flex-row items-center relative">
          <div
            className={`bg-center bg-cover h-[350px] w-full max-w-xl lg:w-1/2 grayscale hover:grayscale-0 transition ease-linear duration-500${width >= 1024 ? ' fade-out-right' : ''}`}
            style={{ backgroundImage: 'url("/resources/images/services-bg.webp")' }}
          ></div>
          <div className="bg-background bg-opacity-90 p-10 border-b-2 border-primary-accent h-fit z-10 min-w-[340px] max-w-[450px] w-10/12 lg:w-1/3 -mt-40 lg:mt-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <h3 className="text-2xl font-header font-bold text-center md:text-left mb-3">About the services</h3>
            <p className="text-center md:text-left">
              With my diverse skillset and experience, I can help you with both new projects and prototypes, as well as with existing and legacy
              projects. Ranging from web and app development to Unity game development, I'm always up for a chat and happy to help to make your ideas
              happen!
            </p>
          </div>
        </div>
        <p className="text-xl font-bold text-center lg:text-left mb-5">Primary services I offer</p>
        <div className="container mx-auto lg:mx-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between ">
          {services.map((service, idx) => (
            <article key={idx} className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full">
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 rounded-full bg-primary-accent">
                    <Icon name={service.icon} className="regular-icon" />
                  </div>
                  <h4 className="text-base font-header font-bold md:mb-3 md:hidden">{service.title}</h4>
                </div>
              </div>
              <div>
                <h4 className="hidden mb-3 text-lg font-header font-bold md:block">{service.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: service.desc }} />
                {service.more && (
                  <button className="hover:text-primary-accent focus:outline-none mt-1" onClick={() => setShowMore(showMore === idx ? null : idx)}>
                    {showMore === idx ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
                    {showMore === idx ? 'Show less' : 'Show more'}
                  </button>
                )}
                {service.more && showMore === idx && <p className="mt-1" dangerouslySetInnerHTML={{ __html: service.more }} />}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="py-[50px] pt-[100px] container mx-auto max-w-[1200px] pb-[200px] px-3 flex flex-col" id="contact" ref={contactSectionRef}>
        <h2 className="text-3xl mb-5 font-header font-bold tracking-wider text-center lg:text-left">
          <Icon name="pencil" /> <span className="border-b-primary-accent border-b-2">Contact</span>
        </h2>
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
          <div className="w-full lg:w-1/2 max-w-[500px] mx-auto lg:mx-0">
            {formLoading ? (
              <div className="flex justify-center items-center h-[300px]">
                <Icon name="spinner" className="animate-spin-slow text-primary-accent" size="3x" />
              </div>
            ) : emailSent ? (
              <>
                <p className="text-xl font-bold mb-5">Thank you for your message!</p>
                <p>I will get back to you as soon as possible.</p>
                <button
                  className="bg-primary-accent hover:bg-gray-dark w-32 h-10 mt-10 uppercase font-bold flex justify-center items-center"
                  onClick={() => setEmailSent(false)}
                >
                  <Icon name="arrow-left" />
                  Back
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="text-xl font-bold mb-5">Let's get in touch!</p>
                <div className="mb-3 flex gap-5">
                  <div className="w-1/2">
                    <Input label="Your Name" name="name" type="text" required onChange={handleChange} value={formData.name} error={formErrors.name} />
                  </div>
                  <div className="w-1/2">
                    <Input
                      label="Your Email"
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                      value={formData.email}
                      error={formErrors.email}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Input label="Subject" name="subject" type="text" onChange={handleChange} value={formData.subject} error={formErrors.subject} />
                </div>
                <div className="mb-5">
                  <Input
                    label="Message"
                    name="message"
                    type="textarea"
                    required
                    onChange={handleChange}
                    value={formData.message}
                    error={formErrors.message}
                  />
                </div>
                <ReCAPTCHA ref={recaptchaRef} sitekey={config.recaptchaSiteKey} className="mb-5" />
                <button
                  type="submit"
                  className="py-2 px-4 w-full transition-colors ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg bg-primary-accent hover:bg-white hover:text-primary-accent"
                >
                  Send
                </button>
              </form>
            )}
          </div>
          <div className="w-full lg:w-1/2 max-w-[500px] mx-auto lg:mx-0 flex flex-col justify-start items-start lg:ms-20 mb-5 lg:mb-0">
            <p className="text-xl font-bold mb-5">Contact details</p>
            <div className="flex items-center mb-5">
              <div className="bg-primary-accent rounded-full h-12 w-12 flex justify-center items-center mr-5">
                <Icon name="location-pin" className="regular-icon" />
              </div>
              <div>
                <p>
                  <strong>Location</strong>:
                </p>
                <p>
                  <a href="https://google.com/maps/place/Riga" className="underline" target="_blank">
                    Riga, Latvia
                  </a>
                  {', '}
                  <LocalTime />
                </p>
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="bg-primary-accent rounded-full h-12 w-12 flex justify-center items-center mr-5">
                <Icon name="envelope" className="regular-icon" />
              </div>
              <div>
                <p>
                  <strong>Email</strong>:
                </p>
                <p>
                  <a href={`mailto:${config.email}`} className="underline" target="_blank" rel="noreferrer noopener">
                    {config.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-5">
              <div className="bg-primary-accent rounded-full h-12 w-12 flex justify-center items-center mr-5">
                <Icon name="phone" className="regular-icon" />
              </div>
              <div>
                <p>
                  <strong>Call</strong>:
                </p>
                <p>
                  <a href={`tel:${config.phone.replace(' ', '')}`} className="underline" target="_blank" rel="noreferrer noopener">
                    {config.phone}
                  </a>
                </p>
              </div>
            </div>
            <iframe
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${config.mapsApiKey}&q=Riga`}
            ></iframe>
          </div>
        </div>
      </section>
      <ScrollTop />
      <Lightbox
        src={profile}
        alt={'Krisjanis Ozolins profile picture'}
        show={showProfilePicLightbox}
        onClose={() => setShowProfilePicLightbox(false)}
      />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      ssrProp: 'Test ssr prop',
    },
  };
};

export default withWidth(Portfolio);
