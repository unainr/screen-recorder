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
	doublePrecision,
} from "drizzle-orm/pg-core";

// =======================
// screenRecord
// =======================
export const screenRecord = pgTable("screenrecord", {
	id: uuid("id").primaryKey().defaultRandom(),

	title: varchar("title", { length: 255 }).notNull(),
	description: varchar("description", { length: 2000 }),
	bannerImage: varchar("banner_image", { length: 500 }),
	videoUrl: varchar("video_url", { length: 500 }),
	shareId: uuid("share_id").defaultRandom().unique().notNull(),
	createdBy: varchar("created_by", { length: 255 }).notNull(), // Clerk ID
	// transcript: text("transcript"), // 👈 new
	// summary: text("summary"), // 👈 new
	// transcriptStatus: varchar("transcript_status", { length: 50 }).default(
	// 	"none",
	// ), // 👈 new
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
	createdAt: timestamp("created_at").defaultNow(),
});

export const timestamps = pgTable("timestamps", {
    id: uuid("id").primaryKey().defaultRandom(),
    videoId: uuid("video_id").references(() => screenRecord.id, { onDelete: "cascade" }).notNull(),
    label: varchar("label", { length: 255 }).notNull(),
  time: doublePrecision("time").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});