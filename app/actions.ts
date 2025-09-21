"use server";
import { ChatWatsonx } from "@langchain/community/chat_models/ibm";
// pre-built utility function for creating interactive AI agents using react ui.
import { createReactAgent } from "@langchain/langgraph/prebuilt";
// core absraction representing a capability or external function an AI agent can call. 
import { Tool } from "@langchain/core/tools";
// schema validation library in javascript/typescript used to define and enforce shape and rules for data.
import z from "zod";
// stored message: data structure representing a message in a chat history, typically includes role, content, and metadata.

// mapStoredMessagesToChatMessages: utility function that converts an array of stored messages into a format compatible with chat models.
import { mapStoredMessagesToChatMessages, StoredMessage } from "@langchain/core/messages";



export async function message(messages: StoredMessage[]) {
// Desrializing JSON type data into LangChain chat message instances.
//Takes old saved messages from storage and converts them into format AI can understand.
const deserializedMessages = mapStoredMessagesToChatMessages(messages);

const agent = createReactAgent({
    llm: new ChatWatsonx({
        model: "mistralai/mistral-large",
        projectId: process.env.WATSONX_AI_PROJECT_ID!, // ! is used to tell typescript "trust me, it exists".
        serviceUrl: process.env.WATSONX_AI_ENDPOINT!,
        version: process.env.WATSONX_AI_API_VERSION!
    }),
    tools: [],
});

// sends all messages to the AI. AI thinks about them and gives back an answer.
const response = await agent.invoke({messages: deserializedMessages});
// gets the very last message from the AI's response
return response.messages[response.messages.length - 1].content;
}

