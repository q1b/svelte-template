import { Redis } from '@upstash/redis';
import * as env from '$env/static/private';

const upstashClient = new Redis({
	url: env.UPSTASH_URL,
	token: env.UPSTASH_TOKEN
});

export default upstashClient;
