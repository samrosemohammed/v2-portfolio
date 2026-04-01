import { buildPortfolioMessages, getOpenRouterClient } from "@/lib/ai";

export const runtime = "nodejs";

type RequestMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: RequestMessage[] };
    const inputMessages = body.messages;

    if (!Array.isArray(inputMessages) || inputMessages.length === 0) {
      return Response.json(
        { error: "messages array is required" },
        { status: 400 },
      );
    }

    const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-2-7b-chat";
    const openai = getOpenRouterClient();

    const stream = await openai.chat.completions.create({
      model,
      messages: buildPortfolioMessages(inputMessages),
      max_tokens: 512,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to stream response";

    return Response.json({ error: message }, { status: 500 });
  }
}
