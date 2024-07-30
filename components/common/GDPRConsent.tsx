import React from 'react';
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const GDPRConsent = () => (
  <CookieConsent
    location="bottom"
    buttonText="Accept"
    declineButtonText="Decline"
    cookieName="gdpr-consent"
    // style={{ background: "#2B373B" }}
    // buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
    // use tailwind classes and not style prop
    containerClasses="!bg-zinc-800 !text-white !z-[9999] !border-t-2 !border-primary-accent"
    // contentClasses="text-sm"
    buttonClasses="!bg-primary-accent !text-white !px-4 !py-2 !rounded"
    // declineButtonClasses="bg-secondary text-white px-4 py-2 rounded"
    expires={150}
    // overlay
  >
    This website uses cookies to enhance the user experience.{' '}
    <span className="text-xs">
      By using our website, you consent to all cookies in accordance with our{' '}
      <Link href="/privacy-policy" className="underline">
        Cookie Policy
      </Link>
      .
    </span>
  </CookieConsent>
);

export default GDPRConsent;
