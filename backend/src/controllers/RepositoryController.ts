import { withTransaction } from '../db/client';
import { parseGitHubRepoUrl } from '../utils/parseRepoUrl';
import { getOctokit } from '../github/client';
import * as RepositoryModel from '../models/RepositoryModel';
import * as ReleaseController from './ReleaseController';
import * as ReleaseModel from '../models/ReleaseModel';
import * as SeenStatusModel from '../models/SeenStatusModel';

/**
 * Get all tracked repositories
 * Note: latestRelease and seen fields are resolved by field resolvers using DataLoaders
 */
export async function getTrackedRepositories() {
	return await RepositoryModel.getAll();
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
