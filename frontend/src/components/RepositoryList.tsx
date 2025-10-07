import { useQuery } from '@apollo/client/react';
import { GET_TRACKED_REPOSITORIES } from '../graphql/queries';
import type { Repository } from '../types';
import { RepositoryCard } from './RepositoryCard';
import './RepositoryList.css';

interface QueryResult {
	trackedRepositories: Repository[];
}

export const RepositoryList = () => {
	const { loading, error, data, refetch } = useQuery<QueryResult>(GET_TRACKED_REPOSITORIES);

	const handleRefreshAll = async () => {
		await refetch();
	};

	if (loading && !data) {
		return (
			<div className='loading-container'>
				<div className='loading-spinner'></div>
				<p>Loading repositories...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='error-container'>
				<p>Error loading repositories: {error.message}</p>
				<button onClick={handleRefreshAll} className='retry-button'>
					Retry
				</button>
			</div>
		);
	}

	const repositories: Repository[] = data?.trackedRepositories || [];
	const unseenCount = repositories.filter((repo) => repo.seen.isUnseen).length;

	return (
		<div className='repository-list'>
			<div className='list-header'>
				<div className='list-title'>
					<h2>Tracked Repositories ({repositories.length})</h2>
					{unseenCount > 0 && (
						<span className='unseen-count'>
							{unseenCount} new release{unseenCount > 1 ? 's' : ''}
						</span>
					)}
				</div>
				<button onClick={handleRefreshAll} disabled={loading} className='refresh-all-button'>
					{loading ? 'Refreshing...' : 'Refresh All'}
				</button>
			</div>

			{repositories.length === 0 ? (
				<div className='empty-state'>
					<p>No repositories tracked yet.</p>
					<p className='empty-hint'>Add a GitHub repository URL above to get started!</p>
				</div>
			) : (
				<div className='repository-grid'>
					{repositories.map((repo) => (
						<RepositoryCard key={repo.id} repository={repo} />
					))}
				</div>
			)}
		</div>
	);
};
