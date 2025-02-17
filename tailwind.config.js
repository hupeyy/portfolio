import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	
	theme: {
		extend: {},
		fontFamily: {
      		sans: ['"JetBrains Mono"', 'sans-serif']
    	},
	},

	plugins: [typography, forms, containerQueries]
};
