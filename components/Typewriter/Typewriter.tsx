import React, { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  textToType: any;
  textSpeed: number;
  delay: number;
  propertyClass?: string;
  noChevron: boolean;
  chevronColor?: string;
  onTypingFinish?: () => void;
}
const Typewriter = (props: TypewriterProps) => {
  const [text, setText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        const textToType = String(props.textToType);
        setText(textToType.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === props.textToType.length) {
          setIsFinished(true);
          clearInterval(intervalId);
          if (props.onTypingFinish) {
            props.onTypingFinish();
          }
        }
      }, props.textSpeed);
      return () => clearInterval(intervalId);
    }, props.delay);
    return () => clearTimeout(timeoutId);
  }, [props.delay, props.textToType, props.textSpeed, props.onTypingFinish]);

  return (
    <>
      <span className={props.propertyClass}>
        {props.noChevron ? (
          <></>
        ) : (
          <span
            className="margin-chevron-typetext"
            style={{
              color: `${props.chevronColor}`,
            }}
          >
            {" "}
            {">"}
          </span>
        )}
        {text}{" "}
        <span
          className="line anim-typewriter stop-animation"
          style={{
            borderRightColor: `${
              isFinished ? "transparent" : `${props.chevronColor}`
            }`,
          }}
        ></span>
      </span>
    </>
  );
};

export default Typewriter;
