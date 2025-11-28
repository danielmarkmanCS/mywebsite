import { db } from "./db";
import { 
  type User, type InsertUser, 
  type ContactMessage, type InsertContactMessage,
  type Project, type InsertProject,
  type BlogPost, type InsertBlogPost,
  type SiteSetting, type InsertSiteSetting,
  users, contactMessages, projects, blogPosts, siteSettings
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getSetting(key: string): Promise<SiteSetting | undefined>;
  setSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  getSettings(): Promise<SiteSetting[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages).values(insertMessage).returning();
    return result[0];
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await db.select().from(projects).where(eq(projects.id, id));
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(insertProject).returning();
    return result[0];
  }

  async getBlogPosts(publishedOnly: boolean = true): Promise<BlogPost[]> {
    if (publishedOnly) {
      const result = await db.select().from(blogPosts)
        .where(eq(blogPosts.published, "true"))
        .orderBy(desc(blogPosts.createdAt));
      return result;
    }
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(insertPost).returning();
    return result[0];
  }

  async getSetting(key: string): Promise<SiteSetting | undefined> {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return result[0];
  }

  async setSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const existing = await this.getSetting(insertSetting.key);
    if (existing) {
      const result = await db.update(siteSettings)
        .set({ value: insertSetting.value })
        .where(eq(siteSettings.key, insertSetting.key))
        .returning();
      return result[0];
    }
    const result = await db.insert(siteSettings).values(insertSetting).returning();
    return result[0];
  }

  async getSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings);
  }
}

export const storage = new DatabaseStorage();
