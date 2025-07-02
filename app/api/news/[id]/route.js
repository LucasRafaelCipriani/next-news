import { redirect } from 'next/navigation';
import { Pool } from 'pg';

export async function GET(request, { params }) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const { id: slug } = params;
  const query = 'SELECT * FROM news WHERE slug = $1';
  const values = [slug];
  const res = await pool.query(query, values);

  if (!res.rows || res.rows.length === 0) {
    redirect('/');
  }

  await new Promise((r) => setTimeout(r, 2000));
  return Response.json(res.rows[0]);
}
