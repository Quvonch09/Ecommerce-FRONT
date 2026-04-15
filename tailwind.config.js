/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fbf8',
          100: '#d2f5e7',
          200: '#a8ead2',
          300: '#72dbb6',
          400: '#35c393',
          500: '#0fa879',
          600: '#07825f',
          700: '#0a684d',
          800: '#0c533e',
          900: '#0b4534'
        },
        ink: '#10231d',
        sand: '#f7f5ef',
        coral: '#f46f5b'
      },
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 18px 45px -24px rgba(16, 35, 29, 0.28)'
      },
      backgroundImage: {
        shell: 'radial-gradient(circle at top, rgba(15,168,121,0.18), transparent 35%), linear-gradient(180deg, #f7f5ef 0%, #ffffff 52%, #eef8f4 100%)'
      }
    }
  },
  plugins: []
};
