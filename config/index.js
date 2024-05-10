// import './envConfig.ts';

const dev = process.env.NODE_ENV !== 'production';

const protocol = dev ? 'http' : 'https';
const host = dev ? 'localhost' : 'krisozolins.com';
const port = dev ? 3001 : 80;

const config = {
  protocol: process.env.NEXT_PUBLIC_NODE_PROTOCOL || protocol,
  host: process.env.NEXT_PUBLIC_NODE_HOST || host,
  port: process.env.NEXT_PUBLIC_NODE_PORT || port,
  apiServerUrl: `${process.env.NEXT_PUBLIC_NODE_PROTOCOL || protocol}://${process.env.NEXT_PUBLIC_NODE_HOST || host}:${process.env.NEXT_PUBLIC_NODE_PORT || port}/api`,
  mapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  projectName: 'krisozolins.com', // siteName
  email: 'kris.ozolins@gmail.com',
  phone: '+371 27046767',
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
};

export default config;
