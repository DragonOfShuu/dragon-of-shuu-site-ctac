import { neon } from "@neondatabase/serverless";

// Define a standardized interface for database interaction.
// This allows swapping the underlying implementation without changing consumer code.
export interface IDatabase {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
}

class NeonWrapper implements IDatabase {
  private client;

  constructor(connectionString: string) {
    this.client = neon(connectionString);
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    // The neon client acts as a function for parameterized queries
    // It returns the rows directly. We cast to any.
    return (await (this.client as any)(sql, params || [])) as T[];
  }
}

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
  throw new Error("NEON_DATABASE_URL environment variable is not defined");
}

// Export a singleton instance of the wrapper
export const db: IDatabase = new NeonWrapper(connectionString);
