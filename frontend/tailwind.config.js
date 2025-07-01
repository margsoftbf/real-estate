/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        h1: ['64px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-xl': ['20px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-xl-bold': ['20px', { lineHeight: '1.6', fontWeight: '700' }],
        'body-xl-tight': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-lg-bold': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md-medium': ['16px', { lineHeight: '1.6', fontWeight: '500' }],
        'body-md-bold': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'body-sm': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'body-sm-medium': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-sm-bold': ['14px', { lineHeight: '1.4', fontWeight: '700' }],
        'body-xs': ['12px', { lineHeight: '1.3', fontWeight: '400' }],
        'body-xs-medium': ['12px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-xs-bold': ['12px', { lineHeight: '1.3', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};

export default config;
