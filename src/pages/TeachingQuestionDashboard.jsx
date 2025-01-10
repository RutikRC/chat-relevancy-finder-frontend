import React, { useState } from 'react';
import './teacherMeetingDashboard.css';

const TeacherMeetingDashboard = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Can you explain the concept of polymorphism in object-oriented programming?",
      author: "John Doe",
      time: "2 mins ago",
      relevance: 92,
      answered: false,
      aiResponse: null,
    },
    {
      id: 2,
      text: "What's the difference between REST and GraphQL APIs?",
      author: "Sarah Smith",
      time: "5 mins ago",
      relevance: 88,
      answered: false,
      aiResponse: null,
    },
    {
      id: 3,
      text: "How does the virtual DOM work in React?",
      author: "Mike Johnson",
      time: "8 mins ago",
      relevance: 85,
      answered: false,
      aiResponse: null,
    },
  ]);

  const relatedQuestions = [
    { text: "What are the SOLID principles in OOP?", relevance: 95 },
    { text: "How does inheritance work in Java?", relevance: 88 },
    { text: "Can you explain method overloading?", relevance: 82 },
  ];

  const toggleAnswered = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answered: !q.answered } : q
      )
    );
  };

  const generateAIResponse = (id) => {
    const aiResponses = {
      1: "Polymorphism in OOP allows objects of different classes to be treated as objects of a common base class...",
      2: "REST APIs follow a resource-based architecture with standard HTTP methods...",
      3: "The Virtual DOM is a lightweight copy of the actual DOM...",
    };

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id
          ? { ...q, aiResponse: aiResponses[id] || "AI response not available." }
          : q
      )
    );
  };

  return (
    <div className="container3">
      {/* Left Section */}
      <div className="section">
        <h2>
          Students <span className="student-count">{questions.length} Online</span>
        </h2>
        <ul className="student-list">
          {["John Doe", "Sarah Smith", "Mike Johnson"].map((student, index) => (
            <li key={index} className="student-item">
              <span className="student-status"></span>
              {student}
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Section */}
      <div className="section">
        <h2>Current Questions</h2>
        <div>
          {questions.map((q) => (
            <div key={q.id} className={`question-card ${q.answered ? 'answered' : ''}`}>
              <p>{q.text}</p>
              <div className="question-meta">
                <span>Asked by {q.author} • {q.time}</span>
                <span className="relevance-score">{q.relevance}% Relevant</span>
              </div>
              <div className="question-actions">
                <button className="btn" onClick={() => toggleAnswered(q.id)}>
                  {q.answered ? 'Mark as Pending' : 'Mark as Answered'}
                </button>
                <button className="btn btn-secondary" onClick={() => generateAIResponse(q.id)}>
                  Generate AI Answer
                </button>
              </div>
              {q.aiResponse && (
                <div className="ai-response">
                  {q.aiResponse}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="section">
        <h2>Related Questions</h2>
        <div>
          {relatedQuestions.map((rq, index) => (
            <div key={index} className="question-card">
              <p>{rq.text}</p>
              <div className="question-meta">
                <span className="relevance-score">{rq.relevance}% Relevant</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherMeetingDashboard;
