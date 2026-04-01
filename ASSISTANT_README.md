# AI Assistant Chat Implementation

This is a clean, production-ready AI Assistant chat page built with Next.js, React, and Anthropic's Claude API.

## Architecture

The implementation follows a **client-server separation** pattern for security and maintainability:

### Server-Side (`lib/ai.ts`)

- **`sendMessage()`** - Server action that safely calls the Anthropic API
- API key is protected and never exposed to the client
- Handles the actual communication with Claude
- Validates and processes responses

### Client-Side Components

- **`AssistantChat`** (`components/assistant-chat.tsx`) - Main container component
  - Manages message history and loading states
  - Orchestrates message sending and display
  - Handles error states and auto-scrolling
- **`ChatMessage`** (`components/assistant-chat-message.tsx`) - Displays individual messages
  - Shows timestamps for each message
  - Copy-to-clipboard functionality for assistant responses
  - Different styling for user vs. assistant messages
- **`ChatInput`** (`components/assistant-chat-input.tsx`) - Message input form
  - Enter message to send
  - Disabled state while loading
  - Clear visual feedback

### Types (`types/chat.ts`)

- Type definitions for `Message` and `ChatContextType`
- Ensures type safety across the application

## Features

✅ **Real-time Chat** - Instant message delivery and responses  
✅ **Message History** - Maintains conversation context for natural dialogue  
✅ **Streaming Ready** - Code structure supports streaming (can be upgraded)  
✅ **Copy Messages** - Quick copy-to-clipboard for assistant responses  
✅ **Clear History** - Reset conversation with one click  
✅ **Loading States** - Visual feedback while waiting for responses  
✅ **Error Handling** - Graceful error messages and recovery  
✅ **Dark Mode** - Professional dark theme built-in

## Setup

### 1. Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up for a free account
3. Create a new API key

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add your API key to `.env.local`:

```
ANTHROPIC_API_KEY=sk_ant_...
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/assistant` to see the chat page.

## Usage

1. Type a message in the input field
2. Press Enter or click the Send button
3. The assistant will respond after a moment
4. Click the copy icon on assistant messages to copy to clipboard
5. Use the trash icon in the header to clear the entire chat history

## Customization

### Change the AI Model

In `lib/ai.ts`, update the `model` parameter:

```typescript
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022", // Change this
  max_tokens: 1024,
  messages: formattedMessages,
});
```

Available models:

- `claude-3-5-sonnet-20241022` (recommended - fastest & smartest)
- `claude-3-opus-20250219` (most capable)
- `claude-3-haiku-20250307` (fastest & cheapest)

### Customize System Prompt

In `components/assistant-chat.tsx`, update the `SYSTEM_PROMPT` constant to change the assistant's behavior and personality.

### Adjust Chat Window Height

In `components/assistant-chat.tsx`, modify the `h-[600px]` class to change the chat container height.

## File Structure

```
lib/
  └─ ai.ts                          # Server actions & Anthropic API
components/
  ├─ assistant-chat.tsx             # Main chat container
  ├─ assistant-chat-input.tsx        # Message input form
  └─ assistant-chat-message.tsx      # Message display component
types/
  └─ chat.ts                        # TypeScript types
app/
  └─ assistant/
      └─ page.tsx                   # Page layout
```

## Security Considerations

✅ **API Key Protection** - Keys stored in `.env.local` (server-only)  
✅ **XSS Prevention** - React automatically escapes content  
✅ **Rate Limiting** - Consider adding rate limits in production  
✅ **Input Validation** - Messages trimmed and validated  
✅ **No Direct Client Calls** - API calls go through server actions

## Next Steps (Optional Enhancements)

- **Streaming Responses** - For longer, streamed replies
- **Conversation Persistence** - Save chats to database
- **File Uploads** - Support images and documents
- **Voice Input** - Speech-to-text integration
- **Analytics** - Track popular questions
- **Rate Limiting** - Prevent abuse and manage costs

## Troubleshooting

### "ANTHROPIC_API_KEY is not set" Error

Make sure you've created a `.env.local` file with your API key. Check [Setup section](#setup) above.

### API Errors

Check the browser console for detailed error messages. Common issues:

- Invalid API key
- Rate limit exceeded
- Network connectivity issues

### Components Not Rendering

Ensure all files are in the correct locations as shown in the [File Structure](#file-structure) section.

## Support

For issues with Anthropic's API, visit [Anthropic Documentation](https://docs.anthropic.com).

Happy chatting! 🚀
