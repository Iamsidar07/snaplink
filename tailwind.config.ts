import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#144EE3',
        'secondary': '#353C4A',
      },
      backgroundColor: {
        'primary': '#144EE3',
        'secondary': '#181E29',
      },
      dropShadow: {
        'primary': '4px 8px 7px #144EE3',
      },
      borderColor: {
        'secondary': '#353C4A',
      },
      fontFamily: {
        "syne": "var(--font-syne)",
      }
    },
  },
  plugins: [],
}
export default config
