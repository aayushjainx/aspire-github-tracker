import DataLoader from 'dataloader';
import * as ReleaseModel from '../models/ReleaseModel';

/**
 * DataLoader for batching release queries by repository ID
 * Solves N+1 query problem by batching multiple requests into a single query
 */
export function createReleaseDataLoader() {
	return new DataLoader<number, any>(async (repositoryIds) => {
		// Fetch all releases in a single query
		const releases = await ReleaseModel.getLatestForRepositories([...repositoryIds]);

		// Create a map for O(1) lookup
		const releaseMap = new Map(releases.map((r) => [r.repository_id, r]));

		// Return releases in the same order as requested IDs
		return repositoryIds.map((id) => releaseMap.get(id) ?? null);
	});
}
