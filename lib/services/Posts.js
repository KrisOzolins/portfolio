import client from '../utils/api/client';
import config from '../../config';

// PostsService
class Posts {
  static BASE_URL = `/posts`;

  static async getPosts(options = {}) {
    try {
      let url = `${this.BASE_URL}`;
      if (options.sort) {
        url += `?sort=${options.sort}`;
      }
      const response = await client.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async createPost(data) {
    const { title, content, tags = [] } = data;

    try {
      const response = await client.post(this.BASE_URL, { title, content, tags });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  static async updatePost(id, data) {
    const { title, content, tags } = data;

    try {
      const response = await client.put(`${this.BASE_URL}/${id}`, { title, content, tags });
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      const response = await client.delete(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  static async searchPosts(term) {
    try {
      // todo: Add filter and sort too.
      const response = await client.get(`${this.BASE_URL}/search?q=${term}`); // Or `${this.BASE_URL}?q=${searchTerm}` or `${this.BASE_URL}/search?q=${searchTerm}`.
      return response.data;
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  }

  static anotherFunction = async () => {
    // ...
  };
}

export default Posts;
