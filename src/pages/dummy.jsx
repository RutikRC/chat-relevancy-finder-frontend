import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useCreateChatMutation } from "../store/store";

const socket = io("http://localhost:5000"); // Connect to the backend server

const LiveClassChat = () => {
  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const [createChat] = useCreateChatMutation();
  // Join room
  const joinRoom = () => {
    if (roomID && userName) {
      socket.emit("join_room", { roomID, userName });

      socket.on("room_error", (data) => {
        alert(data.error);
      });

      socket.on("room_messages", (roomMessages) => {
        setMessages(roomMessages);
        setIsJoined(true);
      });
    } else {
      alert("Please enter both Room ID and Username");
    }
  };

  // Listen for new messages
  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (roomID && userName && message) {
      socket.emit("send_message", {
        room: roomID,
        sender: userName,
        chat: message,
      });
      setMessage(""); // Clear the input field
    } else {
      alert("Please enter a message");
    }
  };

  return (
    <div className="chat-container">
      {/* Join Room Section */}
      {!isJoined && (
        <div className="join-room">
          <input
            type="text"
            placeholder="Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}

      {/* Chat Section */}
      {isJoined && (
        <>
          <main className="chat-main">
            <div className="chat-header">
              <h1>Room: {roomID}</h1>
            </div>

            {/* Display messages */}
            <div className="chat-messages" id="message-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === userName ? "message-sent" : "message-received"
                  }
                >
                  <div className="message-avatar">
                    {msg.sender.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-author">{msg.sender}</span>
                      <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p>{msg.chat}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input to send a message */}
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default LiveClassChat;