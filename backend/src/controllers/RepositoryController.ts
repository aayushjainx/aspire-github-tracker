import { withTransaction } from '../db/client';
import { parseGitHubRepoUrl } from '../utils/parseRepoUrl';
import { getOctokit } from '../github/client';
import * as RepositoryModel from '../models/RepositoryModel';
import * as ReleaseController from './ReleaseController';
import * as ReleaseModel from '../models/ReleaseModel';
import * as SeenStatusModel from '../models/SeenStatusModel';

/**
 * Get all tracked repositories with their latest releases and seen status
 */
export async function getTrackedRepositories(userId: string | null) {
	const repos = await RepositoryModel.getAll();

	if (repos.length === 0) return [];

	// Bulk fetch releases and seen statuses (2 queries instead of N queries)
	const repositoryIds = repos.map((repo) => repo.id);
	const [releases, seenStatuses] = await Promise.all([
		ReleaseModel.getLatestForRepositories(repositoryIds),
		SeenStatusModel.getLastSeenForRepositories(userId, repositoryIds),
	]);

	// Create lookup maps for O(1) access
	const releaseMap = new Map(releases.map((r) => [r.repository_id, r]));
	const seenMap = new Map(seenStatuses.map((s) => [s.repository_id, s]));

	// Map repositories with their releases and seen status
	const items = repos.map((repo) => {
		const latestRelease = releaseMap.get(repo.id);
		const lastSeen = seenMap.get(repo.id);
		const isUnseen = latestRelease ? !lastSeen || latestRelease.id !== lastSeen.release_id : false;

		return {
			id: repo.id,
			owner: repo.owner,
			name: repo.name,
			description: repo.description,
			url: repo.url,
			latestRelease: latestRelease && {
				id: latestRelease.id,
				tagName: latestRelease.tag_name,
				publishedAt: latestRelease.published_at,
				htmlUrl: latestRelease.html_url,
			},
			seen: {
				releaseId: lastSeen?.release_id ?? null,
				seenAt: lastSeen?.seen_at ?? null,
				isUnseen,
			},
		};
	});

	return items;
}

/**
 * Add a new repository by GitHub URL
 */
export async function addRepository(url: string) {
	const { owner, name } = parseGitHubRepoUrl(url);

	return await withTransaction(async () => {
		// Fetch repository info from GitHub
		const octokit = getOctokit();
		const repoResp = await octokit.repos.get({ owner, repo: name });
		const { html_url, description } = repoResp.data as any;

		// Upsert repository in database
		const repo = await RepositoryModel.upsert(owner, name, description ?? null, html_url);

		// Fetch and upsert latest release
		await ReleaseController.upsertLatestRelease(repo.id, owner, name);

		return repo;
	});
}

/**
 * Refresh repository data (fetch latest release from GitHub)
 */
export async function refreshRepository(id: number) {
	const repo = await RepositoryModel.getById(id);
	if (!repo) {
		throw new Error('Repository not found');
	}

	await ReleaseController.upsertLatestRelease(repo.id, repo.owner, repo.name);
	return repo;
}
