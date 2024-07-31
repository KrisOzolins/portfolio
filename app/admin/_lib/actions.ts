'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { red } from 'tailwindcss/colors';

// import { signIn } from '@/auth'
import store from '@/store';
import { setUser } from '@/store/slices/appSlice';
import UsersService from '@/lib/services/Users';

// async function signIn(type: string, formData: FormData) {
//   console.log('signIn', type, formData);
//   // const response = await fetch('/api/auth/signin', { method: 'POST', body: formData });
//   // if (response.ok) {
//   //   return response.json();
//   // } else {
//   //   const error = await response.json();
//   //   throw error;
//   // }
//   if (type === 'credentials') {
//     const formDataToJson = Object.fromEntries(formData);
//     console.log(formDataToJson);
//     const response = await UsersService.login(formDataToJson);
//     return response;
//   }
//   throw new Error('Invalid sign in type.');
// }

// async function signOut() {
//   console.log('signOut');
//   // const response = await fetch('/api/auth/signout', { method: 'POST' });
//   // if (response.ok) {
//   //   return response.json();
//   // } else {
//   //   const error = await response.json();
//   //   throw error;
//   // }
//   const response = await UsersService.logout(cookies().get('token'));
//   return response;
// }

export async function authenticate(_currentState: unknown, formData: FormData) {
  // Fake delay to simulate async request.
  if (process.env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  try {
    // const response = await fetch('/api/auth/signin', { method: 'POST', body: formData });
    // const user = await signIn('credentials', formData);
    const userAgent = headers().get('user-agent');
    const user = await UsersService.login(Object.fromEntries(formData) as { email: string; password: string }, userAgent);

    store.dispatch(setUser(user));

    const rememberMe = formData.get('remember');

    cookies().set('jwt', user.token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // path: '/',
      // sameSite: 'strict',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 days in seconds.
      // expires: rememberMe ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) : undefined,
    });
  } catch (error: any) {
    console.error(error);
    // throw error;
    return error.response.data.message || error.message || 'Something went wrong.';
  }

  redirect('/admin');
}

export async function logout(_currentState: unknown) {
  try {
    // const response = await fetch('/api/auth/signout', { method: 'POST' });
    // const user = await signOut();
    await UsersService.logout(cookies().get('jwt')?.value as string);

    // cookies().delete('token');
    cookies().delete('jwt');
  } catch (error: any) {
    console.error(error);
    // throw error;
    return error.response.data.message || error.message || 'Something went wrong.';
  }

  redirect('/admin/login');
}
