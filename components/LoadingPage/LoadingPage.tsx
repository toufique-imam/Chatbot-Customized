import React, { useEffect, useRef, useState } from "react";

const LoadingPage = () => {
  const loader = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loader.current) {
        loader.current.style.display = "none";
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="loading-page" ref={loader}>
      <div className="wrp">
        <img src="/build/images/Logo-AI.png" alt="Loading" />
      </div>
    </div>
  );
};

export default LoadingPage;
