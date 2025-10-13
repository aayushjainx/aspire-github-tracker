import * as RepositoryController from '../../controllers/RepositoryController';
import * as ReleaseController from '../../controllers/ReleaseController';
import type { GraphQLContext } from '../../context';

export const resolvers = {
	Query: {
		trackedRepositories: async (_p: unknown, _a: unknown, _ctx: GraphQLContext) => {
			return await RepositoryController.getTrackedRepositories();
		},
	},
	Mutation: {
		addRepository: async (_parent: unknown, args: { input: { url: string } }) => {
			return await RepositoryController.addRepository(args?.input?.url);
		},
		markReleaseSeen: async (_p: unknown, args: { input: { repositoryId: string; releaseId: string } }, ctx: GraphQLContext) => {
			const repositoryId = parseInt(args.input.repositoryId, 10);
			const releaseId = parseInt(args.input.releaseId, 10);
			return await ReleaseController.markReleaseSeen(ctx?.userId ?? null, repositoryId, releaseId);
		},
		refreshRepository: async (_parent: unknown, args: { id: string }) => {
			const id = parseInt(args.id, 10);
			return await RepositoryController.refreshRepository(id);
		},
	},
	Repository: {
		// Field resolver for latestRelease - uses DataLoader for batching
		latestRelease: async (parent: any, _args: unknown, ctx: GraphQLContext) => {
			const release = await ctx.loaders.release.load(parent.id);

			if (!release) return null;

			return {
				id: release.id,
				tagName: release.tag_name,
				publishedAt: release.published_at,
				htmlUrl: release.html_url,
			};
		},

		// Field resolver for seen - uses DataLoader for batching
		// DataLoader fetches seen status AND calculates isUnseen internally
		seen: async (parent: any, _args: unknown, ctx: GraphQLContext) => {
			return await ctx.loaders.seenStatus.load(parent.id);
		},
	},
};
