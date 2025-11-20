import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          500: '#2563eb',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
