import { useState } from "react";
import ChatInputBox from "./components/ChatInputBox/ChatInputBox";
import ChatMessage, { ChatMessageModel } from "./components/ChatMessage";
import { queryBot, parseBotResponse } from "@/utils/ChatBotUtils"

const LandChat = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<ChatMessageModel>>([]);
  const [histories, setHistories] = useState<string>("");
  const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false);

  async function handleQuery(query: string) {
    const newMessage = query.trim();
    console.log("Got message:", newMessage);
    if (newMessage && newMessage.length > 0) {
      setIsWaitingResponse(true);
      setMessages((oldMessages) => {
        let newMsg: ChatMessageModel = {
          content: newMessage,
          profileImage: "/user.png",
        };

        return [...oldMessages, newMsg];
      });
      setCurrentMessage("");
      const response = await queryBot(newMessage, histories);
      const responseMessage = await parseBotResponse(response);
      console.log("ok");
      setHistories((oldMessages) => {
        return oldMessages + " " + newMessage + " " + responseMessage;
      });
      setIsWaitingResponse(false);
      setMessages((oldMessages) => {
        console.log("check 1", oldMessages.length);
        let newMsg: ChatMessageModel = {
          content: responseMessage,
          profileImage: "/logo.svg",
        };
        return [...oldMessages, newMsg];
      });
    }
  }

  return (
    <div className="ai-chat-box">
      <div className="messages-box">
        <ChatMessage
          message={{
            content: "Is anyone there?",
            profileImage: "/logo.svg",
          }}
        />
        {messages.map((message) => {
            return <ChatMessage key={message.content} message={message} />;
        })}
        {isWaitingResponse && (
          <ChatMessage
            message={{
              content: "typing...",
              profileImage: "/logo.svg",
            }}
          />
        )}
      </div>

      <ChatInputBox
        value={currentMessage}
        setNewValue={setCurrentMessage}
        onSubmit={handleQuery}
      />
    </div>
  );
};

export default LandChat;
