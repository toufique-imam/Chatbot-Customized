import { useEffect, useState } from "react";
import ChatInputBox from "./components/ChatInputBox/ChatInputBox";
import ChatMessage, { ChatMessageModel } from "./components/ChatMessage";
import { queryBot, parseBotResponse } from "./components/ChatBotUtils"
import { set } from "lodash";
const LandChat = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<ChatMessageModel>>([]);
  const [histories, setHistories] = useState<string>("");
  const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false);

  async function handleQuery(newMessage: string) {
    console.log("Got message:", newMessage);
    if (newMessage && newMessage.length > 0) {
      setMessages((oldMessages) => {
        let newMsg: ChatMessageModel = {
          content: newMessage,
          profileImage: "/build/images/user.png",
        };

        return [...oldMessages, newMsg];
      });
      setCurrentMessage("");
      setIsWaitingResponse(true);
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
          profileImage: "/build/images/logo.svg",
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
            profileImage: "/build/images/logo.svg",
          }}
        />
        {messages.map((message) => {
          return <ChatMessage key={message.content} message={message} />;
        })}
        {isWaitingResponse && (
          <ChatMessage
            message={{
              content: (
                <p className="line4">
                  {" "}
                  <span className="rotate-v">C:\</span>
                  <span className="cursor4">_</span>
                </p>
              ),
              profileImage: "/build/images/logo.svg",
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
