import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const userCookie = {
    id: 1,
    name: 'Krisjanis Ozolins',
    email: 'kris.ozolins@gmail.com',
    // isAdmin: true,
    role: 'admin',
  };

  if (!userCookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = userCookie;

  return NextResponse.json({ user });
}
