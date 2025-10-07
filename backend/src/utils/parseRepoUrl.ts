export function parseGitHubRepoUrl(input: string): { owner: string; name: string } {
	try {
		const url = new URL(input.trim());
		if (url.hostname !== 'github.com') throw new Error('Not a GitHub URL');
		const parts = url.pathname.split('/').filter(Boolean);
		if (parts.length < 2) throw new Error('Repository path must be /owner/name');
		const owner = parts[0]!;
		const name = parts[1]!;
		return { owner, name };
	} catch (e) {
		throw new Error('Invalid GitHub repository URL');
	}
}
