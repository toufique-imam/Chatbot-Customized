import Layout from '@/components/layout';

import ChatView from './chatview';

export default function Home() {

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            Chatbot with polygon network
          </h1>
            <ChatView/>
        </div>
        <footer className="m-auto p-4">
          <a href="">
            Powered by LangChainAI.
          </a>
        </footer>
      </Layout>
    </>
  );
}
