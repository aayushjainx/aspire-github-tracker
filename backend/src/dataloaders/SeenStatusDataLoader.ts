import DataLoader from 'dataloader';
import * as SeenStatusController from '../controllers/SeenStatusController';

/**
 * DataLoader for batching seen status queries
 * Delegates business logic to SeenStatusController
 * Scoped to a single userId per request
 * Returns: { releaseId, seenAt, isUnseen }
 */
export function createSeenStatusDataLoader(userId: string | null) {
	return new DataLoader<number, any>(async (repositoryIds: readonly number[]) => {
		// Delegate to controller which handles fetching and business logic
		return await SeenStatusController.getSeenStatusForRepositories(userId, [...repositoryIds]);
	});
}
