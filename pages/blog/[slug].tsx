// Could also be placed in src/components/kdevdigital/blog/index.tsx.
import React, { useState, useEffect, useContext, createRef, FormEvent } from 'react';
import Link from 'next/link';
// import { headers, cookies } from 'next/headers';
import axios from 'axios';
import dayjs from 'dayjs';
import { io } from 'socket.io-client';
import { debounce } from 'lodash';

import { connect, useSelector, useDispatch } from 'react-redux';
import { setIsLoading, setNotification, setError } from '@/store/slices/appSlice';

import ReCAPTCHA from 'react-google-recaptcha';

import config from '@/config';
import PostsService from '@/lib/services/Posts';
import { createComment } from '@/lib/services/comments';
import { parseMD } from '@/helpers';
import { AuthContext } from '../../lib/context/AuthContext';
import LoginButton from '@/components/blog/LoginButton';
import LogoutButton from '@/components/blog/LogoutButton';
import OAuthLogin from '@/components/blog/OAuthLogin';
import Menu from '@/components/blog/Menu';
import Header from '@/components/blog/Header';
import Search from '@/components/common/Search';
import Icon from '@/components/common/Icon';

const socket = io('http://localhost:3001');
const writingTimeout = 1500;
let writingTimeoutInstance: any = null;

