import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "@/config/pinecone";


export default async function createVectorStore(pinecone: PineconeClient) {
    try {
        const index = pinecone.Index(PINECONE_INDEX_NAME);
        const embeddings = new OpenAIEmbeddings()
        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            textKey: 'text',
            namespace: PINECONE_NAME_SPACE
        })
        return vectorStore
    } catch (error) {
        console.log("vector store error", error)
        throw new Error("Error creating vector store")
    }
}