/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				slowping: 'ping 10s cubic-bezier(0, 0, 0.2, 1) infinite'
			},
			fontFamily: {
				nebula: ['Nabla', 'sans-serif'],
				'protest-riot': ['Protest Riot', 'sans-serif'],
				Sixtyfour: ['Sixtyfour', 'sans-serif'],
				'rubik-doodle': ['Rubik Doodle Shadow', 'system-ui'],
				moirai: ['"Moirai One"', 'system-ui'],
				'old-standard-tt': ['Old Standard TT', 'serif']
			},
			colors: {
				color1: '#d7d4db', // light grey
				color2: '#447093', // blue
				color3: '#184461', // dark blue
				color4: '#1c5d3b', // green
				color5: '#044c26', // dark green
				persimmon: '#FF5733', // Persimmon
				'red-pigment': '#C70039', // Red Pigment
				'tyrian-purple': '#900C3F', // Tyrian Purple
				'pansy-purple': '#581845', // Pansy Purple
				'oxford-blue': '#154360', // Oxford Blue
				'prussian-blue': '#1A5276', // Prussian Blue
				'cool-black': '#1F618D', // Cool Black
				'air-force-blue': '#2471A3', // Air Force Blue
				cerulean: '#2980B9', // Cerulean
				'vivid-cerulean': '#2E86C1' // Vivid Cerulean
			},
			backgroundImage: {
				'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
				'blend-luminosity': 'luminosity',
				'blend-mode': 'blend-mode',
				'custom-background': "url('/Background2Hp.jpg')"
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['hover', 'focus'],
			transitionProperty: ['hover', 'focus'],
			transform: ['hover', 'focus'],
			scale: ['hover', 'focus', 'active']
		}
	},
	plugins: []
};
