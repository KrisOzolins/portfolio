import BaseService from './Base';
import client from '@/lib/utils/api/client';
import config from '@/config';

// UsersService
class Users extends BaseService {
  static BASE_URL = `/users`;
  static USER_STATUS = {
    BANNED: 1,
    NOT_VERIFIED: 2,
  };
  static currentUser = null;

  static async getUsers(options: { sort?: string } = {}): Promise<any> {
    // Fake wait for 1 second to test loading states.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      let url = `${this.BASE_URL}`;

      if (options.sort) {
        url += `?sort=${options.sort}`;
      }

      const response = await client.get(url, { headers: { Authorization: `Bearer ${Users.token}` } });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return this.handleErrors(error);
    }
  }

  static async getUser(id: number | string): Promise<any> {
    try {
      const response = await client.get(`${this.BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching users:', error);

      if (error.response.status === 404) {
        console.error('User not found 404.');
        return null;
      }

      return this.handleErrors(error);
    }
  }

  static async getUsersCount() {
    try {
      const response = await client.get(`${this.BASE_URL}/count`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching user count:', error);
      throw error;
    }
  }

  static async login(data: { email: string; password: string }, userAgent: string | null = null, grantType = 'password') {
    const { email, password } = data;

    // Parse FormData
    // const parsedData = new FormData(data);
    // console.log(parsedData.email);

    try {
      const response = await client.post(`${this.BASE_URL}/login`, { email, password, userAgent });
      return response.data;
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  static async logout(token: string) {
    try {
      const response = await client.post(`${this.BASE_URL}/logout`, { token });
      return response.data;
    } catch (error: any) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  static async isAuthenticated(token: string) {
    try {
      // const response = await client.post(`${this.BASE_URL}/authenticated`, { token });
      // return response.data;

      // Use fetch instead of axios as an alternative/example.
      const response = await fetch(`${config.apiServerUrl}${this.BASE_URL}/authenticated`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Auth error:', response);
        return { error: { message: response.statusText, details: response } };
      }
    } catch (error: any) {
      console.error('Error checking authentication:', error);
      return { error: { message: error.message, details: error } };
    }
  }

  static anotherFunction = async () => {
    // ...
  };
}

export default Users;
