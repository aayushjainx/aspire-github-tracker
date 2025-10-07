import { gql } from 'apollo-server';

// Input types
export const inputTypeDefs = gql`
	input AddRepositoryInput {
		url: String!
	}

	input MarkReleaseSeenInput {
		repositoryId: ID!
		releaseId: ID!
	}
`;

// Mutation definitions
export const mutationTypeDefs = gql`
	type Mutation {
		addRepository(input: AddRepositoryInput!): Repository!
		markReleaseSeen(input: MarkReleaseSeenInput!): SeenStatus!
		refreshRepository(id: ID!): Repository!
	}
`;
