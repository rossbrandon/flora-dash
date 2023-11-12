import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	safelist: [
		'bg-primary-500',
		'bg-tertiary-500',
		'bg-red-500',
		'bg-primary-500/30',
		'bg-tertiary-500/30',
		'bg-red-500/30',
		'text-primary-500',
		'text-primary-700',
		'text-tertiary-500',
		'text-tertiary-700',
		'text-warning-500',
		'text-warning-700',
		'text-red-500',
		'text-red-700',
	],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
					{
						name: 'wintry',
						enhancements: true,
					},
					{
						name: 'rocket',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
