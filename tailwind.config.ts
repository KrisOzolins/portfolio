import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  // Required to make sure Tailwind generates certain class names that don’t always exist in the content files.
  safelist: ['ml-48', 'ml-32', 'ml-0', 'left-48', 'left-32', 'left-0', 'duration-300'],
  darkMode: 'selector', // To support toggling dark mode manually instead of relying on the operating system preference, use the "selector" strategy.
  theme: {
    // (Re)define screens here to make them available for use in the app.
    screens: {
      ...defaultTheme.screens,

      // Bootstrap breakpoint and max-width based.
      // 'sm': { max: '576px' },
      // 'md': { max: '768px' },
      // 'lg': { max: '992px' },
      // 'xl': { max: '1200px' },
      // '2xl': { max: '1400px' },

      // Different breakpoints for different devices.
      // sm: '480px',
      // md: '768px',
      // lg: '976px',
      // xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        header: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-roboto)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'], // Could also use JetBrains Mono, which is a nice mono font.
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      colors: {
        // Dark (default) theme colors.
        foreground: colors.white,
        'foreground-alt': colors.gray[300],
        background: 'rgb(27, 27, 27)',
        'background-alt': 'rgb(32, 32, 32)',
        'primary-accent': 'rgb(242, 95, 58)',
        'secondary-accent-dark': colors.blue[800],
        'secondary-accent-light': colors.blue[100],
        'secondary-accent-regular': colors.blue[400],
        'gray-dark': colors.gray[700],
        'gray-light': colors.gray[300],
        'gray-regular': colors.gray[500],
        error: colors.red[400],
        'error-dark': colors.red[600],

        // Light theme colors.
        'light-white': 'rgb(27, 27, 27)',
        'light-foreground': colors.gray[900],
        'light-foreground-alt': colors.gray[800],
        'light-background': colors.gray[100],
        'light-background-alt': colors.gray[200],
        'light-primary-accent': 'rgb(242, 95, 58)',
        'light-secondary-accent-dark': colors.blue[800],
        'light-secondary-accent-light': colors.blue[100],
        'light-secondary-accent-regular': colors.blue[500],
        'light-gray-dark': colors.gray[700],
        'light-gray-light': colors.gray[300],
        'light-gray-regular': colors.gray[500],
        'light-error': colors.red[400],
        'light-error-dark': colors.red[600],
      },
    },
  },
  plugins: [],
};

export default config;
