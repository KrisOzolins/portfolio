// Could also be placed in src/components/kdevdigital/blog/index.tsx.
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import type { Post } from '@/lib/types';
import PostsService from '@/lib/services/Posts';
import { parseMD } from '@/helpers';
import config from '@/config';

import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';
import Menu from '@/components/blog/Menu';
import Header from '@/components/blog/Header';
import { AuthContext } from '../../lib/context/AuthContext';
import LoginButton from '@/components/blog/LoginButton';
import LogoutButton from '@/components/blog/LogoutButton';
// Can use @components directory alias to import components.
import OAuthLogin from '@components/blog/OAuthLogin';

function Post({ post }: { post: Post }) {
  const router = useRouter();

  const [likes, setLikes] = useState(post.likes);

  // console.log(post);
  // console.log(router.locales);

  const like = async (post: Post) => {
    // console.log('like:', post);

    // const response = await axios.post(`${config.apiServerUrl}/posts/${post.id}/like`);
    const response = await PostsService.likePost(post.id);
    // console.log('response:', response);

    if (response.error) {
      console.error('Error:', response.error);
    } else {
      setLikes(response.likes);
    }
  };

  return (
    <article className="py-5 space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-regular">
          <time dateTime={post.createdAt.toString()}>{dayjs(post.createdAt).format('MMMM D, YYYY')}</time>
        </dd>
      </dl>
      <div className="space-y-5 xl:col-span-3">
        <div>
          <h2 className="text-2xl font-header font-bold hover:underline">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap mt-1">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag}`}
                  className="mr-3 text-xs font-medium uppercase text-light-gray-regular dark:text-foreground-alt hover:text-light-white dark:hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="" dangerouslySetInnerHTML={{ __html: parseMD(post.content) }}></div>
        {/* <div className="text-base font-medium leading-6">
          <a className="text-foreground hover:text-foreground-alt" aria-label={`Read more: "${post.title}"`} href={`/blog/${post.slug}`}>
            Read more →
          </a>
        </div> */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2" aria-label="Like this post" title="Like this post" onClick={() => like(post)}>
            <Icon name="heart" className="regular-icon" />
            <span>{likes}</span>
          </button>
          <Link href={`/blog/${post.slug}`} className="flex items-center space-x-2 hover:underline">
            <Icon name="comment" className="regular-icon" />
            <span className="">{post.comments?.length || 0} Comments</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Blog({ posts, error = null }: { posts: Post[]; error: any }) {
  const { user, login } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${config.apiServerUrl}/posts`)
    //   .then((response) => {
    //     setPosts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    if (error) {
      setShowSearch(true);
    }
  }, []);

  // const t = useTranslations('Blog');
  // console.log('translations: ', t('title'));

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10 px-10 lg:px-0" id="blog">
        <Menu user={user} setShowSearch={setShowSearch} />
        <Header title="Blog" intro="My collection of thoughts, ideas, and guides on web development, programming, and technology." />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((post: Post) => (
            <Post key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-header font-bold">No posts found</h2>
              {/* <p>There are no posts matching your search criteria.</p> */}
            </div>
          )}
        </div>
      </section>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} error={error} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const search = context.query.s;
  // const posts = (await axios.get(`${config.apiServerUrl}/posts`)).data;
  // Response could be either array with posts or {error: {message: 'error message'}}
  const response = await PostsService.getPosts({ sort: 'desc', search });

  return {
    props: {
      posts: !response.error ? response : [],
      error: response.error ? response.error.message : null,
      messages: (await import(`../../i18n/${context.locale}.json`)).default,
    },
  };
}

export { Post };
export default Blog;
