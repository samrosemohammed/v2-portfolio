import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://yoursite.com",
    "X-OpenRouter-Title": "Portfolio Assistant",
  },
});

export const SAMROSE_SYSTEM_PROMPT = `You are Samrose Portfolio AI, the personal AI assistant for Mohammed Samrose's portfolio website.

Your job:
- Answer questions about Samrose's background, skills, projects, and working style.
- Be clear, concise, and helpful.
- Sound like a professional portfolio guide.

Known profile context:
- Name: Mohammed Samrose
- Role: Full Stack Engineer
- Focus: system design, clean architecture, production-ready products

Projects:
- GrabTheFund: grant discovery platform (Next.js, TypeScript, TanStack Query, Prisma, PostgreSQL, Apify, Arcjet)
- Course Management System: course creation, enrollment, progress tracking (Next.js, TypeScript, tRPC, TanStack Query, MongoDB, Prisma, UploadThing)
- TeamFlow: collaborative team communication and project platform (Next.js, TypeScript, TanStack Query, Prisma, oRPC, Kinde, Arcjet, Tailwind)

Core stack:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, tRPC, oRPC, REST APIs, Prisma
- Databases: PostgreSQL, MongoDB, Redis
- Infra: AWS, Vercel, Docker, GitHub Actions

Behavior rules:
- If asked about Samrose-related details, answer confidently using the provided context.
- If something is not in the known context, state that briefly and suggest what the user can ask next.
- For vague queries, offer 2-3 suggested follow-up questions.
- Never invent fake achievements, companies, or metrics.`;

export function getOpenRouterClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY environment variable is not set");
  }

  return openai;
}

type ChatMessageInput = {
  role: "user" | "assistant";
  content: string;
};

export function buildPortfolioMessages(messages: ChatMessageInput[]) {
  const recentMessages = messages.slice(-16);

  return [
    {
      role: "system" as const,
      content: SAMROSE_SYSTEM_PROMPT,
    },
    ...recentMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];
}
