'use client';

import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';

// import { authenticate } from '@/app/lib/actions';
import { authenticate } from '@/app/admin/_lib/actions';
import UsersService from '@/lib/services/Users';
import config from '@/config';

import logo from '@/assets/icon.svg';

const Spinner = () => (
  <svg
    aria-hidden="true"
    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

// export default function Page() {
//   return (
//     <form action={authenticate}>
//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

export default function LoginPage({ searchParams }: { searchParams: { status?: string } }) {
  const [errorMessage, dispatch] = useFormState(
    authenticate,
    parseInt(searchParams.status || '') === UsersService.USER_STATUS.BANNED ? 'User is banned.' : undefined,
  );
  // const { pending } = useFormStatus();

  // if (pending) {
  //   return <p>Loading...</p>;
  // }

  return (
    // <form action={dispatch} className="flex flex-col items-center gap-3 text-gray-800 w-64">
    //   <input type="email" name="email" placeholder="Email" required className='p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md' />
    //   <input type="password" name="password" placeholder="Password" required className='p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md' />
    //   <LoginButton />
    //   {errorMessage && <p className='text-red-400 text-sm'>{errorMessage}</p>}
    // </form>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
        {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        krisozolins.com */}
        {/* <Image src={logo} alt={`${config.projectName} logo`} width={32} height={32} className="mr-2 w-8 h-8" /> */}
        Admin - {config.projectName}
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 dark:text-white">Sign in to your account</h1>
          <form className="space-y-4 md:space-y-6" action={dispatch}>
            {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
            {/* {pending && <p className="text-red-400 text-sm">Loading...</p>} */}
            {/* <PendingMessage /> */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    // required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Forgot password?
              </a> */}
            </div>
            {/* <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button> */}
            <LoginButton />
            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Sign up
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    // <button
    //   type="submit"
    //   aria-disabled={pending}
    //   onClick={handleClick}
    //   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
    // >
    //   Login
    // </button>
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      onClick={handleClick}
      className="flex justify-center relative w-full text-light-white bg-white dark:text-white dark:bg-gray-800 dark:hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
    >
      {pending && (
        <div role="status" className="mr-3 absolute left-1/2 -translate-x-12">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      Sign in
    </button>
  );
}

function PendingMessage() {
  const { pending } = useFormStatus();

  return pending && <p className="text-red-400 text-sm">Loading...</p>;
}