function BlogPost({ post }: { post: any }) {
  // const cookieStore = require('cookie');

  const { user, login } = useContext(AuthContext);

  // console.log('oauth user: ', user);

  const formFields = {
    // name: '',
    // email: '',
    // subject: '',
    message: '',
  };

  // Redux state.
  const notification = useSelector((state: any) => state.app.notification);
  const error = useSelector((state: any) => state.app.error);
  const dispatch = useDispatch();

  // Local state.
  const [comments, setComments] = useState(post.comments || []);

  const [comment, setComment] = useState('');
  const [someoneIsTyping, setSomeoneIsTyping] = useState(false);

  const [commentPosted, setCommentPosted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(formFields);
  const [formData, setFormData] = useState(formFields);

  const [showSearch, setShowSearch] = useState(false);

  const recaptchaRef = createRef<ReCAPTCHA>();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-... (session id)
      console.log(socket.connected); // true
    });

    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
      console.log(socket.connected); // false
    });

    socket.on('someoneIsTyping', (data: any) => {
      setSomeoneIsTyping(true);

      if (writingTimeoutInstance) {
        clearTimeout(writingTimeoutInstance);
      }

      writingTimeoutInstance = setTimeout(() => {
        setSomeoneIsTyping(false);
      }, writingTimeout);
    });

    socket.on('commentPosted', (data: any) => {
      // Add comment to comments array.
      setComments([...comments, data]);
    });
  }, []);

  const handleKeyDown = (e: any) => {
    setComment(e.target.value);

    socket.emit('someoneIsTyping', {
      user: {
        username: 'Kris Ozolins',
      },
      content: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      login();
      return;
    }

    setFormLoading(true);

    try {
      const data = await createComment(
        post.id,
        { content: comment, postId: post.id, token: recaptchaRef.current?.getValue() as string },
        document.cookie,
      );

      dispatch(setNotification('Comment posted successfully!'));
      setCommentPosted(true);
      setFormData({
        // name: '',
        // email: '',
        // subject: '',
        message: '',
      });
      setComment('');

      recaptchaRef.current?.reset();

      socket.emit('commentPosted', data);
    } catch (error: any) {
      // console.error('Error:', error);
      const { data } = error.response;

      dispatch(setError(data?.message || 'Failed to post the comment!'));

      if (data?.errors) {
        setFormErrors(data.errors);
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <section className="blog content container mx-auto min-h-screen max-w-[920px] py-10 px-10 lg:px-0" id="blog">
        <Menu
          user={user}
          setShowSearch={setShowSearch}
          breadcrumbs={[
            {
              url: '/blog',
              name: 'all posts',
            },
          ]}
        />
        <Header title="Blog" intro="My collection of thoughts, ideas, and guides on web development, programming, and technology." />
        <div className="">
          <article className="my-5 space-y-5 flex flex-col items-center">
            {/* <h2 className="text-3xl font-header font-bold">{post.title}</h2> */}
            <div className="text-center">
              <dl className="mb-1">
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6 text-gray-regular">
                  <time dateTime={post.createdAt}>{dayjs(post.createdAt).format('MMMM D, YYYY')}</time>
                </dd>
              </dl>
              <h1 className="text-3xl font-header font-bold hover:underline">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h1>
              <div className="flex justify-center flex-wrap mt-1 space-x-3">
                {post.tags.map((tag: string) => (
                  <a
                    className="mr-3 text-xs font-medium uppercase text-light-gray-regular dark:text-foreground-alt hover:text-light-white dark:hover:text-white"
                    href={`/blog/tags/${tag}`}
                    key={tag}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full" dangerouslySetInnerHTML={{ __html: parseMD(post.content) }}></div>
          </article>
          <div className="comments flex flex-col items-center space-y-5">
            <h2 className="text-2xl font-header font-bold">
              <Icon name="comment" size="sm" />
              {comments.length} Comments
            </h2>
            {comments.map((comment: any) => (
              <div key={comment.id} className="comment flex flex-col w-full">
                <div className="comment__content">
                  <p>{comment.content}</p>
                </div>
                <div className="comment__header flex justify-start items-center w-60">
                  <div className="comment__avatar w-8 h-8 flex justify-center items-center">
                    <Icon name="user" size="lg" />
                  </div>
                  <div>
                    <div className="comment__author text-xs font-semibold">{comment.user?.username || 'Guest'}</div>
                    <div className="comment__date text-xs text-gray-regular">{dayjs(comment.createdAt).format('MMMM D, YYYY')}</div>
                  </div>
                </div>
              </div>
            ))}
            {someoneIsTyping && (
              <div className="comment flex items-center w-full animate-pulse">
                <Icon name="user" size="lg" className="text-gray-regular" />
                <p className="text-gray-regular">Someone is typing a comment...</p>
              </div>
            )}
            {commentPosted && (
              <div className="comment flex justify-center items-center w-full">
                <Icon name="check" size="lg" className="text-green-500" />
                <p className="text-green-500">Comment posted successfully!</p>
              </div>
            )}
            {user ? (
              <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <label htmlFor="comment" className="sr-only">
                  Comment
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  // cols={10}
                  // rows={5}
                  value={comment}
                  onChange={handleKeyDown}
                  // onChange={(e) => setComment(e)}
                  // defaultValue={comment}
                  // onKeyDown={handleKeyDown}
                  placeholder="Write a comment..."
                  // className="w-96 h-32 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-regular"
                  className="bg-white border-2 text-gray-dark text-sm rounded-lg block w-96 h-32 p-2.5 focus:outline-none focus:border-secondary-accent-regular hover:border-gray-regular border-gray-light resize-none"
                ></textarea>
                <ReCAPTCHA ref={recaptchaRef} sitekey={config.recaptchaSiteKey} className="my-5" />
                <button
                  type="submit"
                  className="py-2 px-4 w-40 transition-colors ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg bg-primary-accent hover:bg-white hover:text-primary-accent"
                >
                  Post Comment
                </button>
                {/* <LoginButton /> */}
                {/* <LogoutButton /> */}
              </form>
            ) : (
              <div className="flex flex-col items-center !mt-20">
                <p className="text-light-gray-regular dark:text-gray-light">Please login to post a comment.</p>
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </section>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} error={null} />
    </>
  );
}

type Params = {
  req: any;
  params: {
    req: any;
    slug: string;
  };
};

export async function getServerSideProps({ req, params }: Params) {
  const { slug } = params;

  const post = await PostsService.getPostBySlug(slug, req);

  return {
    props: {
      post,
    },
  };
}

export default BlogPost;
