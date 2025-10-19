/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : 'class' ,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          "0%, 100%": { transform: "translateY(-70px)" },
          "50%": { transform: "translateY(-19px)" },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
        float: "float 3s infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

