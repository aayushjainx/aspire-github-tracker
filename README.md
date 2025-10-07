# GitHub Release Tracker

A full-stack application for tracking GitHub repository releases with a modern GraphQL API backend and React TypeScript frontend.

## 🎯 Overview

This application allows users to:

- 📦 Track multiple GitHub repositories
- 🔔 View the latest release information (version, release date, release notes)
- ✅ Mark releases as "seen" to track which updates have been reviewed
- 🎨 Visual indicators for repositories with unseen updates
- 🔄 Manually refresh repository data from GitHub
- 👥 Multi-user support with isolated "seen" status per user

## 📋 Features

### Backend (GraphQL API)

- ✅ **ESM Architecture** - Modern ES2023 modules with native imports
- ✅ **MVC Pattern** - Clean separation: Resolvers → Controllers → Models → Database
- ✅ **Functional Programming** - Pure functions with namespace imports
- ✅ **Type Safety** - Full TypeScript with strict mode
- ✅ **Modular Schema** - Organized GraphQL schema (base, query, mutation types)
- ✅ **Multi-user Support** - Per-user "seen" status tracking
- ✅ **PostgreSQL** - Relational database with optimized indexes
- ✅ **GitHub Integration** - Native ESM Octokit client (no hacks!)

### Frontend (React + TypeScript)

- ✅ Intuitive and responsive UI
- ✅ Add repositories by GitHub URL
- ✅ View latest release information with release notes
- ✅ Mark releases as seen with single click
- ✅ Visual indicators for unseen updates (blue badges)
- ✅ Apollo Client with cache-and-network policy
- ✅ Minimalistic, GitHub-inspired design
- ✅ Environment-based configuration (Vite)

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js v22+ with TypeScript 5.9
- **Module System:** ESM (ES2023)
- **GraphQL:** Apollo Server 3.13
- **Database:** PostgreSQL with pg driver
- **GitHub API:** Octokit 22.0 (native ESM)
- **Dev Tools:** tsx (ESM-compatible TypeScript execution)
- **Architecture:** MVC with functional programming

### Frontend

- **Framework:** React 18.2
- **Language:** TypeScript 5.2
- **Build Tool:** Vite 7.1
- **GraphQL Client:** Apollo Client 4.0
- **Styling:** Pure CSS3 (no framework)
- **Linting:** ESLint with ES2023 support

## 📦 Project Structure

```
Aspire assignment/
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Apollo Server entry point
│   │   ├── context.ts                  # GraphQL context builder
│   │   │
│   │   ├── schema/
│   │   │   ├── index.ts               # Schema aggregator
│   │   │   ├── typeDefs/
│   │   │   │   ├── base.ts            # Core types (Repository, Release, etc.)
│   │   │   │   ├── query.ts           # Query type definitions
│   │   │   │   └── mutation.ts        # Mutation type definitions
│   │   │   └── resolvers/
│   │   │       └── resolvers.ts       # GraphQL resolvers (thin layer)
│   │   │
│   │   ├── controllers/
│   │   │   ├── index.ts               # Controller exports
│   │   │   ├── RepositoryController.ts # Repository business logic
│   │   │   └── ReleaseController.ts    # Release business logic
│   │   │
│   │   ├── models/
│   │   │   ├── index.ts               # Model exports
│   │   │   ├── RepositoryModel.ts     # Repository database operations
│   │   │   ├── ReleaseModel.ts        # Release database operations
│   │   │   └── SeenStatusModel.ts     # Seen status database operations
│   │   │
│   │   ├── db/
│   │   │   └── client.ts              # PostgreSQL client & transactions
│   │   │
│   │   ├── github/
│   │   │   └── client.ts              # Octokit singleton (native ESM)
│   │   │
│   │   ├── utils/
│   │   │   └── parseRepoUrl.ts        # GitHub URL parser
│   │   │
│   │   └── scripts/
│   │       └── migrate.ts             # Database migration runner
│   │
│   ├── migrations/
│   │   └── 001_init.sql               # Unified database schema
│   │
│   ├── package.json                   # ESM configuration
│   └── tsconfig.json                  # TypeScript ES2023 config
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AddRepository.tsx      # Repository input form
    │   │   ├── RepositoryCard.tsx     # Individual repo card
    │   │   └── RepositoryList.tsx     # Repository grid
    │   ├── graphql/
    │   │   ├── queries.ts             # GraphQL queries
    │   │   └── mutations.ts           # GraphQL mutations
    │   ├── apolloClient.ts            # Apollo Client setup
    │   ├── types.ts                   # TypeScript types
    │   ├── App.tsx                    # Main app component
    │   └── main.tsx                   # React entry point
    │
    ├── eslint.config.js               # ESLint ES2023 config
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v22+ (via nvm recommended)
- **PostgreSQL:** v12 or higher
- **GitHub Personal Access Token:** Optional, but recommended for higher rate limits (5000 requests/hour vs 60)

### 1. Database Setup

```bash
# Create a PostgreSQL database
createdb aspire

# Or use psql
psql -U postgres
CREATE DATABASE aspire;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies (includes tsx for ESM support)
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# PORT=4000
# DATABASE_URL=postgresql://user:password@localhost:5432/aspire
# GITHUB_TOKEN=your_github_token_here (optional but recommended)

# Run migrations (creates tables with optimized indexes)
npm run migrate

# Start the backend server (uses tsx with hot reload)
npm run dev
```

The GraphQL API will be available at `http://localhost:4000`

**Backend runs with:**

- ✅ ESM modules (native `import`/`export`)
- ✅ TypeScript ES2023 compilation
- ✅ Auto-reload on file changes
- ✅ Native Octokit import (no dynamic import hacks)

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (or use defaults)
cp .env.example .env

