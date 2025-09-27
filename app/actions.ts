"use server";
import { ChatWatsonx } from "@langchain/community/chat_models/ibm";
// pre-built utility function for creating interactive AI agents using react ui.
import { createReactAgent } from "@langchain/langgraph/prebuilt";
// core absraction representing a capability or external function an AI agent can call. 
import { tool} from "@langchain/core/tools";
// schema validation library in javascript/typescript used to define and enforce shape and rules for data.
import z from "zod";
// stored message: data structure representing a message in a chat history, typically includes role, content, and metadata.

// mapStoredMessagesToChatMessages: utility function that converts an array of stored messages into a format compatible with chat models.
import { mapStoredMessagesToChatMessages, StoredMessage } from "@langchain/core/messages";
import { customerTable, filmTable, paymentTable, rentalTable } from "./constant";
import { execute } from "./database";



export async function message(messages: StoredMessage[]) {
// Desrializing JSON type data into LangChain chat message instances.
//Takes old saved messages from storage and converts them into format AI can understand.
const deserializedMessages = mapStoredMessagesToChatMessages(messages);

const getFromDB = tool(
    // function of the tool getFromDB
    async (input) => {
      if (input?.sql) {
        console.log({ sql: input.sql });

        const result = await execute(input.sql);

        return JSON.stringify(result);
      }
      return null;
    },
    // metadata of the tool getFromDB
    {
      name: "get_from_db",
      description: `Get data from a database, the database has the following schema:
  
      ${filmTable}
      ${customerTable}  
      ${rentalTable}
      ${paymentTable}
      `,
      // zod is used to define what kind of input is allowed
      // input must be an object with a sql string
      // zod (typescript-first validation library)
      schema: z.object({
        sql: z
          .string()
          .describe(
            "SQL query to get data from a SQL database. Always put quotes around the field and table arguments."
          ),
      }),
    }
  );

const agent = createReactAgent({
    llm: new ChatWatsonx({
        model: "mistralai/mistral-large",
        projectId: process.env.WATSONX_AI_PROJECT_ID!, // ! is used to tell typescript "trust me, it exists".
        serviceUrl: process.env.WATSONX_AI_ENDPOINT!,
        version: process.env.WATSONX_AI_API_VERSION!
    }),
    tools: [getFromDB],
});

// sends all messages to the AI. AI thinks about them and gives back an answer.
const response = await agent.invoke({messages: deserializedMessages});
// gets the very last message from the AI's response
return response.messages[response.messages.length - 1].content;
}

