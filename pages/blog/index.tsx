// Could also be placed in src/components/kdevdigital/blog/index.tsx.
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import PostsService from '@/lib/services/Posts';
import { parseMD } from '@/helpers';
import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import config from '@/config';

function Post({ post }: { post: any }) {
  return (
    <article className="py-5 space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-regular">
          <time dateTime={post.createdAt}>{dayjs(post.createdAt).format('MMMM D, YYYY')}</time>
        </dd>
      </dl>
      <div className="space-y-5 xl:col-span-3">
        <h2 className="text-2xl font-header font-bold">{post.title}</h2>
        {/* <div className="flex flex-wrap mb-5">
          <a className="mr-3 text-sm font-medium uppercase text-foreground-alt hover:text-white" href="/tags/next-js">
            next-js
          </a>
          <a className="mr-3 text-sm font-medium uppercase text-foreground-alt hover:text-white" href="/tags/tailwind">
            tailwind
          </a>
          <a className="mr-3 text-sm font-medium uppercase text-foreground-alt hover:text-white" href="/tags/guide">
            guide
          </a>
          <a className="mr-3 text-sm font-medium uppercase text-foreground-alt hover:text-white" href="/tags/feature">
            feature
          </a>
        </div> */}
        <p className="" dangerouslySetInnerHTML={{__html: parseMD(post.content)}}></p>
        {/* <div className="text-base font-medium leading-6">
          <a className="text-foreground hover:text-foreground-alt" aria-label={`Read more: "${post.title}"`} href={`/blog/${post.slug}`}>
            Read more →
          </a>
        </div> */}
      </div>
    </article>
  );
}

function Blog({ posts }: { posts: any }) {
  const [showSearch, setShowSearch] = useState(false);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${config.apiServerUrl}/posts`)
  //     .then((response) => {
  //       setPosts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10" id="blog">
        <div className="flex justify-between">
          <Link href="/">
            <Icon name="arrow-left" /> krisozolins.com
          </Link>
          {/* <div className="flex space-x-3">
            <a href="#">Archive</a>
            <a href="#">Tags</a>
            <button onClick={() => setShowSearch(true)}>
              <Icon name="search" className="regular-icon" />
              {" "}
              <span className="border border-primary-500 rounded-md px-1 py-0.5 text-primary-500 text-xs">⌘+K</span>
            </button>
            <button>
              <Icon name="moon" className="regular-icon" />
            </button>
          </div> */}
        </div>
        <header className="my-10">
          <h1 className="text-4xl font-header font-bold text-center">Blog</h1>
          <p className="text-center">Coming soon...</p>
        </header>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((post: any) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
      {/* <Search showSearch={showSearch} setShowSearch={setShowSearch} /> */}
    </>
  );
}

export async function getServerSideProps() {
  // const response = await axios.get(`${config.apiServerUrl}/posts`);
  // const posts = response.data;
  const posts = await PostsService.getPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
