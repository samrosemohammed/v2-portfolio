# Mohammed Samrose Portfolio (v2)

Personal portfolio built with Next.js 16, featuring:

- A home page with experience timeline, tech stack, selected work, and contact section
- A markdown-powered blog with tag filtering and dynamic post pages
- A streaming AI assistant page backed by OpenRouter

## Tech Stack

- Framework: Next.js 16 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4, shadcn/ui primitives, lucide-react icons
- Content: Markdown + gray-matter + MDX rendering
- AI: OpenAI SDK pointed to OpenRouter chat completions API
- Theme: next-themes (light/dark/system)

## Project Structure

```text
app/
	page.tsx                   # Home page
	assistant/page.tsx         # AI assistant UI page
	api/assistant/route.ts     # Streaming assistant endpoint
	blog/page.tsx              # Blog index
	blog/[slug]/page.tsx       # Blog post page
components/
	assistant-chat.tsx         # Assistant chat orchestration
	blog-posts-filter.tsx      # Blog filtering UI
content/blog/                # Markdown posts
lib/
	ai.ts                      # OpenRouter client + system prompt
	blog.ts                    # Markdown post loader
```

## Local Development

### 1. Install dependencies

This repo includes a `pnpm-lock.yaml`, so `pnpm` is recommended.

```bash
pnpm install
```

### 2. Configure environment variables

Create a local env file named `.env.local`:

```bash
# Linux/macOS
touch .env.local
```

Add/update these values in `.env.local`:

```bash
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=meta-llama/llama-2-7b-chat
```

Notes:

- `OPENROUTER_API_KEY` is required for `/assistant`.
- `OPENROUTER_MODEL` is optional. If omitted, it falls back to `meta-llama/llama-2-7b-chat`.

### 3. Run the app

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Available Scripts

- `pnpm dev` - Start local development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Blog Workflow

Blog posts live in `content/blog/*.md` and are loaded at build/runtime via `lib/blog.ts`.

Each markdown file should include frontmatter like:

```md
---
title: "Post title"
date: "2026-04-10"
description: "Short summary"
tags: ["nextjs", "ai"]
---
```

Then add markdown content below the frontmatter.

## AI Assistant Flow

1. UI in `components/assistant-chat.tsx` sends conversation messages to `POST /api/assistant`.
2. `app/api/assistant/route.ts` validates input and creates a streaming completion request.
3. `lib/ai.ts` injects a portfolio-specific system prompt and configures the OpenRouter client.
4. The response stream is forwarded back to the client and rendered incrementally.

## Deployment

The app is standard Next.js and can be deployed to Vercel or any Node-compatible platform.

Before deploying, ensure:

- `OPENROUTER_API_KEY` is set in your hosting environment
- Optional `OPENROUTER_MODEL` is set if you want a model different from the default
- `pnpm build` passes successfully

## License

Personal portfolio project by Mohammed Samrose.
