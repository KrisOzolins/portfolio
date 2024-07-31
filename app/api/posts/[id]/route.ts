import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import PostsService from '@/../../lib/services/Posts';

// DELETE /api/posts/:id
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const token = request.cookies.get('jwt')?.value;
    const postId = params.id;

    // const post = await PostsService.getPost(postId);

    // if (!post) return new Response('Post Not Found', { status: 404 });

    PostsService.token = token;
    await PostsService.deletePost(parseInt(postId));

    // return new Response('Post deleted.', { status: 200 });
    return NextResponse.json({ message: 'Post deleted.' }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    // return new Response('Something Went Wrong', { status: 500 });
    return NextResponse.json({ error: { message: error.response.data.message, details: error } }, { status: 500 });
  }
};
