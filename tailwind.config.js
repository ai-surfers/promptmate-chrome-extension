/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				pretendard: ['Pretendard', 'sans-serif'],
			},
			colors: {
				black: '#000000',
				white: '#ffffff',
				primary: {
					dark: '#535DBF',
					default: '#7580EA',
					light: '#9EADFC',
					xlight: '#CEDEFF',
					5: '#F8F8FE',
					10: '#F2F3FD',
					20: '#E3E6FB',
					30: '#D6D9F9',
					40: '#C8CCF7',
					50: '#BBC0F5',
					60: '#ACB3F2',
					70: '#9FA7F1',
					80: '#9199EE',
					90: '#838DED',
					100: '#7580EA',
				},
				gray: {
					50: '#F7F8F9',
					100: '#F1F2F6',
					200: '#DEE0E8',
					300: '#AFB1C1',
					400: '#818491',
					500: '#5B5F70',
					600: '#3E4151',
					700: '#2E3040',
					800: '#202232',
					900: '#181B29',
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities, e }) {
			const typography = {
				xlarge_36_bold: {
					fontSize: '2.25rem',
					fontWeight: '700',
					lineHeight: '144%', // 3.24rem
					letterSpacing: '-0.045rem',
				},
				xlarge_36_regular: {
					fontSize: '2.25rem',
					fontWeight: '400',
					lineHeight: '144%', // 3.24rem
					letterSpacing: '-0.045rem',
				},
				large_32_bold: {
					fontSize: '2rem',
					fontWeight: '700',
					lineHeight: '144%', // 2.88rem
					letterSpacing: '-0.04rem',
				},
				large_32_reg: {
					fontSize: '2rem',
					fontWeight: '400',
					lineHeight: '144%', // 2.88rem
					letterSpacing: '-0.04rem',
				},
				h1_24_bold: {
					fontSize: '1.5rem',
					fontWeight: '700',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h1_24_semi: {
					fontSize: '1.5rem',
					fontWeight: '600',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h1_24_med: {
					fontSize: '1.5rem',
					fontWeight: '500',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h1_24_reg: {
					fontSize: '1.5rem',
					fontWeight: '400',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h2_20_bold: {
					fontSize: '1.25rem',
					fontWeight: '700',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h2_20_semi: {
					fontSize: '1.25rem',
					fontWeight: '600',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h2_20_med: {
					fontSize: '1.25rem',
					fontWeight: '500',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				h2_20_reg: {
					fontSize: '1.25rem',
					fontWeight: '400',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				b1_18_bold: {
					fontSize: '1.125rem',
					fontWeight: '700',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				b1_18_semi: {
					fontSize: '1.125rem',
					fontWeight: '600',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				b1_18_med: {
					fontSize: '1.125rem',
					fontWeight: '500',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				b1_18_reg: {
					fontSize: '1.125rem',
					fontWeight: '400',
					lineHeight: '144%', // 34.56px
					letterSpacing: '-0.48px',
				},
				b2_16_bold: {
					fontSize: '1rem',
					fontWeight: '700',
					lineHeight: '150%', // 1.5rem
				},
				b2_16_semi: {
					fontSize: '1rem',
					fontWeight: '600',
					lineHeight: '150%', // 1.5rem
				},
				b2_16_med: {
					fontSize: '1rem',
					fontWeight: '500',
					lineHeight: '150%', // 1.5rem
				},
				b2_16_reg: {
					fontSize: '1rem',
					fontWeight: '400',
					lineHeight: '150%', // 1.5rem
				},
				b3_14_bold: {
					fontSize: '0.875rem',
					fontWeight: '700',
					lineHeight: '150%', // 1.3125rem
					letterSpacing: '-0.0175rem',
				},
				b3_14_semi: {
					fontSize: '0.875rem',
					fontWeight: '600',
					lineHeight: '150%', // 1.3125rem
					letterSpacing: '-0.0175rem',
				},
				b3_14_med: {
					fontSize: '0.875rem',
					fontWeight: '500',
					lineHeight: '150%', // 1.3125rem
					letterSpacing: '-0.0175rem',
				},
				b3_14_reg: {
					fontSize: '0.875rem',
					fontWeight: '400',
					lineHeight: '150%', // 1.3125rem
					letterSpacing: '-0.0175rem',
				},
				c1_12_bold: {
					fontSize: '0.75rem',
					fontWeight: '700',
					lineHeight: '150%', // 1.125rem
				},
				c1_12_semi: {
					fontSize: '0.75rem',
					fontWeight: '600',
					lineHeight: '150%', // 1.125rem
				},
				c1_12_med: {
					fontSize: '0.75rem',
					fontWeight: '500',
					lineHeight: '150%', // 1.125rem
				},
				c1_12_reg: {
					fontSize: '0.75rem',
					fontWeight: '400',
					lineHeight: '150%', // 1.125rem
				},
				c2_11_bold: {
					fontSize: '0.6875rem',
					fontWeight: '700',
					lineHeight: '150%', // 1.03125rem
				},
				c2_11_semi: {
					fontSize: '0.6875rem',
					fontWeight: '600',
					lineHeight: '150%', // 1.03125rem
				},
				c2_11_med: {
					fontSize: '0.6875rem',
					fontWeight: '500',
					lineHeight: '150%', // 1.03125rem
				},
				c2_11_reg: {
					fontSize: '0.6875rem',
					fontWeight: '400',
					lineHeight: '150%', // 1.03125rem
				},
			};
			const typographyUtilities = Object.entries(typography).map(([key, value]) => {
				return {
					[`.${e(`${key}`)}`]: value,
				};
			});
			addUtilities(typographyUtilities);
		}),
	],
};
