import React from "react";
import "./ChatBubble.css";

const ChatBubble = ({ sender, text, isTyping }) => {
  const isUser = sender === "user";

  return (
    <div className={`chat-bubble-container ${isUser ? "user" : ""}`}>
      {isTyping ? (
        <span className="chat-bubble typing">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </span>
      ) : (
        <span className={`chat-bubble ${isUser ? "user" : ""}`}>{text}</span>
      )}
    </div>
  );
};

export default ChatBubble;
