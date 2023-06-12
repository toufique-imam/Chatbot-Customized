import { useEffect, useState } from "react";
import { ChatInputBoxProps } from "./ChatInputBox.types";

const ChatInputBox = (props: ChatInputBoxProps) => {
  const [inputText, setInputText] = useState("");
  const inputMessage = props.value;

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setInputText(inputMessage.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === inputMessage.length) {
        clearInterval(intervalId);
      }
    }, 100);
  }, [inputMessage]);

  return (
    <>
      <div className="chat-input-box">
        <div className="header-input-box">
          <div className="name-first-terminal">
            <div className="promp-wr">
              <img
                src="/commandPrompt/commandWnd.png"
                alt="commandLine"
              />
            </div>
            COMMAND PROMPT{" "}
          </div>
        </div>
        <div className="flex-row">
          <span className="color">{">"}</span>{" "}
          <input
            type="text"
            className="chat-input"
            value={props.value}
            onChange={(e) => {
              props.setNewValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.onSubmit(props.value);
              }
            }}
            placeholder=""
          />
        </div>
      </div>
    </>
  );
};

export default ChatInputBox;
