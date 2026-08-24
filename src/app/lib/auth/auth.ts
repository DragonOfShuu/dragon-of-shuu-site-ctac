import { connectionString } from "@/app/api/sql";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    const pool = new Pool({ connectionString });

    return {
        // https://authjs.dev/getting-started/adapters/neon
        adapter: NeonAdapter(pool),
        providers: [Google],
    };
});
