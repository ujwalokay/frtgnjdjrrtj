import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Only initialize database connection if DATABASE_URL is set
// Otherwise, export null to prevent pg.Pool from attempting connections
export let pool: Pool | null = null;
export let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
  db = drizzle(pool, { schema });
  console.log('✓ Database connection initialized');
} else {
  console.log('ℹ️  Running in demo mode without database - using in-memory storage');
}
