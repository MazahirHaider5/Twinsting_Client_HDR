"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");
type Message = {
  conversationId: string;
  sender: string;
  text: string;
};

function Page() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const conversationId = "6814b4d6c1a7e00a4dfda172";
  const userId = "68131eb378bde87bf8931786";

  useEffect(() => {
    // Fetch messages
    axios.get(`http://localhost:5000/message/getMessagesInChat/${conversationId}`)
    .then(res => setMessages(res.data.data));

    // Listen for real-time messages
    const handleReceiveMessage = (msg: any) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // ✅ Proper cleanup function
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [conversationId]);

  const handleSend = async () => {
    const msg = { conversationId, sender: userId, text };
    await axios.post("http://localhost:5000/message/sendMessage", msg);
    socket.emit("sendMessage", msg);
    setText("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Page;
