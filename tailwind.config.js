module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line as necessary to include all files that will use Tailwind CSS
  ],
  theme: {
    extend: {
      // Example of extending colors
      colors: {
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      },
      // Example of adding custom font family
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      // Add or customize other theme values like spacing, borderWidths, etc.
    },
  },
  plugins: [
    // Here you can add plugins for additional utilities, components, or custom variants
  ],
};
