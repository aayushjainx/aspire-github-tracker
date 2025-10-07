import { db } from '../db/client';

/**
 * Get latest release for a repository
 */
export async function getLatestForRepository(repositoryId: number) {
	const result = await db.query(`SELECT * FROM releases WHERE repository_id = $1 ORDER BY published_at DESC NULLS LAST, id DESC LIMIT 1`, [
		repositoryId,
	]);
	return result.rows[0] ?? null;
}

/**
 * Get latest releases for multiple repositories (bulk query)
 */
export async function getLatestForRepositories(repositoryIds: number[]) {
	if (repositoryIds.length === 0) return [];

	const result = await db.query(
		`SELECT DISTINCT ON (repository_id) * 
		 FROM releases 
		 WHERE repository_id = ANY($1)
		 ORDER BY repository_id, published_at DESC NULLS LAST, id DESC`,
		[repositoryIds]
	);
	return result.rows;
}

/**
 * Upsert release data
 */
export async function upsert(
	repositoryId: number,
	tagName: string,
	publishedAt: Date | null,
	releaseNotes: string | null,
	htmlUrl: string | null
) {
	const result = await db.query(
		`INSERT INTO releases (repository_id, tag_name, published_at, release_notes, html_url)
		 VALUES ($1, $2, $3, $4, $5)
		 ON CONFLICT (repository_id, tag_name)
		 DO UPDATE SET published_at = EXCLUDED.published_at, release_notes = EXCLUDED.release_notes, html_url = EXCLUDED.html_url
		 RETURNING *`,
		[repositoryId, tagName, publishedAt, releaseNotes, htmlUrl]
	);
	return result.rows[0];
}
