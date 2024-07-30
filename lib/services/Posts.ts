import BaseService from './Base';
import client from '../utils/api/client';
import config from '../../config';

// PostsService
class Posts extends BaseService {
  static BASE_URL = `/posts`;

  static async getPosts(options: { sort?: string; search?: string } = {}): Promise<any> {
    // Fake wait for 1 second.
    // if (process.env.NODE_ENV !== 'production') {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }

    try {
      let url = `${this.BASE_URL}`;

      if (options.sort) {
        url += `?sort=${options.sort}`;
      }

      if (options.search && options.search.length > 0) {
        url += url.includes('?') ? `&search=${options.search}` : `?search=${options.search}`;
      }

      // Or construct the URL using URLSearchParams:
      // const params = new URLSearchParams();
      // params.append('sort', options.sort);
      // params.append('search', options.search);
      // url += `?${params.toString()}`;

      // console.log('URL:', url);

      const response = await client.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      // throw error;
      return this.handleErrors(error);
    }
  }

  static async getPost(id: string) {
    try {
      const response = await client.get(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching post:', error.response);

      // throw error;
      // return { error: error.response.data };
      // return null;

      if (error.response.status === 404) {
        console.error('Post not found 404.');
        return null;
      }

      return this.handleErrors(error);
    }
  }

  static async getPostBySlug(slug: string, req: any = null) {
    try {
      let url = `${this.BASE_URL}/slug/${slug}`;
      const response = await client.get(url, {
        withCredentials: true,
        headers: {
          Cookie: req ? req.headers.cookie : null,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  static async getPostsByTag(tag: string) {
    try {
      let url = `${this.BASE_URL}/tag/${tag}`;
      const response = await client.get(url);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async createPost(data: { title: string; content: string; tags: string[]; archived: boolean }) {
    const { title, content, tags = [], archived } = data;

    try {
      const response = await client.post(this.BASE_URL, { title, content, tags, archived }, { headers: { Authorization: `Bearer ${Posts.token}` } });
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  static async updatePost(id: number, data: { title: string; content: string; tags: string[]; archived: boolean }) {
    const { title, content, tags, archived } = data;

    try {
      const response = await client.put(
        `${this.BASE_URL}/${id}`,
        { title, content, tags, archived },
        { headers: { Authorization: `Bearer ${Posts.token}` } },
      );
      return response.data;
    } catch (error: any) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  static async deletePost(id: number) {
    try {
      const response = await client.delete(`${this.BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${Posts.token}` } });
      return response.data;
    } catch (error: any) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  static async searchPosts(term: string) {
    try {
      // todo: Add filter and sort too.
      const response = await client.get(`${this.BASE_URL}/search?q=${term}`); // Or `${this.BASE_URL}?q=${searchTerm}` or `${this.BASE_URL}/search?q=${searchTerm}`.
      return response.data;
    } catch (error: any) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  static async getPostsCount() {
    try {
      const response = await client.get(`${this.BASE_URL}/count`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching posts count:', error);
      throw error;
    }
  }

  static async getTags() {
    try {
      const response = await client.get(`${this.BASE_URL}/tags`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  static async likePost(id: number) {
    try {
      const response = await client.post(`${this.BASE_URL}/${id}/like`, {}, { headers: { Authorization: `Bearer ${Posts.token}` } });
      return response.data;
    } catch (error: any) {
      console.error('Error liking post:', error);
      throw error;
    }
  }
}

export default Posts;
