import { ChatOpenAI } from "langchain/chat_models/openai";
export const model = new ChatOpenAI({ 
    modelKwargs: { 'temperature': 0 },
    modelName: "gpt-3.5-turbo"
 });