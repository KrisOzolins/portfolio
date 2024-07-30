import { useState, useEffect } from 'react';
import Image from 'next/image';
import config from '@/config';
import Icon from '@/components/common/Icon';
import Lightbox from '@/components/common/Lightbox';
import NavPrimary from './NavPrimary';
import { detectColorMode, svgToDataURL } from '@/helpers';

// Use tempLogo before useEffect has run to prevent the SSR hydration error.
import tempLogo from '@/assets/icon.svg';
import Logo from '@/components/common/Logo';
import krisozolinsPic from '@/assets/krisozolins.jpg';

function Header({
  isMdOrBelow = false,
  headerVisible = true,
  toggleHeaderVisibility,
}: {
  isMdOrBelow?: boolean;
  headerVisible?: boolean;
  toggleHeaderVisibility: () => void;
}) {
  const [logo, setLogo] = useState('');
  const [showKrisOzolinsPicLightbox, setShowKrisOzolinsPicLightbox] = useState(false);

  useEffect(() => {
    setLogo(detectColorMode() === 'dark' ? svgToDataURL(<Logo color="white" />) : svgToDataURL(<Logo color="rgb(27, 27, 27)" />));

    const closeNav = (e: MouseEvent) => {
      if (isMdOrBelow && headerVisible && e.target instanceof HTMLElement && !e.target.closest('.side-nav-toggle-btn')) {
        toggleHeaderVisibility();
      }
    };

    document.addEventListener('click', closeNav);

    return () => {
      document.removeEventListener('click', closeNav);
    };
  }, [headerVisible, isMdOrBelow]);

  const krisozolinsPicAlt = 'Krisjanis Ozolins picture';

  return (
    <>
      {isMdOrBelow && headerVisible && (
        <div className="fixed inset-0 bg-light-gray-dark/25 dark:bg-gray-dark/25 bg-opacity-75 backdrop-blur z-30" onClick={toggleHeaderVisibility}>
          <button className="side-nav-toggle-btn absolute top-2 right-2" title="Toggle side menu" onClick={toggleHeaderVisibility}>
            <Icon name="times" />
          </button>
        </div>
      )}
      <header
        className={`header bg-light-background dark:bg-background ${isMdOrBelow ? 'w-48' : 'w-32'} xl:w-48 h-full transition-transform duration-300 ${isMdOrBelow ? (headerVisible ? 'ease-out translate-x-0' : 'ease-in -translate-x-48') : ''} flex flex-col justify-start items-center fixed z-50`}
      >
        <h1 className="p-2 flex justify-center items-center font-bold text-sm xl:text-base min-h-10">
          <Image src={logo || tempLogo} alt={`${config.projectName} logo`} width={16} height={16} className="me-2 w-4 h-4" />
          {config.projectName}
        </h1>
        <Image
          src={krisozolinsPic}
          alt={krisozolinsPicAlt}
          width={isMdOrBelow ? 192 : 128}
          height={isMdOrBelow ? 192 : 128}
          className={`${isMdOrBelow ? 'h-48 w-48' : 'h-32 w-32'} xl:h-48 xl:w-48 grayscale hover:grayscale-0 transition ease-linear duration-500 cursor-pointer`}
          onClick={() => setShowKrisOzolinsPicLightbox(true)}
        />
        <NavPrimary />
      </header>
      <Lightbox src={krisozolinsPic} alt={krisozolinsPicAlt} show={showKrisOzolinsPicLightbox} onClose={() => setShowKrisOzolinsPicLightbox(false)} />
    </>
  );
}

export default Header;
