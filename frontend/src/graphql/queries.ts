import { gql } from '@apollo/client';

export const GET_TRACKED_REPOSITORIES = gql`
	query GetTrackedRepositories {
		trackedRepositories {
			id
			owner
			name
			description
			url
			latestRelease {
				id
				tagName
				publishedAt
				htmlUrl
			}
			seen {
				releaseId
				seenAt
				isUnseen
			}
		}
	}
`;
