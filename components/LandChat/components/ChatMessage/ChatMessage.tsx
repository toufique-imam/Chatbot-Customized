import { Profiler, useEffect, useState } from "react";
import { ChatMessageProps } from "./ChatMessage.types";
import Typewriter from "../../../Typewriter";

const ChatMessage = (props: ChatMessageProps) => {
  const [text, setText] = useState("");
  const messageContent = props.message.content;

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const textToType = String(messageContent);
      setText(textToType.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === messageContent.length) {
        clearInterval(intervalId);
      }
    }, 1);
  }, [messageContent]);

  return (
    <div
      className={`chat-message-wrapper`}

      // {props.message.flexEnd ? "flex-end right-animation" : ""}`
    >
      <div className="chat-message-content">
        {" "}
        <Typewriter
          textToType={text}
          textSpeed={50}
          delay={500}
          noChevron={false}
          chevronColor={"#33a0be"}
        ></Typewriter>
      </div>
    </div>
  );
};

export default ChatMessage;
