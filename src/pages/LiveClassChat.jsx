import React from "react";
// import "./LiveClassChat.css"; // Move your CSS styles here

const LiveClassChat = () => {
  const room = { title: "Live Class Room" };
  const messages = [
    {
      user: { username: "JohnDoe" },
      content: "Hello everyone!",
      timestamp: "10:30",
    },
    {
      user: { username: "JaneSmith" },
      content: "Hi John! How are you?",
      timestamp: "10:31",
    },
    {
      user: { username: "JohnDoe" },
      content: "I'm doing great, thanks!",
      timestamp: "10:32",
    },
  ];

  return (
    <div className="chat-container">
      {/* Sidebar (Optional if required later) */}

      {/* Main chat area */}
      <main className="chat-main">
        <div className="chat-header">
          <h1>{room.title}</h1>
          <div className="header-actions">
            <button className="action-btn">
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
                <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1Z" />
                <path d="M4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2Z" />
              </svg>
              Start Video
            </button>
            <button className="action-btn">
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
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </svg>
              Unmute
            </button>
          </div>
        </div>

        <div className="chat-messages" id="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.user.username === "JohnDoe" ? "message-sent" : "message-received"
              }
            >
              <div className="message-avatar">
                {msg.user.username.slice(0, 1).toUpperCase()}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{msg.user.username}</span>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" id="message-input" placeholder="Type your message..." />
          <button className="send-btn">
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
