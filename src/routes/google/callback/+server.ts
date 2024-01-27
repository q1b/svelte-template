import { google, lucia } from '$lib/server/auth';
import type { RequestEvent } from '@sveltejs/kit';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/server/db/schema';

type GoogleUserResult = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
};

export async function GET(event: RequestEvent): Promise<Response> {
	console.log('RUNNING GET REQUEST');
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_oauth_code')!;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		console.log(tokens);

		const payload = (await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
			{
				headers: {
					Authorization: `Bearer ${tokens.idToken}`
				}
			}
		).then((res) => res.json())) satisfies GoogleUserResult;

		const existingUser = payload?.email
			? await db.query.userTable.findFirst({
					where: eq(userTable.gmail, payload?.email)
				})
			: false;

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});

			const sessionCookie = lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(15);

			await db.insert(userTable).values({
				id: userId,
				gmail: payload?.email,
				name: payload?.name,
				image: payload?.picture
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log(e);
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}
