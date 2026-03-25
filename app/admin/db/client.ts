// db/client.ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { users, sessions, citiesTable, housesTable, emailVerificationTokens } from "./schema";

const sql = postgres(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
  schema: {
    users,
    sessions,
    citiesTable,
    housesTable,
    emailVerificationTokens,
  },
});