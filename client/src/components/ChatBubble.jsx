import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`chat-bubble-container ${isUser ? "user" : ""}`}>
      <span className={`chat-bubble ${isUser ? "user" : ""}`}>{text}</span>
    </div>
  );
};

export default ChatBubble;
