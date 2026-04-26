// lib/queries.ts
import { db } from './db'; 
import { services } from './schema'; // এখানে আপনার ডাটাবেস টেবিল স্কিমা ইমপোর্ট করুন

export async function getAllServices() {
  try {
    const data = await db.select().from(services);
    return data;
  } catch (error) {
    console.error("Error fetching services from DB:", error);
    return [];
  }
}