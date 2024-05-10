import {default as GoogleReCAPTCHA} from 'react-google-recaptcha';

const useRecaptcha = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  return <GoogleReCAPTCHA sitekey={siteKey} />;
};
