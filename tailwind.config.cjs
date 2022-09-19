/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				alumni: ["Alumni Sans Pinstripe", "sans-serif"],
			},
      colors: {
        'cute': '#ed3bb0',
        'cool': '#0f82f5',
        'passion': '#f5b969'
      }
		},
	},
	plugins: [],
};
