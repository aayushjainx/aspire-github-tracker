import { Octokit } from '@octokit/rest';

let octokitInstance: Octokit | null = null;

export function getOctokit(): Octokit {
	if (!octokitInstance) {
		const token = process.env.GITHUB_TOKEN;
		octokitInstance = new Octokit(token ? { auth: token, userAgent: 'aspire-tracker' } : { userAgent: 'aspire-tracker' });
	}
	return octokitInstance;
}
