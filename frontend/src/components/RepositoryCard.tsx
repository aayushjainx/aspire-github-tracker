import { useMutation } from '@apollo/client/react';
import type { Repository } from '../types';
import { MARK_RELEASE_SEEN, REFRESH_REPOSITORY } from '../graphql/mutations';
import { GET_TRACKED_REPOSITORIES } from '../graphql/queries';
import './RepositoryCard.css';

interface Props {
	repository: Repository;
}

export const RepositoryCard = ({ repository }: Props) => {
	const [markSeen, { loading: markingSeenLoading }] = useMutation(MARK_RELEASE_SEEN, {
		refetchQueries: [{ query: GET_TRACKED_REPOSITORIES }],
	});

	const [refreshRepo, { loading: refreshingLoading }] = useMutation(REFRESH_REPOSITORY, {
		refetchQueries: [{ query: GET_TRACKED_REPOSITORIES }],
	});

	const handleMarkSeen = async () => {
		if (!repository.latestRelease) return;

		try {
			await markSeen({
				variables: {
					repositoryId: repository.id,
					releaseId: repository.latestRelease.id,
				},
			});
		} catch (error) {
			console.error('Error marking release as seen:', error);
		}
	};

	const handleRefresh = async () => {
		try {
			await refreshRepo({
				variables: { id: repository.id },
			});
		} catch (error) {
			console.error('Error refreshing repository:', error);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	return (
		<div className={`repository-card ${repository.seen.isUnseen ? 'unseen' : ''}`}>
			<div className='repo-header'>
				<div className='repo-info'>
					<h3 className='repo-name'>
						<a href={repository.url} target='_blank' rel='noopener noreferrer'>
							{repository.owner}/{repository.name}
						</a>
					</h3>
					{repository.seen.isUnseen && <span className='unseen-badge'>New Release</span>}
				</div>
				<button onClick={handleRefresh} disabled={refreshingLoading} className='refresh-button' title='Refresh repository data'>
					{refreshingLoading ? '↻' : '⟳'}
				</button>
			</div>

			{repository.description && <p className='repo-description'>{repository.description}</p>}

			{repository.latestRelease ? (
				<div className='release-info'>
					<div className='release-details'>
						<div className='release-version'>
							<strong>Latest Release:</strong>{' '}
							<a href={repository.latestRelease.htmlUrl} target='_blank' rel='noopener noreferrer' className='release-link'>
								{repository.latestRelease.tagName}
							</a>
						</div>
						<div className='release-date'>Released: {formatDate(repository.latestRelease.publishedAt)}</div>
					</div>

					{repository.seen.isUnseen && (
						<button onClick={handleMarkSeen} disabled={markingSeenLoading} className='mark-seen-button'>
							{markingSeenLoading ? 'Marking...' : 'Mark as Seen'}
						</button>
					)}
				</div>
			) : (
				<div className='no-release'>No releases yet</div>
			)}
		</div>
	);
};