# Edit .env if needed (default values work):
# VITE_GRAPHQL_URL=http://localhost:4000
# VITE_USER_ID=user-1

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

**Frontend features:**

- ⚡ Vite for instant hot module replacement
- 🎨 Pure CSS with GitHub-inspired design
- 🔄 Apollo Client with optimistic updates
- 📱 Responsive design

## 🚀 Future Improvements

Given more time, here are enhancements that would make this production-ready:

### 🔐 Authentication & Security

1. **JWT Authentication**

   - Replace simple `x-user-id` header with JWT tokens
   - Implement refresh token rotation
   - Add password hashing with bcrypt/argon2

2. **OAuth Integration**

   - GitHub OAuth for seamless login
   - Automatic GitHub token management per user
   - Eliminate manual token configuration

3. **API Rate Limiting**

   - Implement rate limiting per user with Redis
   - Prevent abuse and DDoS attacks
   - Token bucket or sliding window algorithm

4. **Input Validation & Sanitization**
   - GraphQL input validation with class-validator
   - XSS protection on frontend
   - SQL injection prevention (already handled by parameterized queries)

### 👥 Multi-User Architecture

5. **User-Level Repository Tracking**

   - Each user maintains their own repository list
   - Add `user_id` foreign key to `repositories` table
   - User-specific dashboard and preferences

6. **User Profile Management**

   - User settings (email, notification preferences)
   - Profile page with tracked repo statistics
   - Account deletion with cascade cleanup

7. **Role-Based Access Control (RBAC)**
   - Admin users to manage global repositories
   - Team workspaces for shared tracking
   - Permission levels (view, edit, admin)

### 🔔 Notifications System

8. **Real-Time Notifications**

   - WebSocket/Server-Sent Events for live updates
   - Push notifications via Firebase Cloud Messaging
   - Email notifications via SendGrid/AWS SES

9. **Notification Preferences**

   - Per-repository notification settings
   - Notification channels (email, push, in-app)
   - Digest emails (daily/weekly summaries)

10. **Smart Notification Filtering**
    - Only notify for major/minor releases (semver filtering)
    - Configurable notification triggers
    - Snooze/mute specific repositories

### ⚙️ Automation & Background Jobs

11. **Automated Release Checking**

    - Cron jobs (node-cron or Bull queue) to check releases every 15 minutes
    - Background workers with job queue (Redis + Bull/BullMQ)
    - Graceful handling of GitHub API rate limits

12. **Webhook Integration**

    - GitHub webhooks for instant release notifications
    - Eliminate polling, get real-time updates
    - Webhook signature verification for security

13. **Database Migration Strategy**
    - Use TypeORM migrations or Prisma for schema versioning
    - Automated migration testing in CI/CD
    - Rollback capabilities for production safety

### 🎨 Frontend Enhancements

14. **Improved UI/UX**

    - Dark mode toggle with system preference detection
    - Repository search and filtering (by language, owner, last update)
    - Sorting options (alphabetical, most recent release, unseen first)
    - Infinite scroll or pagination for large repo lists

15. **Rich Release Information**

    - Display full release notes with Markdown rendering
    - Show release assets (downloads, binaries)
    - Compare versions (diff between releases)
    - Release changelog history timeline

16. **Advanced Features**
    - Repository tags/categories for organization
    - Export tracked repos (JSON, CSV)
    - Bulk actions (mark all as seen, delete multiple)
    - Keyboard shortcuts for power users

### 🗄️ Database & Performance

18. **TypeORM Migration**

    - Replace raw SQL with TypeORM for better maintainability
    - Entity relationships with decorators
    - Auto-generated migrations from entity changes
    - Type-safe query builders

19. **Caching Layer**

    - Redis cache for frequently accessed data
    - Cache invalidation strategy
    - Reduce database load by 70-80%

20. **Full-Text Search**
    - PostgreSQL full-text search for repositories
    - Search by repo name, description, release notes
    - Autocomplete suggestions

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

## 🏗️ Architecture Highlights

### Backend MVC Pattern

```
Request Flow:
GraphQL Query/Mutation
  ↓
Resolvers (schema/resolvers/resolvers.ts)
  ↓
Controllers (controllers/*.ts) - Business logic
  ↓
Models (models/*.ts) - Database operations
  ↓
PostgreSQL Database
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Development mode with auto-reload (tsx)
npm run dev

# Run database migrations
npm run migrate

# Type checking only
npm run typecheck
```

**Available Scripts:**

- `npm run dev` - Start with tsx (ESM-compatible hot reload)
- `npm run migrate` - Run SQL migrations with tsx
- `npm run typecheck` - TypeScript compilation check

### Frontend Development

```bash
cd frontend

# Development mode (Vite HMR)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint with ESLint
npm run lint
```

## 🌐 Environment Variables

### Backend (.env)

```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/aspire
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

### Multi-User Design

- User identification via `x-user-id` header
- Each user has isolated "seen" status
- Can be extended to JWT/OAuth authentication
- Database designed with `user_id` column for multi-tenancy

### GitHub API Integration

- Uses Octokit REST API v22 (latest)
- Singleton pattern for client reuse
- Respects GitHub rate limits (60/hour unauthenticated, 5000/hour with token)
- Handles repositories with no releases gracefully

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code structure (MVC, functional programming)
4. Ensure TypeScript types are strict
5. Test both frontend and backend
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Create a Pull Request

## 📄 License

This project is created for the Aspire Engineering coding assignment.

## 🎉 Acknowledgments

- **Built with:** React, TypeScript, Node.js, GraphQL, PostgreSQL
- **Powered by:** Apollo Server/Client, Octokit, Vite

---

**📧 Questions?** Feel free to reach out or open an issue!
