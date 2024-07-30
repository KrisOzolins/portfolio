import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
// import { NextRequest } from 'next/server';
// import { useSelector } from 'react-redux';

import PostsService from '@/lib/services/Posts';
import Header from '@/app/admin/_components/Header';
import Icon from '@/app/admin/_components/Icon';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await PostsService.getPost(params.id);

  // const headersList = headers();
  // console.log('headersList:', headersList);
  // for (const [name, value] of headersList) {
  //   console.log(`${name}: ${value}`);
  // }
  // console.log(NextRequest);

  // const user = useSelector((state: any) => state.app.user); // state.auth.user

  // console.log('user:', user);
  // console.log('post:', post);

  if (!post || post.error) {
    notFound();
  }

  return (
    <>
      <Header
        title={`Post: ${post.title}`}
        actions={
          <>
            <Link href={`/admin/posts`} className="text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
              <Icon name="faChevronLeft" className="me-1" />
              Back
            </Link>
            <Link href={`/admin/posts/${post.id}/edit`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <Icon name="faPen" className="me-1" />
              Edit
            </Link>
          </>
        }
      />
      <section className="mt-6">
        <div className="flex flex-col justify-start items-center gap-6 text-gray-600 dark:text-white">{post.content}</div>
      </section>
    </>
  );
}
