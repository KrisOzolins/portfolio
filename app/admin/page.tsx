import Image from 'next/image';
import Link from 'next/link';

// import { useAuth } from '@/app/_lib/context/AuthContext';
import PostsService from '@/lib/services/Posts';
import Header from '@/app/admin/_components/Header';
import Content from './home-page-content.mdx';
import styles from './home-page.module.scss';

export default async function HomePage() {
  const { count } = await PostsService.getPostsCount();
  // const { user } = useAuth();
  // console.log(user);

  // Simulate a delay to show the loading state (loading.tsx).
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <>
      <Header title="Overview" />
      <section className="mt-6 testclass">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Post Count</h2>
            <p className="mt-2 text-gray-600 dark:text-white">
              You have {count} {count === 1 ? 'post' : 'posts'}.
            </p>
          </article>
          <article className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Other Data</h2>
            <p className="mt-2 text-gray-600 dark:text-white">Some other information for the dashboard.</p>
          </article>
          <article className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Card Title</h2>
            <p className="mt-2 text-gray-600 dark:text-white line-clamp-1">Card content goes here...</p>
            <div className="flex flex-wrap mt-2 space-x-2">
              <button className="text-blue-500 hover:text-blue-600">CTA</button>
            </div>
          </article>
        </div>
        <div className={`${styles.mdx} mt-6 text-gray-800 dark:text-white`}>
          <Content />
        </div>
      </section>
    </>
  );
}
