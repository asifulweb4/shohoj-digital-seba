// lib/db.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  console.warn('Warning: DATABASE_URL is not set. Database connection will fail at runtime.');
}

const sql = neon(databaseUrl || 'postgresql://placeholder:placeholder@localhost:5432/placeholder');
export const db = drizzle(sql);