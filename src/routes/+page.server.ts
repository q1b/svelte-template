import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	console.log(event.locals);
	return {
		isLogged: !!event.locals.session,
		user: event.locals.user
	};
}) satisfies PageServerLoad;
