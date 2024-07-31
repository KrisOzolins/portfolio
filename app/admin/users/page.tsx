'use client';
import Image from 'next/image';
import Link from 'next/link';
// import { cookies } from 'next/headers';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

import UsersService from '@/lib/services/Users';
import Header from '@/app/admin/_components/Header';
import Icon from '@/app/admin/_components/Icon';

export default function UsersPage() {
  const [cookies, setCookie] = useCookies(['jwt']); // useCookies(['token']);
  const [users, setUsers] = React.useState([]);
  const [usersSort, setUsersSort] = React.useState('asc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  useEffect(() => {
    fetchUsers({ sort: usersSort });
  }, []);

  const fetchUsers = async (options: { sort: string } = { sort: 'asc' }) => {
    try {
      setLoading(true);

      // UsersService.token = cookies().get('token');
      // UsersService.token = document.cookie;
      // UsersService.token = cookies.token;
      // UsersService.token = cookies.jwt;
      const users = await UsersService.getUsers(options);

      if (!users.error) {
        setUsers(users);
      } else {
        console.error('error', users.error);
        // setError({message: "Error message" })
        setError(users.error);
        toast.error(users.error.message, { toastId: 'error' });
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error);
        toast.error(error.message, { toastId: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  const sortUsers = () => {
    fetchUsers({ sort: usersSort === 'asc' ? 'desc' : 'asc' });
    setUsersSort(usersSort === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div className="text-gray-600 dark:text-white flex justify-center items-center h-screen -my-6">Loading...</div>;
  if (error) return <p className="text-red-400  flex justify-center items-center h-screen -my-6">Error: {error?.message}</p>;

  return (
    <>
      <Header
        title="Users"
        actions={
          <button className="text-gray-600 dark:text-white flex items-center" onClick={() => sortUsers()}>
            Sort
            {usersSort === 'asc' ? <Icon name="faChevronUp" className="w-4 h-4 ms-2" /> : <Icon name="faChevronDown" className="w-4 h-4 ms-2" />}
          </button>
        }
      />
      {/* {loading && <div className="text-gray-600 dark:text-white flex justify-center items-center h-screen -my-6">Loading...</div>} */}
      {/* {error && <p className="text-red-400  flex justify-center items-center h-screen -my-6">Error: {error?.message}</p>} */}
      {users && (
        <section className="mt-6">
          <div className="flex flex-col justify-start items-center gap-6">
            {/* {users.map((user: any) => (
              <article key={user.id} className="bg-white text-gray-600 p-4 rounded shadow w-full max-w-[500px]">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="mt-2 line-clamp-1">ID: {user.id}</p>
                <p className="mt-2 line-clamp-1">Email: {user.email}</p>
                <div className="flex flex-wrap mt-2 space-x-2">
                  <Link href={`/admin/users/${user.id}`} className="text-blue-500 hover:text-blue-600">
                    View
                  </Link>
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
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 w-40 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">{user.id}</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {user.username || user.fullName}
                    </th>
                    <td className="px-6 py-4 line-clamp-1">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/users/${user.id}`} className="text-blue-500 hover:text-blue-600">
                        View
                      </Link>
                      {/* <Link href={`/admin/users/${user.id}/delete`} className="text-red-500 hover:text-red-600">
                      Delete
                    </Link> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
