"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const currentQuery = input;
    setInput("");
    setLoading(true);

    // Placeholder pesan AI saat loading
    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuery }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = data.answer;
        return newMsgs;
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content =
          "Maaf, sistem sedang sibuk. Coba lagi yaa!";
        return newMsgs;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.floatingContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.brand}>
              <div className={styles.avatar}>GS</div>
              <span>Griya Sinau AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
            >
              ×
            </button>
          </div>

          <div className={styles.messageArea}>
            {messages.length === 0 && (
              <div className={styles.emptyState}>
                Halo! Ada yang bisa Griya Sinau AI bantu hari ini?
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? styles.userRow : styles.aiRow}
              >
                <div className={styles.bubble}>{msg.content}</div>
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Tanya Griya Sinau AI"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={styles.sendBtn}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.loader}></span>
              ) : (
                <img
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/sent.png"
                  alt="kirim"
                  className={styles.sendIcon}
                />
              )}
            </button>
          </div>
        </div>
      )}

      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default Chatbot;
