import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * 玩家留言表
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  characterId: varchar("characterId", { length: 50 }).notNull(),
  playerName: varchar("playerName", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * 留言統計表（用於快速查詢各角色被選中次數）
 */
export const messageStats = mysqlTable("message_stats", {
  characterId: varchar("characterId", { length: 50 }).primaryKey(),
  messageCount: int("messageCount").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MessageStat = typeof messageStats.$inferSelect;
export type InsertMessageStat = typeof messageStats.$inferInsert;
