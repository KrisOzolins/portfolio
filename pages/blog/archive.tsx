import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../lib/context/AuthContext';
import type { Post as PostType } from '@/lib/types';
import PostsService from '@/lib/services/Posts';
import { Post } from '@/pages/blog';

import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import Menu from '@/components/blog/Menu';
import Header from '@/components/blog/Header';
import OAuthLogin from '@components/blog/OAuthLogin';

function Archive({ posts, error = null }: { posts: PostType[]; error: any }) {
  const { user, login } = useContext(AuthContext);

  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10 px-10 lg:px-0" id="blog">
        <Menu user={user} setShowSearch={setShowSearch} />
        <Header title="Archive" intro="Blog posts from the past." />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((post: PostType) => (
            <Post key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-header font-bold">No posts found</h2>
            </div>
          )}
        </div>
      </section>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} error={error} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const posts = await PostsService.getPosts({ sort: 'desc' });

  return {
    props: {
      posts,
      error: posts.error ? posts.error.message : null,
      messages: (await import(`../../i18n/${context.locale}.json`)).default,
    },
  };
}

export default Archive;
