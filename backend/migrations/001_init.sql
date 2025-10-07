-- Complete database initialization
-- Combines: 001_init.sql + 002_repository_seen_user.sql

-- Repositories being tracked
CREATE TABLE IF NOT EXISTS repositories (
	id SERIAL PRIMARY KEY,
	owner TEXT NOT NULL,
	name TEXT NOT NULL,
	description TEXT,
	url TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	last_synced_at TIMESTAMPTZ,
	UNIQUE(owner, name)
);

-- Releases fetched from GitHub
CREATE TABLE IF NOT EXISTS releases (
	id SERIAL PRIMARY KEY,
	repository_id INTEGER NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
	tag_name TEXT NOT NULL,
	published_at TIMESTAMPTZ,
	release_notes TEXT,
	html_url TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(repository_id, tag_name)
);

-- Seen status (multi-user support: track last seen release per user per repo)
CREATE TABLE IF NOT EXISTS repository_seen (
	id SERIAL PRIMARY KEY,
	user_id TEXT,
	repository_id INTEGER NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
	release_id INTEGER REFERENCES releases(id) ON DELETE SET NULL,
	seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE(user_id, repository_id, release_id)
);

-- Indexes for better query performance

CREATE INDEX IF NOT EXISTS idx_repositories_updated_at ON repositories(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_releases_repo_published ON releases(repository_id, published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_seen_repo_user_time ON repository_seen(repository_id, user_id, seen_at DESC);
