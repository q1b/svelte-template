import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { DATABASE_URL, DATABASE_AUTH_TOKEN } from '$env/static/private';
import { remember } from '@epic-web/remember';

export const client = remember('turso-sqlite-client', () =>
	createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN })
);

export const db = drizzle(client, { schema });
