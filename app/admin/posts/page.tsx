'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import PostsService from '@/lib/services/Posts';
import Header from '@/app/admin/_components/Header';
import Icon from '@/app/admin/_components/Icon';

export default function PostsPage() {
  // const posts = await PostsService.getPosts();

  const [posts, setPosts] = React.useState([]);
  const [postsSort, setPostsSort] = React.useState('asc');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  const user = useSelector((state: any) => state.app.user); // state.auth.user

  useEffect(() => {
    fetchPosts({ sort: postsSort });
  }, []);

  const fetchPosts = async (options: { sort: string } = { sort: 'asc' }) => {
    try {
      setLoading(true);
      const posts = await PostsService.getPosts(options);
      if (!posts.error) {
        setPosts(posts);
        setLoading(false);
      } else {
        console.error('error', posts.error);
        setError(posts.error);
        setLoading(false);
        toast.error(posts.error.message, { toastId: 'error' });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error instanceof Error) {
        setError(error);
        toast.error(error.message, { toastId: 'error' });
      }
    }
  };

  const handleDeleteProperty = async (postId: any) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

      if (res.status === 200) {
        // Remove the property from state.
        // const updatedProperties = properties.filter(
        //   (property) => property._id !== postId
        // );

        // setProperties(updatedProperties);

        // toast.success('Property deleted.');

        // console.log('Post deleted.');

        // const posts = await PostsService.getPosts({ sort: postsSort });
        // setPosts(posts);

        // Filter out the deleted post.
        setPosts(posts.filter((post: any) => post.id !== postId));
        toast.success('Post deleted.');
      } else {
        const json = await res.json();
        // if (!res.ok) {
        //   toast.error(res.data.message || 'Failed to delete post.', { toastId: 'error' });
        //   throw new Error(`Response status: ${res.status}`);
        // }
        throw new Error(json.error?.message || 'Failed to delete post.');
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { toastId: 'error' });
      // toast.error(error.response.data.message, { toastId: 'error' });
    }
  };

  const sortPosts = () => {
    fetchPosts({ sort: postsSort === 'asc' ? 'desc' : 'asc' });
    setPostsSort(postsSort === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div className="text-gray-600 dark:text-white flex justify-center items-center h-screen -my-6">Loading...</div>;
  if (error) return <p className="text-red-400  flex justify-center items-center h-screen -my-6">Error: {error?.message}</p>;

  return (
    <>
      <Header
        title="Posts"
        actions={
          <>
            <button className="text-gray-600 dark:text-white flex items-center" onClick={() => sortPosts()}>
              Sort
              {postsSort === 'asc' ? <Icon name="faChevronUp" className="w-4 h-4 ms-2" /> : <Icon name="faChevronDown" className="w-4 h-4 ms-2" />}
            </button>
            <Link href="/admin/posts/new" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add New
            </Link>
          </>
        }
      />
      <section className="mt-6">
        <div className="flex flex-col justify-start items-center gap-6">
          {/* {posts.map((post: any) => (
            <article key={post.id} className="bg-white text-gray-600 p-4 rounded shadow w-full max-w-[500px]">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 line-clamp-3">{post.content}</p>
              <div className="flex flex-wrap mt-2 space-x-2">
                <Link href={`/admin/posts/${post.id}`} className="text-blue-500 hover:text-blue-600">
                  View
                </Link>
                <Link href={`/admin/posts/${post.id}/delete`} className="text-red-500 hover:text-red-600">
                  Delete
                </Link>
                <button onClick={() => handleDeleteProperty(post.id)} className="text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </article>
          ))} */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 w-20">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 w-60">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 w-40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{post.id}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {post.title}
                  </th>
                  <td className="px-6 py-4 line-clamp-1">{post.content}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/posts/${post.id}`} className="text-blue-500 hover:text-blue-600 me-5">
                      View
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        {/* <Link href={`/admin/posts/${post.id}/delete`} className="text-red-500 hover:text-red-600">
                          Delete
                        </Link> */}
                        <button onClick={() => handleDeleteProperty(post.id)} className="text-red-500 hover:text-red-600">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <table className="w-full text-gray-600 text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-20 p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="w-40 text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-200">
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td className="text-right">
                    <Link href={`/admin/posts/${post.id}`} className="text-blue-500 hover:text-blue-600 me-5">
                      View
                    </Link>
                    <Link href={`/admin/posts/${post.id}/delete`} className="text-red-500 hover:text-red-600">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </section>
    </>
  );
}
