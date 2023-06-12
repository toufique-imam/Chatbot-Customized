import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import LandChat from "../LandChat";

const ChatPage = () => {
  const loader = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loader.current) {
        loader.current.style.display = "none";
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="Landing-page" id="landing-page">
      <div className="page-section header-section">
        <div
          className="img-wrp"

        >
          <img src="/Logo-AI.png" alt="Crypto Pad X AI Chat" />
        </div>
        <div className="display">
          <LandChat></LandChat>
        </div>
      </div>

    {/* this is the back background with the moving squares */}
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
