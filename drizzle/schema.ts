import {
	boolean,
	integer,
	json,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
	primaryKey,
} from "drizzle-orm/pg-core";

// =======================
// screenRecord
// =======================
export const screenRecord = pgTable("screenrecord", {
	id: uuid("id").primaryKey().defaultRandom(),

	title: varchar("title", { length: 255 }).notNull(),
	description: varchar("description", { length: 2000 }),
	bannerImage: varchar("banner_image", { length: 500 }),
	videoUrl: varchar("video_url",{length:500}),
	shareId: uuid('share_id').defaultRandom().unique().notNull(),
	createdBy: varchar("created_by", { length: 255 }).notNull(), // Clerk ID

	createdAt: timestamp("created_at").defaultNow(),
});

