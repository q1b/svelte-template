import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
	schema: 'src/lib/server/db/schema/index.ts',
	out: './drizzle/migrations',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.DATABASE_AUTH_TOKEN!
	},
	// Print all statements
	verbose: true,
	// Always ask for my confirmation
	strict: true
} satisfies Config;
