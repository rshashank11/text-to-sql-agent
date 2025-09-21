"use client";
import { useState } from "react";

import { HumanMessage, SystemMessage, BaseMessage, AIMessage, mapChatMessagesToStoredMessages } from "@langchain/core/messages";
import { message } from "./actions";

/**
 * 1. basemessage: the parent class that all other messages inherit from. basic template/blueprint for all messages.
 * 
 * 2. systemmessage: instructions for AI about how to behave. sets AI's personality, job or rules.
 * 
 * 3. humanmessage: like the name says, messages from humans/users. 
 * 
 * 4. aimessage: responses from the AI.
 * 
 */

export default function Home() {
  const [inputMessage, setInputMessage] = useState("");
  // <BaseMessage[]> : "this will be an array of langchain messages."
  // initially you will be starting with one message already in the list telling AI what to do.
  const [messages, setMessages] = useState<BaseMessage[]>([new SystemMessage(`You are a tex-to-sql agent. You shoudl create a SQL query based on natural language and use it with given tools to generate the output if possible`)]);

  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {

    setIsLoading(true)
    const messageHistory = [...messages, new HumanMessage(inputMessage)];
    setInputMessage("")

    const response = await message(mapChatMessagesToStoredMessages(messageHistory));

    if(response) {
      messageHistory.push(new AIMessage(response as string));
    }

    setMessages(messageHistory);
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="font-bold text-lg flex items-center gap-2">
          <span>Logo</span>
          <span>Logo</span>
        </div>
        <nav>Navigation</nav>
        <div className="opacity-70 text-lg cursor-pointer">[ ]</div>
      </header>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Natural Language Query</h1>

      <main className="flex gap-8">
        {/* Left Section */}
        <section className="flex-2">
          <label htmlFor="nl-query" className="block font-semibold mb-2">
            Natural Language Query
          </label>
          <textarea
            id="nl-query"
            rows={6}
            value={inputMessage}
            disabled={isLoading}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your query here..."
            className="w-full rounded-lg border border-gray-300 p-4 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div>
            <button className="mr-4 bg-black text-white py-2 px-6 rounded hover:bg-gray-800" onClick={sendMessage}>
              {isLoading? `Generating`: `Send`}
            </button>
            <button className="py-2 px-6 rounded border border-gray-400 hover:bg-gray-100">
              Clear
            </button>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1">
              <label className="block font-semibold mb-1">
                Generated SQL Code
              </label>
              <input
                type="text"
                placeholder="SQL code..."
                // value={messages}
                readOnly
                className="w-full rounded border border-gray-300 p-2 font-mono text-base"
              />
            </div>
            <button className="border border-gray-400 rounded py-2 px-6 hover:bg-gray-100">
              Copy
            </button>
          </div>
        </section>

        {/* Right Section - Schema */}
        <aside className="flex-1 min-w-[250px]">
          <label className="block font-semibold mb-2">Database Schema</label>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center"></div>
        </aside>
      </main>

      {/* Icons footer */}
      <footer className="flex gap-4 mt-12">
        <button className="text-2xl focus:outline-none hover:text-gray-600">
          🏠
        </button>
        <button className="text-2xl focus:outline-none hover:text-gray-600">
          ✏️
        </button>
        <button className="text-2xl focus:outline-none hover:text-gray-600">
          🗂️
        </button>
      </footer>
    </div>
  );
}
