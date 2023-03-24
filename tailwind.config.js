module.exports = {
  // content: ['./src/*.html'],
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
