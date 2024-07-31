import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import UsersService from '@/lib/services/Users';

const authorize = async (request: NextRequest) => {
  const token = request.cookies.get('jwt')?.value;

  if (!token) {
    return Response.redirect(new URL('/admin/login', request.url));
  }

  const currentUser = token ? await UsersService.isAuthenticated(token) : null;
  const currentUserExists = currentUser && currentUser.id;

  if (!currentUserExists && request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (currentUserExists) {
    // UsersService.currentUser = currentUser;

    if (currentUser.banned && !request.nextUrl.pathname.startsWith('/admin/login')) {
      // Check if the "banned" query parameter is already set to prevent infinite redirects.
      // const url = new URL(request.url);
      // if (!url.searchParams.get('banned')) {
      //   url.pathname = '/admin/login';
      //   url.searchParams.set('banned', 'true');
      //   await UsersService.logout(token);
      //   request.cookies.delete('jwt');
      //   return NextResponse.redirect(url);
      // }

      try {
        await UsersService.logout(token);
        // cookies().delete('jwt');
      } catch (error) {
        console.log('error:', error);
      }

      return NextResponse.redirect(new URL(`/admin/login?status=${UsersService.USER_STATUS.BANNED}`, request.url));
    }

    if (request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Checked in ownerOrAdmin Express middleware.
    // if (request.nextUrl.pathname.startsWith('/admin/users') && currentUser.role !== 'admin') {
    //   return NextResponse.redirect(new URL('/admin', request.url));
    // }

    if (request.nextUrl.pathname.startsWith('/admin/posts/new') && currentUser.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    if (request.nextUrl.pathname.match(/^\/admin\/posts\/(\d+)\/edit$/) && currentUser.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const data = await authorize(request);

    if (data) {
      return data;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
