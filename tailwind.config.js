module.exports = {
  content: [
    "./index.html",
    "./src/**/*.jsx"
   ],
  theme: {
    extend: {
      keyframes: {
        'spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'animate-spin': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
