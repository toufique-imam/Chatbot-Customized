import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import lande from "lande";
import { iso6393 } from 'iso-639-3'


function convertLanguageCodeToName(code: String) {
  const language = iso6393.find((lang) => lang.iso6393 === code);
  return language ? language.name : "English";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question, history } = req.body;

  const prediction = lande(question);
  console.log('prediction', prediction[0]);
  var language = convertLanguageCodeToName(prediction[0][0]);
  console.log('question', question);
  console.log('questionLanguage', language);

  if(!language) {
    language = 'English';
  }

  //only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  var finalQuestion = "Answer the following question in "+ language +" language. QUESTION: " + sanitizedQuestion;
  if(sanitizedQuestion.length < 10) {
    finalQuestion = "DETECT THE LANGUAGE OF THE QUESTION AND ANSWER IN THE SAME LANGUAGE.\n QUESTION: " + sanitizedQuestion + "\n";
  }
  console.log('finalQuestion', finalQuestion);

  try {
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
      },
    );

    //create chain
    const chain = makeChain(vectorStore);
    //Ask a question using chat history
    const chainValues = {
      question: finalQuestion,
      detected_language: language,
      chat_history: history || [],
    };
    const response = await chain.call(chainValues)

    console.log('response', response);
    res.status(200).json(response);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}