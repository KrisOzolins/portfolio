import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import PostsService from '@/lib/services/Posts';
import { parseMD } from '@/helpers';
import config from '@/config';
import { Post } from '@/pages/blog';

import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import Menu from '@/components/blog/Menu';
import Header from '@/components/blog/Header';

function Tag({ posts, tag }: { posts: any; tag: string }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10" id="blog">
        <Menu
          user={null}
          setShowSearch={setShowSearch}
          breadcrumbs={[
            {
              url: '/blog',
              name: 'blog',
            },
            {
              url: '/blog/tags',
              name: 'all tags',
            },
          ]}
        />
        <Header title={`Tag "${tag}"`} intro="Posts with this tag." />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.length ? posts.map((post: any) => <Post key={post.id} post={post} />) : <p className="text-center">No posts found.</p>}
        </div>
      </section>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} error={null} />
    </>
  );
}

type Params = {
  params: {
    tag: string;
  };
};

export async function getServerSideProps({ params }: Params) {
  const { tag } = params;
  const posts = await PostsService.getPostsByTag(tag);

  return {
    props: {
      posts,
      tag,
    },
  };
}

export default Tag;
