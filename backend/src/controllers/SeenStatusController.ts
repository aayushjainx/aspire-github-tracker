import * as SeenStatusModel from '../models/SeenStatusModel';
import * as ReleaseModel from '../models/ReleaseModel';

/**
 * Get seen status for multiple repositories with isUnseen calculation
 * Fetches both seen statuses and latest releases, then calculates isUnseen
 */
export async function getSeenStatusForRepositories(userId: string | null, repositoryIds: number[]) {
	if (repositoryIds.length === 0) return [];

	// Fetch both seen statuses and latest releases in parallel (2 queries)
	const [seenStatuses, latestReleases] = await Promise.all([
		SeenStatusModel.getLastSeenForRepositories(userId, repositoryIds),
		ReleaseModel.getLatestForRepositories(repositoryIds),
	]);

	// Create lookup maps for O(1) access
	const seenMap = new Map(seenStatuses.map((s: any) => [s.repository_id, s]));
	const releaseMap = new Map(latestReleases.map((r: any) => [r.repository_id, r]));

	// Build result with isUnseen calculation for each repository
	return repositoryIds.map((repoId) => {
		const lastSeen = seenMap.get(repoId) ?? null;
		const latestRelease = releaseMap.get(repoId) ?? null;

		// Calculate isUnseen: true if there's a release AND (no seen record OR seen a different release)
		const isUnseen = latestRelease ? !lastSeen || latestRelease.id !== lastSeen.release_id : false;

		return {
			releaseId: lastSeen?.release_id ?? null,
			seenAt: lastSeen?.seen_at ?? null,
			isUnseen,
		};
	});
}
