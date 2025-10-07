import * as RepositoryController from '../../controllers/RepositoryController';
import * as ReleaseController from '../../controllers/ReleaseController';

export const resolvers = {
	Query: {
		trackedRepositories: async (_p: unknown, _a: unknown, ctx: { userId: string | null }) => {
			return await RepositoryController.getTrackedRepositories(ctx?.userId ?? null);
		},
	},
	Mutation: {
		addRepository: async (_parent: unknown, args: { input: { url: string } }) => {
			return await RepositoryController.addRepository(args?.input?.url);
		},
		markReleaseSeen: async (_p: unknown, args: { input: { repositoryId: string; releaseId: string } }, ctx: { userId: string | null }) => {
			const repositoryId = parseInt(args.input.repositoryId, 10);
			const releaseId = parseInt(args.input.releaseId, 10);
			return await ReleaseController.markReleaseSeen(ctx?.userId ?? null, repositoryId, releaseId);
		},
		refreshRepository: async (_parent: unknown, args: { id: string }) => {
			const id = parseInt(args.id, 10);
			return await RepositoryController.refreshRepository(id);
		},
	},
};
