import { Redis } from '@upstash/redis';
import * as env from '$env/static/private';

const upstashClient = new Redis({
	url: env.UPSTASH_URL,
	token: env.UPSTASH_TOKEN
});

export const getGoogleTokens = async (userId: string) => {
	try {
		return (await upstashClient.hmget(`token:${userId}`, 'access_token', 'refersh_token')) as {
			access_token: string;
			refersh_token: string | null;
		};
	} catch (error) {
		console.error(error);
	}
	return null;
};

export const setGoogleTokens = async (
	userId: string,
	tokens: {
		access_token: string;
		refersh_token: string | null;
	}
) => {
	try {
		return await upstashClient.hmset(`token:${userId}`, tokens);
	} catch (error) {
		console.error(error);
	}
	return null;
};

export default upstashClient;
