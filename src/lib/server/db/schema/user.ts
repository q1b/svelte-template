import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "../helpers";
import { sessionTable } from "./session";
import { relations } from "drizzle-orm";

export const userTable = sqliteTable('user', {
	id,
	name: text('name'),
	gmail: text('gmail'),
	image: text('image'),
	role: text('role', { enum: ['user', 'osteopath'] }).default('user'),
    ...timestamp
});

// user can have many sessions
export const userRelations = relations(userTable, ({ many }) => ({
    sessions: many(sessionTable)
}));