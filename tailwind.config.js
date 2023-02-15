/** @type {import('tailwindcss').Config} */
// npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
