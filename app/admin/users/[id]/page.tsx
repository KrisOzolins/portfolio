import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// import { cookies } from 'next/headers';
// import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';

import UsersService from '@/lib/services/Users';
import Header from '@/app/admin/_components/Header';
import Icon from '@/app/admin/_components/Icon';

export default async function UserPage({ params }: { params: { id: string } }) {
  // const [cookies, setCookie] = useCookies(['jwt']);

  // UsersService.token = cookies().get('token')?.value;
  // UsersService.token = cookies().get('jwt')?.value

  const user = await UsersService.getUser(params.id);

  if (!user || user.error) {
    notFound();
  }

  return (
    <>
      <Header
        title={`User: ${user.username}`}
        actions={
          // <Link href={`/admin/users`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          //   Back
          // </Link>
          <Link href={`/admin/users`} className="text-gray-500 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
            <Icon name="faChevronLeft" className="me-1" />
            Back
          </Link>
        }
      />
      <section className="mt-6">
        {/* <div>
          <Link href={`/admin/users/${user.id}/edit`} className="text-blue-500 hover:text-blue-600">
            Edit
          </Link>
        </div> */}
        {/* <div className="flex flex-col justify-center items-start gap-1 my-2 text-gray-600 dark:text-white">
          <p className="text-gray-600 dark:text-white">ID: {user.id}</p>
          <p className="text-gray-600 dark:text-white">Username: {user.username}</p>
          <p className="text-gray-600 dark:text-white">Email: {user.email}</p>
        </div> */}
        <article className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">User Details</h2>
          <dl className="grid grid-cols-[4fr_6fr] lg:grid-cols-[2fr_8fr] gap-1">
            <dt className="text-gray-600 dark:text-white font-bold">ID:</dt>
            <dd className="text-gray-600 dark:text-white">{user.id}</dd>

            <dt className="text-gray-600 dark:text-white font-bold">Username:</dt>
            <dd className="text-gray-600 dark:text-white">{user.username || user.fullName}</dd>

            <dt className="text-gray-600 dark:text-white font-bold">Email:</dt>
            <dd className="text-gray-600 dark:text-white">{user.email}</dd>

            <dt className="text-gray-600 dark:text-white font-bold">Role:</dt>
            <dd className="text-gray-600 dark:text-white capitalize">{user.role}</dd>

            <dt className="text-gray-600 dark:text-white font-bold">Verified:</dt>
            <dd className="text-gray-600 dark:text-white">
              {user.verified ? <Icon name="faCheck" className="w-4 h-4 text-green-500" /> : <Icon name="faXmark" className="w-4 h-4 text-red-500" />}
            </dd>

            <dt className="text-gray-600 dark:text-white font-bold">Created:</dt>
            <dd className="text-gray-600 dark:text-white text-sm">
              {/* {dayjs(user.createdAt).format('YYYY-MM-DD @ HH:mm:ss')} */}
              <time dateTime={user.createdAt}>{dayjs(user.createdAt).format('MMMM D, YYYY')}</time>
            </dd>

            <dt className="text-gray-600 dark:text-white font-bold">Last login:</dt>
            <dd className="text-gray-600 dark:text-white text-sm">
              <time dateTime={user.lastLogin}>{dayjs(user.lastLogin).format('MMMM D, YYYY')}</time>
            </dd>

            <dt className="text-gray-600 dark:text-white font-bold">Google OAuth 2.0:</dt>
            {/* <p className="text-gray-600 dark:text-white">{user.googleOAuth ? 'Yes' : 'No'}</p> */}
            <dd className="text-gray-600 dark:text-white">
              {/* {user.googleId ? 'Yes' : 'No'} */}
              {user.googleId ? <Icon name="faCheck" className="w-4 h-4 text-green-500" /> : <Icon name="faXmark" className="w-4 h-4 text-red-500" />}
            </dd>

            {user.photo && (
              <>
                <dt className="text-gray-600 dark:text-white font-bold w-12 h-12 flex items-center">Photo:</dt>
                <dd className="flex items-center">
                  <Image src={user.photo} alt={user.username || user.fullName} width={48} height={48} className="rounded-full" />
                </dd>
              </>
            )}
          </dl>
        </article>
      </section>
    </>
  );
}
