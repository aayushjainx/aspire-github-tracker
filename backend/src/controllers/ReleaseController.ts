import { getOctokit } from '../github/client';
import * as ReleaseModel from '../models/ReleaseModel';
import * as SeenStatusModel from '../models/SeenStatusModel';

/**
 * Fetch and upsert the latest release from GitHub
 */
export async function upsertLatestRelease(repositoryId: number, owner: string, name: string) {
	try {
		const octokit = getOctokit();
		const latest = await octokit.repos.getLatestRelease({ owner, repo: name });
		const releaseData = latest.data as any;

		const tagName = releaseData.tag_name as string;
		const publishedAt = releaseData.published_at ? new Date(releaseData.published_at) : null;
		const htmlUrl = (releaseData.html_url as string | undefined) ?? null;
		const notes = (releaseData.body as string | undefined) ?? null;

		return await ReleaseModel.upsert(repositoryId, tagName, publishedAt, notes, htmlUrl);
	} catch (e: any) {
		// If no release exists (404), return null
		if (e?.status === 404) return null;
		throw e;
	}
}

/**
 * Get latest release for a repository
 */
export async function getLatestRelease(repositoryId: number) {
	return await ReleaseModel.getLatestForRepository(repositoryId);
}

/**
 * Mark a release as seen for a user
 */
export async function markReleaseSeen(userId: string | null, repositoryId: number, releaseId: number) {
	const seenRecord = await SeenStatusModel.markSeen(userId, repositoryId, releaseId);

	return {
		releaseId: seenRecord?.release_id ?? releaseId,
		seenAt: seenRecord?.seen_at ?? new Date(),
		isUnseen: false,
	};
}
