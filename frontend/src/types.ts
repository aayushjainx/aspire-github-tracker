export interface Release {
	id: string;
	tagName: string;
	publishedAt: string;
	htmlUrl: string;
}

export interface SeenStatus {
	releaseId: string | null;
	seenAt: string | null;
	isUnseen: boolean;
}

export interface Repository {
	id: string;
	owner: string;
	name: string;
	description: string | null;
	url: string;
	latestRelease: Release | null;
	seen: SeenStatus;
}
