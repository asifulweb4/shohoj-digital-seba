import { pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  phone: text('phone').notNull().unique(),
  password: text('password').notNull(),
  fullName: text('full_name'),
  email: text('email'),
  nid: text('nid'),
  balance: integer('balance').default(0).notNull(),
  role: text('role').default('user').notNull(), 
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: text('user_id'), // Will store phone number or ID
  amount: integer('amount').notNull(),
  method: text('method').notNull(),
  trxId: text('trx_id').notNull().unique(),
  status: text('status').default('pending').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('user_id'), // Will store phone number or ID
  serviceId: text('service_id').notNull(),
  serviceName: text('service_name').notNull(),
  price: integer('price').notNull(),
  inputData: text('input_data').notNull(),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});