import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import { sendMessageToChatbot } from "../api/chatApi";
import "./ChatPage.css";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentMessage = input;
    setChatLog((prev) => [...prev, { sender: "user", text: currentMessage }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToChatbot(currentMessage);
      setChatLog((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      setChatLog((prev) => [...prev, { sender: "bot", text: "서버 오류가 발생했습니다." }]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) sendMessage();
  };

  return (
    <div className="chat-page-container">
      <h1 className="chat-title">OpenAI 챗봇</h1>
      <div ref={chatContainerRef} className="chat-container">
        {chatLog.map((chat, idx) => (
          <ChatBubble key={idx} sender={chat.sender} text={chat.text} />
        ))}
        {loading && (
          <div className="chat-bubble-container">
            <span className="chat-bubble typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} placeholder="메시지를 입력하세요..." onChange={(e) => setInput(e.target.value)} className="chat-input" disabled={loading} />
        <button type="submit" className="chat-send-button" disabled={loading}>
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
