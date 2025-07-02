import { Pool } from 'pg';

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  await new Promise((r) => setTimeout(r, 2000));
  const res = await pool.query('SELECT * FROM news');

  return Response.json(res.rows);
}
