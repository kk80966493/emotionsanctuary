import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { messages, type InsertMessage, type Message } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * 建立新留言
 */
export async function createMessage(data: InsertMessage): Promise<Message | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create message: database not available");
    return null;
  }

  try {
    await db.insert(messages).values(data);
    // 返回最新建立的留言
    const insertedMessages = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(1);
    
    return insertedMessages.length > 0 ? insertedMessages[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create message:", error);
    throw error;
  }
}

/**
 * 取得所有留言（分頁）
 */
export async function getAllMessages(limit: number = 50, offset: number = 0): Promise<Message[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error("[Database] Failed to get messages:", error);
    return [];
  }
}

/**
 * 取得特定角色的留言
 */
export async function getMessagesByCharacter(characterId: string): Promise<Message[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.characterId, characterId))
      .orderBy(desc(messages.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get messages by character:", error);
    return [];
  }
}

/**
 * 刪除留言
 */
export async function deleteMessage(messageId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete message: database not available");
    return false;
  }

  try {
    await db.delete(messages).where(eq(messages.id, messageId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to delete message:", error);
    return false;
  }
}

/**
 * 取得留言統計（各角色被選中次數）
 */
export async function getMessageStats(): Promise<Record<string, number>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get stats: database not available");
    return {};
  }

  try {
    const allMessages = await db.select().from(messages);
    const stats: Record<string, number> = {};
    
    allMessages.forEach((msg) => {
      stats[msg.characterId] = (stats[msg.characterId] || 0) + 1;
    });
    
    return stats;
  } catch (error) {
    console.error("[Database] Failed to get message stats:", error);
    return {};
  }
}

/**
 * 取得留言總數
 */
export async function getMessageCount(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get message count: database not available");
    return 0;
  }

  try {
    const result = await db.select().from(messages);
    return result.length;
  } catch (error) {
    console.error("[Database] Failed to get message count:", error);
    return 0;
  }
}
