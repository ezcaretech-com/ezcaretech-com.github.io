/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fb',
          100: '#cceff7',
          200: '#99dfef',
          300: '#66cfe7',
          400: '#33bfdf',
          500: '#0393D6',
          600: '#0282be',
          700: '#0271a6',
          800: '#02608e',
          900: '#014f76',
        }
      }
    }
  },
  // iOS 12 호환성을 위한 설정
  future: {
    disableColorOpacityUtilitiesByDefault: true,
  },
  corePlugins: {
    // CSS 변수 사용하는 기능 비활성화 (iOS 12 호환)
    ringColor: false,
    ringWidth: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
  },
  plugins: [],
}