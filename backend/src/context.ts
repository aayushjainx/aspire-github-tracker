import { createReleaseDataLoader, createSeenStatusDataLoader } from './dataloaders';
import type DataLoader from 'dataloader';

export type GraphQLContext = {
	userId: string | null;
	loaders: {
		release: DataLoader<number, any>;
		seenStatus: DataLoader<number, any>;
	};
};

export function buildContext({ req }: any): GraphQLContext {
	const userId = (req?.headers?.['x-user-id'] as string | undefined) ?? null;

	// Create new DataLoader instances for each request (important for batching)
	return {
		userId,
		loaders: {
			release: createReleaseDataLoader(),
			seenStatus: createSeenStatusDataLoader(userId), // Pass userId to scope the DataLoader
		},
	};
}
