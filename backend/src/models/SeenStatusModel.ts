import { db } from '../db/client';

/**
 * Get last seen status for a user and repository
 */
export async function getLastSeen(userId: string | null, repositoryId: number) {
	const result = await db.query(
		`SELECT release_id, seen_at
		 FROM repository_seen WHERE repository_id = $1 AND user_id = $2
		 ORDER BY seen_at DESC LIMIT 1`,
		[repositoryId, userId]
	);
	return result.rows[0] ?? null;
}

/**
 * Get last seen status for multiple repositories (bulk query)
 */
export async function getLastSeenForRepositories(userId: string | null, repositoryIds: number[]) {
	if (repositoryIds.length === 0) return [];

	const result = await db.query(
		`SELECT DISTINCT ON (repository_id) repository_id, release_id, seen_at
		 FROM repository_seen 
		 WHERE repository_id = ANY($1) AND user_id = $2
		 ORDER BY repository_id, seen_at DESC`,
		[repositoryIds, userId]
	);
	return result.rows;
}

/**
 * Mark a release as seen for a user
 */
export async function markSeen(userId: string | null, repositoryId: number, releaseId: number) {
	await db.query(
		`INSERT INTO repository_seen (user_id, repository_id, release_id)
		 VALUES ($1, $2, $3)
		 ON CONFLICT (user_id, repository_id, release_id) DO NOTHING`,
		[userId, repositoryId, releaseId]
	);

	const result = await db.query(
		`SELECT release_id, seen_at FROM repository_seen
		 WHERE user_id = $1 AND repository_id = $2 AND release_id = $3`,
		[userId, repositoryId, releaseId]
	);
	return result.rows[0];
}
