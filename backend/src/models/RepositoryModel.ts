import { db } from '../db/client';

/**
 * Get all repositories ordered by updated_at
 */
export async function getAll() {
	const result = await db.query('SELECT * FROM repositories ORDER BY updated_at DESC');
	return result.rows;
}

/**
 * Get repository by ID
 */
export async function getById(id: number) {
	const result = await db.query('SELECT * FROM repositories WHERE id = $1', [id]);
	return result.rows[0] ?? null;
}

/**
 * Upsert repository data
 */
export async function upsert(owner: string, name: string, description: string | null, url: string) {
	const result = await db.query(
		`INSERT INTO repositories (owner, name, description, url)
		 VALUES ($1, $2, $3, $4)
		 ON CONFLICT (owner, name)
		 DO UPDATE SET description = EXCLUDED.description, url = EXCLUDED.url, updated_at = NOW()
		 RETURNING *`,
		[owner, name, description, url]
	);
	return result.rows[0];
}
