<p align="center">
  Building blocks for your Sveltekit project
</p>

## Introduction

This is an opinionated collection of components, hooks, and utilities for your Sveltekit project

## Tech Stack + Features

### Frameworks

- [Sveltekit](https://kit.svelte.dev) – Svelte-Kit is full-stack framework for building Svelte apps with server-side rendering, file-based routing, and more.
- [Lucia](https://lucia-auth.com) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Drizzle](https://orm.drizzle.team) – Headless Typescript ORM

### Platforms

- [TursoDB](https://turso.tech/) – Simple, Cost Efficient and Scalable Database
- [Upstash](https://upstash.com) - Serverless Redis

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn Svelte](https://shadcn-svelte.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons

### Hooks and Utilities, Comming Soon

- For Handling Google Token with Upstash Redis
- Dark Mode

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### File Structure

#### Routes and Pages

- `src/routes` – Sveltekit routes
	- `src/google` - Continue with Google Screen main UI
		- `src/google/callback` - API Endpoint for Callback
		- `src/google/login` - API Endpoint for Generate Auth URL
		- `src/google/logout` - API Endpoint for Logout

## Inspired from

- [Precedent](https://github.com/steven-tey/precedent/blob/main/README.md) Next.js Tempalte by Steven Tey ([@steventey](https://twitter.com/steventey))
