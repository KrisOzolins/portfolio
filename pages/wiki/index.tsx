// function Wiki() {
//   return (
//     <section className="content container mx-auto min-h-screen" id="wiki">
//       <h1 className="text-4xl font-header font-bold text-center">Wiki</h1>
//       <p className="text-center">Coming soon...</p>
//     </section>
//   );
// }

// export default Wiki;

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import config from '@/config';

const topics = [
  {
    title: 'Computer setup',
    content: 'Content coming...',
  },
  {
    title: 'zsh commands',
    content: 'Content coming...',
  },
  {
    title: 'Dev workflow',
    content: 'Content coming...',
  },
];

function Wiki() {
  const [activeTopic, setActiveTopic] = useState(0);

  return (
    <>
      <section className="wiki content container mx-auto min-h-screen max-w-[920px] pt-10" id="wiki">
        <div className="flex justify-between">
          <Link href="/">
            <Icon name="arrow-left" /> krisozolins.com
          </Link>
        </div>
        <header className="my-10">
          <h1 className="text-4xl font-header font-bold text-center">Wiki</h1>
          <p className="text-center">Coming soon...</p>
          <p className="text-center text-sm text-light-foreground-alt dark:text-foreground-alt">
            Wiki/cheatsheet like collection of MD docs on various topics with examples, tips, comments, etc.
          </p>
        </header>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex">
            <nav className="w-1/4">
              <ul>
                {topics.map((topic, idx) => (
                  <li key={idx}>
                    <button className={`${activeTopic === idx ? 'font-bold' : ''}`} onClick={() => setActiveTopic(idx)}>
                      {topic.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="w-3/4">
              <h2 className="text-xl mb-3">{topics[activeTopic].title}</h2>
              <p>{topics[activeTopic].content}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wiki;
