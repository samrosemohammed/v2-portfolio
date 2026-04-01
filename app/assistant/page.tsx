import { MaxWidthWrapper } from "@/wrapper/max-width-wrapper";
import { AssistantChat } from "@/components/assistant-chat";
import React from "react";

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
