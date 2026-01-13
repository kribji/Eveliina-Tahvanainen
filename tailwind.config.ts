import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue LT Pro"', 'helvetica-lt-pro', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        text: '#4A3C30',
      },
      letterSpacing: {
        header: '0.3em',
        body: '0.1em',
      },
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
