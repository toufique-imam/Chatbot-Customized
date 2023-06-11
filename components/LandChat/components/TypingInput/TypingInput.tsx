import React, { useState, useEffect } from "react";

interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

function TypingInput({ value, onChange, onSubmit }: TypingInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayValue(value.substring(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === value.length) {
        clearInterval(intervalId);
        setTypingComplete(true);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [value]);

  useEffect(() => {
    if (typingComplete) {
      setCurrentValue(value);
    }
  }, [typingComplete, value]);

  return (
    <div>
      <input
        type="text"
        value={currentValue}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={() => onSubmit(currentValue)}>Invia</button>
      <div>{displayValue}</div>
    </div>
  );
}

export default TypingInput;
