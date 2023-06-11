import { ConversationalRetrievalQAChain } from "langchain/chains";
import { model } from "@/utils/llm";
import { PineconeStore } from 'langchain/vectorstores/pinecone';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}

DETECT THE LANGUAGE OF THE FOLLOWING QUESTION AND ANSWER IN THE SAME LANGUAGE.
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant Of the Cryptpad X project. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, dont try to put the context into the answer. Answer the question as if you don't have the context. Use the previous conversations to get the answer.
Sometimes the question is not a question but a statement. In that case, reply with a statement.
{context}

DETECT THE LANGUAGE OF THE FOLLOWING QUESTION AND ANSWER IN THE SAME LANGUAGE.
Question: {question}
Helpful answer in text:`;



export const makeChain = (vectorstore: PineconeStore) => {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false
    },
  );
  return chain;
};
