/** @type {import('tailwindcss').Config} */ 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom scrollbar utilities
      scrollbar: {
        DEFAULT: {
          width: '8px',
          track: {
            background: '#072741'
          },
          thumb: {
            backgroundColor: '#3498DB',
            borderRadius: '4px'
          },
          thumbHover: {
            backgroundColor: '#2980B9'
          }
        }
      }
    },
  },
  plugins: [
    // Add a plugin for custom scrollbar
    function({ addUtilities }) {
      addUtilities({
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#072741',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3498DB',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#2980B9',
          },
        }
      })
    }
  ],
}