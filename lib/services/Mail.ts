import axios from 'axios';
import config from '../../config';
import client from '../utils/api/client';

interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  token: string;
}

// MailService
class Mail {
  static async sendContactMail(data: ContactEmailData) {
    try {
      const response = await client.post(`/contact`, data);
      return response.data;
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }
}

export default Mail;
