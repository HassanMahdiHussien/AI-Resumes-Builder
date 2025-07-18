import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

console.log("POSTGRES_URL:", process.env.POSTGRES_URL);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client, { schema });

export type DB = typeof db;
