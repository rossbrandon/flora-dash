# flora-dash

Dashboard UI to support the Data Flora concept.

Blog post about this concept on rossbrandon.dev:
[Designing Data Systems for Visibility & Management](https://rossbrandon.dev/posts/designing-data-systems-with-visibility/)

Backend Repo: [flora-api](https://github.com/rossbrandon/flora-api)

See it in action: https://dataflora.dev

## Technologies Used

- [Svelte](https://svelte.dev/) as the JS framework
- [SvelteKit](https://kit.svelte.dev/) for routing and server side rendering
- [Tailwind CSS](https://tailwindcss.com/) as the CSS framwork
- [Skeleton UI](https://www.skeleton.dev/) for the UI component library

## Developing

Once you've created a project and installed dependencies with `pnpm install` (or `npm install` or `yarn`), start a development server:

```bash
pnpm dev
```

The vite output will show you the local server address which should be http://localhost:5173 by default.

## Building

To create a production version of your app:

```bash
pnpm build
```

The vite output will show you the local preview server address which should be http://localhost:4173 by default.

You can preview the production build with `pnpm preview`.

## Deployment

This app is currently deployed using [Cloudflare Pages](https://pages.cloudflare.com/).
