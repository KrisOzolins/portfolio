import axios from 'axios';
import config from '@/config';

// Axios instance
const client = axios.create({
  baseURL: config.apiServerUrl || 'http://localhost:3001/api',
  timeout: 5000, // 5 seconds, might lower to 2500 (2.5 seconds).
  headers: {
    'Content-Type': 'application/json',
    // 'X-Custom-Header': 'foobar',
    // 'X-Custom-Auth-Token': 1,
  },
  // Add other config here...
});

// client.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default client;
