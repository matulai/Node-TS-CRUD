import { config } from "@/persistencia/config/config";
import pg from "pg";
const { Pool } = pg;

export const pool: pg.Pool = new Pool(config);

export async function createUsersTable() {
  const client = await pool.connect(); // Obtener conexión del pool
  try {
    const createTableText = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR,
        last_name VARCHAR,
        email VARCHAR,
        gender VARCHAR
      );
    `;
    await client.query(createTableText);
  } finally {
    client.release();
  }
}
