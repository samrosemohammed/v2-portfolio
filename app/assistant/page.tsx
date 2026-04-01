import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";
import { AssistantChat } from "@/components/assistant-chat";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant",
  description:
    "Chat with Samrose Portfolio AI to learn about projects, stack, and engineering experience.",
  alternates: {
    canonical: "/assistant",
  },
  openGraph: {
    title: "Assistant | mdsamrose.dev",
    description:
      "Chat with Samrose Portfolio AI to learn about projects, stack, and engineering experience.",
    url: "/assistant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistant | mdsamrose.dev",
    description:
      "Chat with Samrose Portfolio AI to learn about projects, stack, and engineering experience.",
  },
};

const AssistantPage = () => {
  return (
    <MaxWidthWrapper className="py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-[-0.02em] mb-2">
          AI Assistant
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Ask me questions about my projects, skills, or anything else.
        </p>
      </div>
      <AssistantChat />
    </MaxWidthWrapper>
  );
};

export default AssistantPage;
