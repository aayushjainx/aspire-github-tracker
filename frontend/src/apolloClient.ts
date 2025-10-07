import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000',
});

// Add user ID to headers
const authLink = setContext((_, { headers }) => {
	const userId = import.meta.env.VITE_USER_ID || 'user-1';
	return {
		headers: {
			...headers,
			'x-user-id': userId,
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
});
