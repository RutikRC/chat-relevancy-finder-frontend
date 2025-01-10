import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { useParams } from 'react-router-dom';
import { useGetRoomDetailsQuery } from '../store/store';
const TeachersMeetingDashboard = () => {
    const { id } = useParams();
    console.log("ID ", id);
    // State for tracking students, questions, and related questions
    const [students, setStudents] = useState([
        { name: 'John Doe', status: 'online' },
        { name: 'Sarah Smith', status: 'online' },
        { name: 'Mike Johnson', status: 'offline' },
    ]);
    const {data} = useGetRoomDetailsQuery({id: id});
    console.log("Room Details", data);
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

    const [relatedQuestions, setRelatedQuestions] = useState([
        { text: "What are the SOLID principles in OOP?", relevance: 95 },
        { text: "How does inheritance work in Java?", relevance: 88 },
        { text: "Can you explain method overloading?", relevance: 82 },
    ]);

    // Calculate student count
    const studentCount = students.filter(student => student.status === 'online').length;

    // Toggle question answered state
    const toggleAnswered = (id) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === id
                    ? { ...question, answered: !question.answered }
                    : question
            )
        );
    };

    // Generate AI response for a question
    const generateAIResponse = (id) => {
        const aiResponses = {
            1: "Polymorphism in OOP allows objects of different classes to be treated as objects of a common base class. It enables a single interface to represent different underlying forms (data types or classes). There are two types: compile-time (method overloading) and runtime (method overriding).",
            2: "REST APIs follow a resource-based architecture with standard HTTP methods, while GraphQL provides a single endpoint where clients can request specific data. GraphQL offers more flexibility in data fetching and reduces over-fetching/under-fetching of data.",
            3: "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by minimizing direct manipulation of the DOM. When state changes occur, React first updates the Virtual DOM, compares it with the previous version (diffing), and then efficiently updates only the necessary parts of the actual DOM.",
        };

        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === id
                    ? { ...question, aiResponse: aiResponses[id] }
                    : question
            )
        );
    };

    // Render the question cards
    const renderQuestionCard = (question) => (
        <div className={`question-card ${question.answered ? 'answered' : ''}`} key={question.id}>
            <p>{question.text}</p>
            <div className="question-meta">
                <span>Asked by {question.author} • {question.time}</span>
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
            {question.aiResponse && <div className="ai-response">{question.aiResponse}</div>}
        </div>
    );

    // Render related questions
    const renderRelatedQuestionCard = (question, index) => (
        <div className="question-card" key={index}>
            <p>{question.text}</p>
            <div className="question-meta">
                <span className="relevance-score">{question.relevance}% Relevant</span>
            </div>
        </div>
    );

    return (
        <div className="container5">
            {/* Left Section - Students */}
            <div className="section">
                <h2>
                    Students
                    <span className="student-count">{studentCount} Online</span>
                </h2>
                <ul className="student-list">
                    {students.map((student, index) => (
                        <li className="student-item" key={index}>
                            <span className="student-status"></span>
                            {student.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Section - Current Questions */}
            <div className="section">
                <h2>Current Questions</h2>
                <div id="currentQuestions">
                    {questions.map(renderQuestionCard)}
                </div>
            </div>

            {/* Right Section - Related Questions */}
            <div className="section">
                <h2>Related Questions</h2>
                <div id="relatedQuestions">
                    {relatedQuestions.map(renderRelatedQuestionCard)}
                </div>
            </div>
        </div>
    );
};

export default TeachersMeetingDashboard;
