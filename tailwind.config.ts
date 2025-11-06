// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDF3EA', // main background
        accent: '#B19074', // gradient / highlight
        text: '#4A3C30', // main text color
      },
      letterSpacing: {
        header: '0.3em', // 30%
        body: '0.1em', // 10%
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
