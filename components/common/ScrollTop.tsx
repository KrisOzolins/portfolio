import { useEffect, useState } from 'react';

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      const headerNavHeight = document.querySelector('.header-nav')?.clientHeight || 0;
      const headerHeight = (document.querySelector('header.header')?.clientHeight || 0) - headerNavHeight;
      if (window.scrollY > headerHeight) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={`fixed bottom-8 right-8 flex-col gap-3 transition-all z-[9999] ${show ? 'opacity-100' : 'opacity-0'}`}>
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full transition-all p-2 text-gray-light bg-gray-dark hover:bg-gray-regular"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTop;
