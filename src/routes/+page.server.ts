import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	// If the user is not logged in, redirect to the login page
	if(event.locals.user === null || event.locals.session === null) {
		redirect(308, '/google');
	}
	return {
		isLogged: true,
		user: event.locals.user
	};
}) satisfies PageServerLoad;
