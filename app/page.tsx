"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  HumanMessage,
  SystemMessage,
  BaseMessage,
  AIMessage,
  mapChatMessagesToStoredMessages,
} from "@langchain/core/messages";
import { message } from "./actions";
import { seed } from "./database";
import {
  filmTable,
  customerTable,
  rentalTable,
  paymentTable,
} from "./constant";

export default function Home() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<BaseMessage[]>([
    new SystemMessage(`You are an expert SQL assistant. Your ONLY job is to generate a syntactically correct SQL query for SQLite, based on the user's request. Output ONLY the SQL query as plain text. Do NOT include any explanations, comments, function calls, JSON, or markdown code blocks. Do NOT use any language tags. Do NOT return anything except the SQL query itself. Always enclose field and table names in double quotes (""). Use uppercase for SQL keywords.`),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const schemaDisplay = `${filmTable}\n\n${customerTable}\n\n${rentalTable}\n\n${paymentTable}`;

  useEffect(() => {
    seed();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    if (!inputMessage.trim()) return;
    setIsLoading(true);
    const messageHistory = [...messages, new HumanMessage(inputMessage)];
    setInputMessage("");
    const response = await message(
      mapChatMessagesToStoredMessages(messageHistory)
    );
    if (response) {
      messageHistory.push(new AIMessage(response as string));
    }
    setMessages(messageHistory);
    setIsLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleClear() {
    setMessages(messages.slice(0, 1)); // keep only the system message
    setInputMessage("");
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:block w-80 p-8">
        <label className="block font-semibold mb-2 text-gray-900 dark:text-gray-100">Database Schema</label>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-left overflow-y-auto max-h-[80vh]">
          <pre className="text-xs font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-100">{schemaDisplay}</pre>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 max-w-2xl mx-auto p-4 md:p-8">
        <header className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Natural Language Query</header>
        <div className="flex-1 flex flex-col min-h-0 border rounded-lg bg-white dark:bg-gray-800 shadow border-gray-200 dark:border-gray-700">
          {/* Chat messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto px-4 py-6"
            style={{ minHeight: 300, maxHeight: 500 }}
          >
            {messages.slice(1).map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message instanceof HumanMessage
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={
                    message instanceof AIMessage
                      ? "max-w-[70%] px-4 py-2 rounded-lg font-mono text-base shadow bg-gray-900 dark:bg-gray-700 text-green-200 dark:text-green-300 border-l-4 border-green-400"
                      : "max-w-[70%] px-4 py-2 rounded-lg font-mono text-base shadow bg-indigo-100 dark:bg-indigo-900 text-right dark:text-indigo-100"
                  }
                >
                  {message instanceof AIMessage ? (
                    <pre className="whitespace-pre-wrap break-words">{message.content as string}</pre>
                  ) : (
                    <span>{message.content as string}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input at bottom */}
          <div className="flex items-center gap-2 p-4 border-t bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Type your query..."
              className="flex-1 rounded border border-gray-300 dark:border-gray-700 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-600"
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? "Generating..." : "Send"}
            </button>
            <button
              onClick={handleClear}
              className="py-2 px-4 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
