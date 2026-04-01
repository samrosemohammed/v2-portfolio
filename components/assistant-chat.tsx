"use client";

import { Message } from "@/types/chat";
import { ChatInput } from "./assistant-chat-input";
import { ChatMessage } from "./assistant-chat-message";
import { useRef, useEffect, useState } from "react";
import { Sparkles, Trash2 } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "What is Samrose's core tech stack?",
  "Tell me about the GrabTheFund project.",
  "How does Samrose approach system design?",
  "Which project best shows backend architecture skills?",
];

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    setError(null);
    const timestamp = Date.now();
    const userMessage: Message = {
      id: timestamp.toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    const assistantMessageId = (timestamp + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      content: "",
      role: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    try {
      const messagesToSend = [...messages, userMessage];
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesToSend.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get response");
      }

      if (!response.body) {
        throw new Error("Streaming is not supported in this browser");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        streamedContent += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: streamedContent }
              : msg,
          ),
        );
      }

      streamedContent += decoder.decode();

      if (!streamedContent.trim()) {
        throw new Error("No response content from OpenRouter");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get response";
      setError(errorMessage);
      console.error("Chat error:", err);

      setMessages((prev) =>
        prev.filter((msg) => msg.id !== assistantMessageId),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    setError(null);
  };

  const handleUsePrompt = async (prompt: string) => {
    await handleSendMessage(prompt);
  };

  const isEmptyChat = messages.length === 0;

  return (
    <div className="relative flex h-[72vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:h-160">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 to-transparent" />

      <div className="relative flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/15 p-1.5 text-primary">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Samrose Portfolio AI
            </h2>
            <p className="text-xs text-muted-foreground">
              Ask about projects, stack, and experience
            </p>
          </div>
        </div>
        {!isEmptyChat && (
          <button
            onClick={handleClearHistory}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="relative border-b border-border px-4 py-3">
        <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Try asking
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void handleUsePrompt(prompt)}
              disabled={isLoading}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 space-y-4 overflow-y-auto p-4">
        {isEmptyChat && (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-xl border border-dashed border-border bg-background/60 px-6 py-8 text-center">
              <p className="mb-2 text-sm font-medium text-foreground">
                Meet your Samrose portfolio guide
              </p>
              <p className="text-sm text-muted-foreground">
                Ask about projects, architecture decisions, and preferred tools
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          disabled={!!error}
        />
      </div>
    </div>
  );
}
