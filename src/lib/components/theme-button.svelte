<script lang="ts">
	import { localStorage } from '$lib/utils';
	import { onMount } from 'svelte';
	/* BROWSER THEME STATE */
	const storageKey = 'theme-preference';
	let theme: 'light' | 'dark' = 'light';
	const getColorPreference = (): 'dark' | 'light' => {
		let colorPreference = localStorage.getItem(storageKey) as 'dark' | 'light' | null;
		if (!colorPreference)
			colorPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		return colorPreference;
	};

	const reflectPreference = () => {
		if (
			localStorage.getItem(storageKey) === 'dark' ||
			(!(storageKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		)
			document.documentElement.classList.toggle('dark');
		else document.documentElement.classList.toggle('dark');
		document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme);
	};

	export let size = 32;

	onMount(() => {
		theme = getColorPreference();
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', ({ matches: isDark }) => {
				theme = isDark ? 'dark' : 'light';
				localStorage.setItem(storageKey, theme);
				reflectPreference();
			});
	});
</script>

<button
	on:click={() => {
		theme = theme === 'dark' ? 'light' : 'dark';
		reflectPreference();
	}}
	class="tab-highlight-none theme-toggle relative"
	id="theme-toggle"
	title="Toggles light & dark"
	aria-label="auto"
	aria-live="polite"
	style:--size="{size ? size : 32}px"
	style:--icon-fill={theme === 'dark' ? '#3dcfcf' : '#ff9200'}
	style:--icon-fill-hover={theme === 'dark' ? '#53dbdb' : '#ff9200'}
>
	<svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
		<mask class="moon" id="moon-mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle cx="24" cy="10" r="6" fill="black" />
		</mask>
		<circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
		<g class="sun-beams" stroke="currentColor">
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
	</svg>
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		padding: 0;
		inline-size: var(--size);
		block-size: var(--size);
		aspect-ratio: 1;
		border-radius: 50%;
		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		outline-offset: 5px;
	}
	.theme-toggle > svg {
		inline-size: 100%;
		block-size: 100%;
		stroke-linecap: round;
	}
	@media (hover: none) {
		.theme-toggle {
			--size: 48px;
		}
	}
	.sun-and-moon {
		/* --ease-in-backshot: cubic-bezier(0.5, -0.7, 0.1, 1.5); */
		/* --ease-out-5: cubic-bezier(0.5, 0.5, 0.1, 1.5); */
		--ease-elastic-3: cubic-bezier(0.88, 0.66, 0.44, 0.92);
		/* --ease-elastic-4: cubic-bezier(0.66, -0.89, 0.76, -0.13); */
		--ease-in-backshot: cubic-bezier(0.6, -0.28, 0.735, 2);
		/* Ease-out-5 controls Moon Rounding decreasing, shape when Sun got Clicked */
		--ease-out-5: cubic-bezier(0.25, 0.46, 0.45, 1);
		--ease-3: cubic-bezier(0.39, 0.575, 0.565, 1);
		--ease-elastic-4: cubic-bezier(0.5, 1.5, 0.75, 1.25);
	}

	.sun-and-moon > .moon {
		transform-origin: center center;
	}
	.sun-and-moon > .sun {
		transform-origin: center center;
	}
	.sun-and-moon > .sun-beams {
		transform-origin: center center;
	}
	.sun-and-moon > .moon {
		fill: var(--icon-fill);
	}
	.sun-and-moon > .sun {
		fill: var(--icon-fill);
	}
	.theme-toggle:hover > .sun-and-moon > .moon {
		fill: var(--icon-fill-hover);
	}
	.theme-toggle:hover > .sun-and-moon > .sun {
		fill: var(--icon-fill-hover);
	}
	.theme-toggle:focus-visible > .sun-and-moon > .moon {
		fill: var(--icon-fill-hover);
	}
	.theme-toggle:focus-visible > .sun-and-moon > .sun {
		fill: var(--icon-fill-hover);
	}
	.sun-and-moon > .sun-beams {
		stroke: var(--icon-fill);
		stroke-width: 2px;
	}
	.theme-toggle:hover .sun-and-moon > .sun-beams {
		stroke: var(--icon-fill-hover);
	}
	.theme-toggle:focus-visible .sun-and-moon > .sun-beams {
		stroke: var(--icon-fill-hover);
	}
	:global(.dark) .sun-and-moon > .sun {
		transform: scale(1.75);
	}
	:global(.dark) .sun-and-moon > .sun-beams {
		opacity: 0;
	}
	:global(.dark) .sun-and-moon > .moon > circle {
		transform: translate(-7px);
	}
	@supports (cx: 1) {
		:global(.dark) .sun-and-moon > .moon > circle {
			transform: translate(0);
			cx: 17;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.sun-and-moon > .sun {
			transition: transform 0.5s var(--ease-elastic-3, var(--ease-3));
		}
		.sun-and-moon > .sun-beams {
			transition:
				transform 0.5s var(--ease-elastic-4, var(--ease-in-backshot)),
				opacity 0.5s var(--ease-3, var(--ease-in-backshot));
		}
		.sun-and-moon .moon > circle {
			transition: transform 0.25s var(--ease-out-5, var(--ease-3));
		}
		@supports (cx: 1) {
			.sun-and-moon .moon > circle {
				transition: cx 0.25s var(--ease-out-5, var(--ease-3));
			}
		}
		:global(.dark) .sun-and-moon > .sun {
			transform: scale(1.75);
			transition-timing-function: var(--ease-3, cubic-bezier(0.39, 0.575, 0.565, 1));
			transition-duration: 0.25s;
		}
		:global(.dark) .sun-and-moon > .sun-beams {
			transform: rotate(-25deg);
			transition-duration: 0.15s;
		}
		:global(.dark) .sun-and-moon > .moon > circle {
			transition-delay: 0.25s;
			transition-duration: 0.5s;
		}
	}
</style>
