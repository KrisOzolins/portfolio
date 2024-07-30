import { useEffect, useState, useRef } from 'react';
import NavSecondary from './NavSecondary';
import Typewriter from '../common/Typewriter';
import Icon from '../common/Icon';
import Particles from '../common/Particles';

import styles from '@/styles/components/portfolio/Hero.module.scss';

const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

function Hero({
  width = 0,
  leftSpacing = 0,
  headerVisible = true,
  toggleHeaderVisibility,
  toggleDarkMode,
  darkMode = true,
}: {
  width?: number;
  leftSpacing?: number;
  headerVisible?: boolean;
  toggleHeaderVisibility: () => void;
  toggleDarkMode: () => void;
  darkMode?: boolean;
}) {
  const navSecondaryRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (navSecondaryRef.current) {
        const el = navSecondaryRef.current;
        if (window.scrollY > 0) {
          if (el.classList.contains('absolute')) {
            el.classList.add(darkMode ? 'bg-background' : 'bg-light-background', 'shadow-lg', 'fixed');
            el.classList.remove('absolute', 'text-white');
          }
        } else {
          if (el.classList.contains('fixed')) {
            el.classList.remove('bg-background', 'bg-light-background', 'text-white', 'shadow-lg', 'fixed');
            el.classList.add('absolute', 'text-white');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkMode]);

  const bgStyle = {
    // backgroundPosition: `center -${Math.max(0, scrollY / 3)}px`,
    transform: `translateY(-${Math.max(0, scrollY / 3)}px)`,
  };

  return (
    <>
      <NavSecondary
        ref={navSecondaryRef}
        leftSpacing={leftSpacing}
        scrollY={scrollY}
        toggleHeaderVisibility={toggleHeaderVisibility}
        headerVisible={headerVisible}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <div className={`${styles['hero-bg']} grayscale rounded-bl-xl`} style={bgStyle}></div>
      <section className={`${styles.hero} hero h-screen`} id="home">
        <div className="h-full flex flex-col justify-center items-center relative text-white">
          {/* <Particles /> */}
          <h1 className="text-7xl mb-3 font-bold">
            Kris<span className="font-outlined">Ozolins</span>
          </h1>
          <div className="w-[365px] bg-opacity-50 font-mono text-lg font-bold select-none">
            <Typewriter strings={['Freelance web developer', 'App developer', 'Game developer']} />
          </div>
          <div className="mt-5 flex gap-5 w-[365px] justify-center lg:justify-start">
            <a
              href="#contact"
              className="cta hover:bg-gray-dark hover:border-gray-dark w-32 h-12 uppercase text-xs font-bold flex justify-center items-center border border-white rounded-3xl transition ease-linear "
            >
              Hire Me
            </a>
            <a
              href="#details"
              className="cta bg-white text-gray-dark hover:bg-gray-dark hover:text-white w-32 h-12 uppercase text-xs font-bold flex justify-center items-center rounded-3xl transition ease-linear "
            >
              See details
            </a>
          </div>
          {scrollY <= screenHeight / 2 && (
            <a href="#about" className="scroll-down-arrow smooth-scroll absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-8" title="Learn more">
              <span className="animated-arrow relative">
                <Icon name="arrow-down" size="2x" />
              </span>
            </a>
          )}
        </div>
      </section>
    </>
  );
}

export default Hero;
