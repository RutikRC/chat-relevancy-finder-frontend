import React, { useState } from 'react';
import './questionDashboard.css';

const QuestionsDashboard = () => {
    // Initial State
    const [questions, setQuestions] = useState([
        { id: 1, text: "What is polymorphism in OOP?", author: "John Doe", time: "10:30 AM", relevance: 85, answered: false },
        { id: 2, text: "What are REST APIs vs GraphQL?", author: "Jane Smith", time: "10:45 AM", relevance: 78, answered: false },
        { id: 3, text: "Explain the Virtual DOM?", author: "Alice Johnson", time: "11:00 AM", relevance: 92, answered: true },
    ]);

    const [relatedQuestions] = useState([
        { text: "What are the SOLID principles in OOP?", relevance: 95 },
        { text: "How does inheritance work in Java?", relevance: 88 },
        { text: "Can you explain method overloading?", relevance: 82 },
    ]);

    // Toggle Answered Status
    const toggleAnswered = (id) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, answered: !q.answered } : q
            )
        );
    };

    // Generate AI Response
    const generateAIResponse = (id) => {
        alert(`AI response for question ${id} is being generated!`);
    };

    // Render Question Card
    const QuestionCard = ({ question }) => (
        <div className={`question-card ${question.answered ? 'answered' : ''}`}>
            <p>{question.text}</p>
            <div className="question-meta">
                <span>
                    Asked by {question.author} • {question.time}
                </span>
                <span className="relevance-score">{question.relevance}% Relevant</span>
            </div>
            <div className="question-actions">
                <button
                    className={`btn ${question.answered ? 'btn-secondary' : ''}`}
                    onClick={() => toggleAnswered(question.id)}
                >
                    {question.answered ? 'Mark as Pending' : 'Mark as Answered'}
                </button>
                <button className="btn btn-secondary" onClick={() => generateAIResponse(question.id)}>
                    Generate AI Answer
                </button>
            </div>
        </div>
    );

    // Render the Dashboard
    return (
        <div className="container2">
            {/* Middle Section - Current Questions */}
            <div className="section">
                <h2>Current Questions</h2>
                <div id="currentQuestions">
                    {questions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </div>
            </div>

            {/* Right Section - Relevant Questions */}
            <div className="section">
                <h2>Related Questions</h2>
                <div id="relatedQuestions">
                    {relatedQuestions.map((question, index) => (
                        <div className="question-card" key={index}>
                            <p>{question.text}</p>
                            <div className="question-meta">
                                <span className="relevance-score">{question.relevance}% Relevant</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionsDashboard;
