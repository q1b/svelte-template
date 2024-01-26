import { lucia } from '$lib/server/auth';
import { redirect, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const prerender = false;

export async function GET(event: RequestEvent): Promise<Response> {
	if (!event.locals.session) {
		return error(401, '/');
	}
	await lucia.invalidateSession(event.locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	return redirect(302, '/');
}
