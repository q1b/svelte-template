import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./user";
import { id, timestamp } from "../helpers";
import { relations } from "drizzle-orm";

export const sessionTable = sqliteTable('user_session', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	expiresAt: integer('expires_at').notNull(),
    ...timestamp
});

// sessions belong to a user
export const sessionRelation = relations(sessionTable, ({ one }) => ({
	session: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}));