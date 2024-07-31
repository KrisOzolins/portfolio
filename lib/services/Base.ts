// import { cookies } from 'next/headers';
import { Cookies } from 'react-cookie';

class BaseService {
  // static backendCookies = cookies();
  static cookies = typeof window !== 'undefined' ? new Cookies() : null;
  static token = this.cookies?.get('jwt') || null;
  // static token = document.cookie.split('=')[1] || null;
  // static token = cookies().get('jwt') || null;
  // static token = this.cookies.get('jwt') || this.backendCookies.get('jwt') || null;
  // static token = 'ey...'; // For testing purposes.

  static handleErrors(error: any) {
    // throw error; // For now disable re-throwing errors.
    console.error('API Error:', error);
    return { error: { message: error.response.data.message, details: error } };
  }
}

// console.log("BaseService.cookies.jwt:", BaseService.cookies?.get('jwt'));

export default BaseService;
