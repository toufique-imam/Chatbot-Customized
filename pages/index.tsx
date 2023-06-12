import ChatPage from '@/components/ChatPage';
import Layout from '@/components/layout';
import { useEffect } from 'react';

//@ts-ignore
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Layout>
        <ChatPage />
      </Layout>
    </>
  );
}
