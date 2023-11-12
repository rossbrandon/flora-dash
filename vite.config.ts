import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss({
			safelist: {
				greedy: [
					/^bg-(primary|tertiary|red)-500/,
					/^bg-(primary|tertiary|red)-500\/30/,
					/^text-(primary|tertiary|warning|red)-(500|700)/,
				],
			},
		}),
	],
});
