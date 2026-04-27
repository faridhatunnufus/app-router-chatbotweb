"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

// 1. Definisikan tipe data untuk pesan
interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 2. Berikan tipe data <Message[]> pada useState agar tidak dianggap 'never'
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Sekarang TypeScript tahu bahwa objek ini valid
    const userMessage: Message = { role: "user", content: input };
    
    setMessages((prev) => [...prev, userMessage]);
    
    const currentQuery = input;
    setInput("");
    setLoading(true);

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
        newMsgs[newMsgs.length - 1].content = "Maaf, sistem sedang sibuk. Coba lagi ya!";
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
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
          </div>

          <div className={styles.messageArea}>
            {messages.length === 0 && (
              <div className={styles.emptyState}>
                Belum ada percakapan. Silakan ajukan pertanyaan Anda!
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === "user" ? styles.userRow : styles.aiRow}>
                <div className={styles.bubble}>{msg.content}</div>
              </div>
            ))}
            <div ref={scrollRef}></div>
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              className={styles.chatInput}
              placeholder="Tanya program les..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} className={styles.sendBtn} disabled={loading}>
              {loading ? "..." : "Kirim"}
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


/* "use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Halo! Saya asisten Griya Sinau Syahir. Ada yang bisa saya bantu?",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbaru setiap ada perubahan pada messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // 1. Tambahkan pesan user ke UI
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentQuery = input;
    setInput("");
    setLoading(true);

    // 2. Tambahkan placeholder pesan AI (loading)
    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    try {
      // 3. Fase 2: Mengirim query ke API RAG melalui HTTP POST
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuery }),
      });

      const data = await response.json();

      // 4. Update pesan placeholder dengan jawaban asli dari Gemini
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = data.answer;
        return newMsgs;
      });
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setMessages((prev) => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = "Maaf, sistem sedang sibuk. Coba lagi ya!";
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
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
          </div>

          <div className={styles.messageArea}>
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
              placeholder="Tanya program les..."
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
              {loading ? "..." : "Kirim"}
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

export default Chatbot; */

/* "use client";

import React, { useState } from "react";
import styles from "./Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya asisten Griya Sinau Syahir. Ada yang bisa saya bantu?",
    },
  ]);

  const handleSend = async () => {
    // Validasi agar tidak mengirim pesan kosong
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simpan input ke variabel sementara lalu kosongkan kolom input
    const currentQuery = input;
    setInput("");

    // Tambahkan status loading
    setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);

    try {
      // Fase 2: Mengirim query ke API RAG
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentQuery }),
      });

      const data = await response.json();

      // Update pesan loading dengan jawaban asli dari Gemini
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
          "Maaf, sistem sedang sibuk. Coba lagi ya!";
        return newMsgs;
      });
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? styles.userRow : styles.aiRow}
              >
                <div className={styles.bubble}>{msg.content}</div>
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Tanya program les..."
              value={input} // Pastikan terhubung ke state input
              onChange={(e) => setInput(e.target.value)} // Penting agar bisa diketik
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className={styles.sendBtn}>
              Kirim
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
 */