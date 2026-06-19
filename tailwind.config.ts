import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#1a73e8',
        accent2: '#0d47a1',
        'accent-light': '#e8f0fe',
        bg: '#f0f4f8',
      },
    },
  },
  plugins: [],
}
export default config
