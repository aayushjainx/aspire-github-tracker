export type GraphQLContext = {
	userId: string | null;
};

export function buildContext({ req }: any): GraphQLContext {
	const userId = (req?.headers?.['x-user-id'] as string | undefined) ?? null;
	return { userId };
}
