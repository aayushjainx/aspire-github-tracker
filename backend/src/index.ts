import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './schema/resolvers/resolvers';
import { buildContext } from './context';

async function start() {
	const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
	const server = new ApolloServer({ typeDefs, resolvers, context: buildContext as any });
	const { url } = await server.listen({ port });
	console.log(`GraphQL ready at ${url}`);
}

start().catch((err) => {
	console.error(err);
	process.exit(1);
});
