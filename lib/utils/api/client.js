import axios from 'axios';
import config from '../../../config';

// Axios instance
const client = axios.create({
  baseURL: config.apiServerUrl || 'http://localhost:3001/api',
  // Add other config here...
});

export default client;
