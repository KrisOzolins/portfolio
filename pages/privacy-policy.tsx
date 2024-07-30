import React from 'react';
import Icon from '@/components/common/Icon';
import { useTranslations } from 'next-intl';

function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <section className="now content container mx-auto min-h-screen w-1/2 max-w-[920px] py-10 text-light-white dark:text-white" id="now">
      <a href="/">
        <Icon name="arrow-left" /> krisozolins.com
      </a>
      <header className="my-10">
        {/* <h1 className="text-4xl font-bold text-center mb-1">Privacy Policy</h1> */}
        <h1 className="text-4xl font-bold text-center mb-2">{t('header.title')}</h1>
        <p className="text-center text-sm">
          {t('header.intro')}
          {/* Welcome to our Privacy Policy page. This policy outlines how we collect, use, disclose, and safeguard your information when you visit our
          website. Please read this policy carefully. */}
          {/* Here, we are committed to protecting your privacy and ensuring that your personal information is handled
          in a safe and responsible manner. This policy outlines how we collect, use, disclose, and safeguard your information when you visit our
          website. We encourage you to read this policy carefully to understand our practices regarding your information and how we will treat it. By
          visiting our site, you agree to the practices described in this policy. */}
        </p>
      </header>
      <article className="mb-12">
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('definitions')['title']}</h2>
          <ul className="list-disc ms-5">
            {t.raw('definitions')['data'].map((data: any, idx: number) => (
              <li key={idx}>
                <strong>{data.term}</strong>: {data.definition}
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['dataCollection']['title']}</h2>
          {t.raw('content')['dataCollection']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['dataUsage']['title']}</h2>
          {t.raw('content')['dataUsage']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['userRights']['title']}</h2>
          <p className="mb-1">{t.raw('content')['userRights']['list']['title']}</p>
          <ul className="list-disc ms-5 mb-1">
            {t.raw('content')['userRights']['list']['items'].map((item: any, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>{t.raw('content')['userRights']['list']['note']}</p>
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['dataRetention']['title']}</h2>
          {t.raw('content')['dataRetention']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['securityMeasures']['title']}</h2>
          {t.raw('content')['securityMeasures']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['3rdPartyServices']['title']}</h2>
          <p className="mb-1">{t.raw('content')['3rdPartyServices']['list']['title']}</p>
          <ul className="list-disc ms-5">
            {t.raw('content')['3rdPartyServices']['list']['items'].map((item: any, idx: number) => (
              <li key={idx}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['policyChanges']['title']}</h2>
          {t.raw('content')['policyChanges']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>
        <section className="mb-6">
          <h2 className="text-center text-2xl font-bold mb-2">{t.raw('content')['contactInfo']['title']}</h2>
          {t.raw('content')['contactInfo']['text'].map((data: any, idx: number) => (
            <p key={idx} className="text-left mb-4">
              {data.paragraph}
            </p>
          ))}
        </section>

        {/* {t.raw('content').map((data: any, idx: number) => (
          <p key={idx} className="text-left mb-4">
            {data.paragraph}
          </p>
        ))} */}

        {/* <p className="text-left mb-4">
          At KrisOzolins's Portfolio and Blog, we prioritize your privacy and are transparent about the limited use of cookies and personal data on our
          site. Our website uses cookies solely for analytics purposes, facilitated by Google Analytics, to help us understand how our visitors interact
          with the website. This information allows us to improve your user experience continually.
        </p>

        <p className="text-left mb-4">
          For those opting to use Google OAuth for authentication, please be assured that this process is managed directly through Google's secure
          authentication framework. We only receive the necessary profile information to create or access your account, without storing any sensitive
          personal data on our servers.
        </p>

        <p className="text-left mb-4">
          Our admin CMS panel utilizes a self-implemented JWT (JSON Web Token) authentication system, ensuring that only authorized users can access
          specific functionalities. This system is designed with security in mind, safeguarding the integrity of our platform.
        </p>

        <p className="text-left mb-4">
          Additionally, we use New Relic's Application Performance Monitoring (APM) tool to ensure our website's performance is optimized and to quickly
          identify any issues that may impact your experience. New Relic APM does not collect personal information but helps us monitor our site's
          health and performance.
        </p>

        <p className="text-left mb-4">
          We do not share, sell, rent, or trade user data with third parties for their commercial purposes. The use of cookies and any data collected
          through Google OAuth, JWT authentication, and New Relic APM are solely for the purposes mentioned above.
        </p>

        <p className="text-left mb-12">
          By using our site, you consent to our Privacy Policy and the use of cookies for analytics and necessary site functionality. We are committed
          to protecting your privacy and ensuring a secure online experience.
        </p> */}
      </article>
      {/* <p>Last Updated: 18th Jul 2024</p> */}
      <p>{t('lastUpdated')}</p>
    </section>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../i18n/${context.locale}.json`)).default,
    },
  };
}

export default PrivacyPolicy;
