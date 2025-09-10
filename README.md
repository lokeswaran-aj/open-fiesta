# 🎉 Open Fiesta

**Open Fiesta** is an AI chat application with 200+ AI models like OpenAI, Gemini, Claude, Perplexity, Deepseek, and Grok in one place. Compare multiple AI model responses side-by-side in real-time and choose the best AI for every task

---

## ✨ Features (Planned & In Progress)

- [x] Modern chat interface with **real-time AI streaming**
- [x] **Multi-model chat**: talk to ChatGPT, Claude, Gemini, Grok, etc. in parallel
- [x] **Authentication** with Better Auth
- [x] **API Key Management** for AIMLAPI, OpenRouter, and Vercel AI Gateway
- [x] Persistent **chat history in Postgres**
- [ ] Chat AI model settings like temperature, top-p, frequency penalty, etc.
- [ ] **Local-first storage** with IndexedDB for quick access to recent chats
- [ ] (Future) Shareable chats / export as Markdown or PDF

---

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Vercel AI SDK
- Vercel AI Gateway
- OpenRouter
- PromptKit
- Better Auth

---

## 🚀 Local Development Setup

### Prerequisites

Before setting up Open Fiesta locally, make sure you have the following installed:

- **Node.js** (v20 or later) - [Download here](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm` or [follow the official guide](https://pnpm.io/installation)
- **Docker & Docker Compose** - [Download here](https://www.docker.com/products/docker-desktop)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/lokeswaran-aj/open-fiesta.git
cd open-fiesta
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the `.env.example` file to `.env` and fill in the values:

```bash
cp .env.example .env
```

### 4. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

The database will be available at `localhost:5432` with:
- Database: `postgres`
- Username: `postgres` 
- Password: `password`

### 5. Database Migration

Generate and run database migrations:

```bash
# Generate migration files (if schema changes)
npx drizzle-kit generate

# Apply migrations to database
npx drizzle-kit migrate
```

### 6. API Keys Setup

#### AI Gateway & Models

1. **AIMLAPI**: Sign up at [aimlapi.com](https://aimlapi.com/) for access to various AI models
2. **Vercel AI Gateway**: Get your gateway key from [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)

#### Authentication Providers (Optional)

**GitHub OAuth:**
1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/applications/new)
2. Create a new OAuth App with:
   - Application name: `Open Fiesta Local`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy the Client ID and Client Secret to your `.env` file

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth client ID
5. Configure the consent screen
6. Set authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env` file

### 7. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see Open Fiesta running locally! 🎉

### 8. Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

### Troubleshooting

**Database Connection Issues:**
- Ensure Docker is running and the PostgreSQL container is healthy
- Check if port 5432 is available (not used by another service)
- Verify the `DATABASE_URL` in your `.env` file

**Authentication Issues:**
- Double-check OAuth app configurations
- Ensure callback URLs match exactly
- Verify the `BETTER_AUTH_SECRET` is set and sufficiently random

**Missing AI Responses:**
- Verify your API keys are correct and have sufficient credits
- Check the AI Gateway configuration
- Monitor the browser console and server logs for errors

---

## 🤝 Contributing

Open Fiesta is still in **early development**. Contributions are super welcome!

- Check the [Issues](https://github.com/lokeswaran-aj/open-fiesta/issues) page
- Open a PR with improvements
- Share feedback / ideas in Discussions

---

## 📜 License

Open Fiesta is licensed under the **Apache License 2.0**.
See [LICENSE](LICENSE) for full details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://lokeswaran.dev">Lokeswaran Aruljothy</a></sub>
</div>
