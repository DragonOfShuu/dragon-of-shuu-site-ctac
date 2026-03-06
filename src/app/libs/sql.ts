import { neon } from "@neondatabase/serverless";

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
    throw new Error("NEON_DATABASE_URL environment variable is not defined");
}

// Define the call signature for the hybrid type
export interface Database {
    <T = any>(
        strings: TemplateStringsArray | string,
        ...values: any[]
    ): Promise<T[]>;
}

// The class implementation defines the methods
export class Database {
    private client: ReturnType<typeof neon>;

    constructor() {
        this.client = neon(connectionString!);

        // return a Proxy to make the instance callable while preserving property access
        return new Proxy(() => {}, {
            apply: (target, thisArg, argArray) => {
                // Handle calls like db`SELECT...` or db("SELECT...", [])
                return (this.client as any)(...argArray);
            },
            get: (target, prop, receiver) => {
                // Forward property access to the class instance (this)
                const value = (this as any)[prop];
                // Bind methods to the class instance so 'this' works inside them
                return typeof value === "function" ? value.bind(this) : value;
            },
        }) as any;
    }

    async getOne<T = any>(
        strings: TemplateStringsArray | string,
        ...values: any[]
    ): Promise<T | null> {
        const rows = await this.query<T>(strings, ...values);
        return rows[0] || null;
    }

    async query<T = any>(
        strings: TemplateStringsArray | string,
        ...values: any[]
    ): Promise<T[]> {
        return (this.client as any)(strings, ...values);
    }
}

const sql = new Database();
export default sql;
