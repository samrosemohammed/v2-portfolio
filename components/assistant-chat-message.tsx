"use client";

import { Message } from "@/types/chat";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === "user";
  const hasContent = message.content.trim().length > 0;

  return (
    <div
      className={`mb-4 flex gap-3 animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
          AI
        </div>
      )}

      <div
        className={`relative max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[80%] lg:max-w-[72%] ${
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border bg-muted text-foreground"
        }`}
      >
        {!isUser && hasContent && (
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title="Copy message"
          >
            {copied ? (
              <Check size={14} className="text-green-600" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        )}

        {isUser ? (
          <p className="pr-0 text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        ) : !hasContent ? (
          <div className="flex items-center gap-1.5 py-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 animation-delay-200" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 animation-delay-400" />
          </div>
        ) : (
          <div className="pr-8 text-sm leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-background/70 px-1 py-0.5 font-mono text-[0.85em]">
                    {children}
                  </code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {(isUser || hasContent) && (
          <p
            className={`mt-2 text-xs ${
              isUser ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      {isUser && (
        <div className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-foreground">
          You
        </div>
      )}
    </div>
  );
}
