import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto-flex)'],
      },
      container: {
        center: true,
      },
      backgroundImage: {
        'hero-shirt': "url('/hero-shirt.png')",
        'hero-player': "url('/shirt-player.png')",
        'hero-vintage': "url('/vintage-hero-wide.png')"
      },
      backgroundSize: {
        '120%': '120%',
      },
      scale: {
        '101': '101%'
      }
    },
  },
  plugins: [],
}
export default config
