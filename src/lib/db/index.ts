import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Use placeholder during build when DATABASE_URL is not set
const url =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@placeholder.placeholder/placeholder?sslmode=require";
const sql = neon(url);
export const db = drizzle(sql);
