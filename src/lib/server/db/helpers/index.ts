import { integer, text } from "drizzle-orm/sqlite-core"
import { generateId } from "lucia"

export const id = text('id',{length: 255}).primaryKey().$defaultFn(() => generateId(15))

export const timestamp = {
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
};
