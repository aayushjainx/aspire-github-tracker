import { gql } from '@apollo/client';

export const ADD_REPOSITORY = gql`
	mutation AddRepository($url: String!) {
		addRepository(input: { url: $url }) {
			id
			owner
			name
			description
			url
		}
	}
`;

export const MARK_RELEASE_SEEN = gql`
	mutation MarkReleaseSeen($repositoryId: ID!, $releaseId: ID!) {
		markReleaseSeen(input: { repositoryId: $repositoryId, releaseId: $releaseId }) {
			releaseId
			seenAt
			isUnseen
		}
	}
`;

export const REFRESH_REPOSITORY = gql`
	mutation RefreshRepository($id: ID!) {
		refreshRepository(id: $id) {
			id
			owner
			name
			description
			url
		}
	}
`;
