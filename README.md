# GitHub Release Tracker

A full-stack application for tracking GitHub repository releases with a GraphQL API backend and React TypeScript frontend.

## 🎯 Overview

This application allows users to:

- Track multiple GitHub repositories
- View the latest release information (version, release date)
- Mark releases as "seen" to track which updates have been reviewed
- Visual indicators for repositories with unseen updates
- Manually refresh repository data

## 📋 Features

### Backend (GraphQL API)

- ✅ Track multiple GitHub repositories
- ✅ Fetch latest releases from GitHub API
- ✅ Multi-user support with per-user "seen" status
- ✅ PostgreSQL database for persistence
- ✅ Apollo Server with TypeScript

### Frontend (React + TypeScript)

- ✅ Intuitive and responsive UI
- ✅ Add repositories by URL
- ✅ View latest release information
- ✅ Mark releases as seen
- ✅ Visual indicators for unseen updates
- ✅ Client-side caching with Apollo Client
- ✅ Minimalistic, GitHub-inspired design

## 🛠️ Tech Stack

### Backend

- Node.js + TypeScript
- Apollo Server (GraphQL)
- PostgreSQL
- Octokit (GitHub API client)

### Frontend

- React 18
- TypeScript
- Vite
- Apollo Client
- CSS3 (no framework)

## 📦 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── index.ts           # Server entry point
│   │   ├── schema.ts          # GraphQL schema
│   │   ├── resolvers.ts       # GraphQL resolvers
│   │   ├── context.ts         # GraphQL context
│   │   ├── db/
│   │   │   └── client.ts      # PostgreSQL client
│   │   ├── github/
│   │   │   └── client.ts      # GitHub API client
│   │   ├── utils/
│   │   │   └── parseRepoUrl.ts
│   │   └── scripts/
│   │       └── migrate.ts     # Database migrations
│   ├── migrations/
│   │   ├── 001_init.sql
│   │   └── 002_repository_seen_user.sql
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddRepository.tsx
    │   │   ├── RepositoryCard.tsx
    │   │   └── RepositoryList.tsx
    │   ├── graphql/
    │   │   ├── queries.ts
    │   │   └── mutations.ts
    │   ├── apolloClient.ts
    │   ├── types.ts
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL (v12 or higher)
- GitHub Personal Access Token (optional, for higher rate limits)

### 1. Database Setup

```bash
# Create a PostgreSQL database
createdb aspire_tracker

# Or use psql
psql -U postgres
CREATE DATABASE aspire_tracker;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# PORT=4000
# DATABASE_URL=postgresql://user:password@localhost:5432/aspire_tracker
# GITHUB_TOKEN=your_github_token_here (optional)

# Run migrations
npm run migrate

# Start the backend server
npm run dev
```

The GraphQL API will be available at `http://localhost:4000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (default values should work):
# VITE_GRAPHQL_URL=http://localhost:4000
# VITE_USER_ID=user-1

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## 📖 API Documentation

### GraphQL Schema

**Query:**

- `trackedRepositories`: Get all tracked repositories with their latest releases and seen status

**Mutations:**

- `addRepository(url: String!)`: Add a new repository to track
- `markReleaseSeen(repositoryId: ID!, releaseId: ID!)`: Mark a release as seen
- `refreshRepository(id: ID!)`: Manually refresh repository data from GitHub

### Example Usage

**Add a Repository:**

```graphql
mutation {
	addRepository(input: { url: "https://github.com/facebook/react" }) {
		id
		owner
		name
		description
	}
}
```

**Get Tracked Repositories:**

```graphql
query {
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
```

**Mark Release as Seen:**

```graphql
mutation {
	markReleaseSeen(input: { repositoryId: "1", releaseId: "5" }) {
		releaseId
		seenAt
		isUnseen
	}
}
```

## 🎨 UI Screenshots

The application features a clean, minimalistic design inspired by GitHub's UI:

- **Header**: Purple gradient header with app title
- **Add Repository**: Simple input field with validation
- **Repository Cards**: Clean cards with release information
- **Visual Indicators**: Blue "New Release" badges for unseen updates
- **Responsive**: Works on desktop and mobile devices

## 🔧 Development

### Backend Development

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Build
npm run build

# Start production server
npm start

# Type checking
npm run typecheck
```

### Frontend Development

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## 🌐 Environment Variables

### Backend (.env)

```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/aspire_tracker
GITHUB_TOKEN=your_github_token_here
PGSSLMODE=prefer
```

### Frontend (.env)

```
VITE_GRAPHQL_URL=http://localhost:4000
VITE_USER_ID=user-1
```

## 📝 User Stories (MVP)

1. **Track Repositories**: Users can add GitHub repository URLs to track their updates
2. **Latest Release Details**: Display repository name, description, and the latest release version and date
3. **Mark as Seen**: Users can mark a release as "seen"; repositories with unseen updates are visually distinct
4. **Data Reload**: Users can manually refresh the repository list to fetch the latest data

## 🔒 Multi-User Support

The application supports multiple users through the `x-user-id` header:

- Each user has their own "seen" status for releases
- Users are identified by a simple user ID (can be extended to proper authentication)
- The frontend sends the user ID automatically with all requests

## 📚 Notes

- Data persists in PostgreSQL across sessions
- Apollo Client provides automatic caching for better performance
- The application uses the GitHub REST API through Octokit
- No GitHub authentication is required (but recommended for higher rate limits)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is created for the Aspire Engineering coding assignment.

## 🎉 Acknowledgments

- Built with React, TypeScript, GraphQL, and PostgreSQL
- GitHub API for release information
- Apollo for GraphQL infrastructure
