import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useCreateChatMutation } from "../store/store";
// import socket from "../atoms/socket";
// const socket = io("http://localhost:5000", { autoConnect: false });

const socket = io("http://localhost:5000", {
  transports: ["websocket"], 
  withCredentials: true,
});

// useEffect(() => {
//   socket.connect();
//   return () => socket.disconnect();
// }, []);

socket.emit("test_event", { message: "Hello from client!" });
socket.on("test_response", (response) => {
  console.log("Response from server:", response);
});

socket.on("connect", () => {
  console.log("Connected to socket server:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

const LiveClassChat = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  // Extract roomId and username from the URL parameters
  const params = new URLSearchParams(location.search);
  const roomId = params.get("roomId");
  const username = params.get("username");
  console.log("room Id",roomId);
  console.log("username",username);

  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    if (roomId && username) {
      // Join the room
      socket.emit("join_room", { roomID: roomId, userName: username }, (response) => {
        if (response?.error) {
          alert(response.error);
        } else {
          setMessages(response.messages || []);
        }
      });

      

      // Listen for incoming messages
      socket.on("receive_message", (message) => {
        console.log("message :", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      // Clean up socket events on unmount
      socket.off("receive_message");
    };
  }, [roomId, username]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const messageData = {
      room: roomId,
      sender: username,
      chat: messageInput,
    };

    socket.emit("send_message", messageData);

    // Emit the send_message event
    // createChat(messageData);
    setMessageInput(""); // Clear the input field
  };

  return (
    <div className="chat-container">
      <main className="chat-main">
        <div className="chat-header">
          <h1>Live Class Chat</h1>
        </div>

        <div className="chat-messages" id="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === username ? "message-sent" : "message-received"}
            >
              <div className="message-avatar">{msg.user?.username?.slice(0, 1).toUpperCase()}</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{msg.sender}</span>
                  <span className="message-time">{new Date().toLocaleTimeString()}</span>
                </div>
                <p>{msg.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} className="send-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 3 3 9-3 9 19-9Z" />
              <path d="M6 12h16" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default LiveClassChat;
