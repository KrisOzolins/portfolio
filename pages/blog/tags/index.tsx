import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import { AuthContext } from '../../../lib/context/AuthContext';
import PostsService from '@/lib/services/Posts';
import { parseMD } from '@/helpers';
import config from '@/config';

import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import Menu from '@/components/blog/Menu';
import Header from '@/components/blog/Header';

function Tags({ tags }: { tags: any }) {
  const { user, login } = useContext(AuthContext);

  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10" id="blog">
        <Menu
          user={user}
          setShowSearch={setShowSearch}
          breadcrumbs={[
            {
              url: '/blog',
              name: 'blog',
            },
          ]}
        />
        <Header title="Blog Tags" intro="A list of tags used for my blog posts." />
        <div className="flex justify-center flex-wrap gap-5">
          {tags.map((tag: string) => (
            <article key={tag} className="">
              <h2 className="text-xl font-header font-bold hover:underline">
                <Link href={`/blog/tags/${tag}`}>{tag}</Link>
              </h2>
            </article>
          ))}
        </div>
      </section>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} error={null} />
    </>
  );
}

export async function getServerSideProps() {
  const tags = await PostsService.getTags();

  return {
    props: {
      tags,
    },
  };
}

export default Tags;
