import { MetadataRoute } from 'next';
import PostsService from '@/lib/services/Posts';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await PostsService.getPosts();
  const uniqueTags = new Set<string>();

  if (posts instanceof Array) {
    posts.forEach((post: any) => {
      post.tags.forEach((tag: string) => {
        uniqueTags.add(tag);
      });
    });
  }

  if (posts.error) {
    return [];
  }

  return [
    {
      url: BASE_URL,
      lastModified: '2024-05-10',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(posts[posts.length - 1]?.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts.map((post: any) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
    {
      url: `${BASE_URL}/archive`,
      lastModified: new Date(posts[posts.length - 1]?.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(posts[posts.length - 1]?.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...Array.from(uniqueTags).map((tag: string) => ({
      url: `${BASE_URL}/tags/${tag}`,
      lastModified: new Date(posts[posts.length - 1]?.updatedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.5,
    })),
    {
      url: `${BASE_URL}/wiki`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/now`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          lv: `${BASE_URL}/lv/privacy-policy`,
        },
      },
    },
  ];
}
