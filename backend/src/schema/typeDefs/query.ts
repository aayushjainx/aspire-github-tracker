import { gql } from 'apollo-server';

// Query definitions
export const queryTypeDefs = gql`
	type Query {
		trackedRepositories: [Repository!]!
	}
`;
