import { gql } from 'apollo-server';

// Base types and scalars
export const baseTypeDefs = gql`
	scalar DateTime

	type Repository {
		id: ID!
		owner: String!
		name: String!
		description: String
		url: String!
		latestRelease: Release
		seen: SeenStatus
	}

	type Release {
		id: ID!
		tagName: String!
		publishedAt: DateTime
		htmlUrl: String
	}

	type SeenStatus {
		releaseId: ID
		seenAt: DateTime
		isUnseen: Boolean!
	}
`;
