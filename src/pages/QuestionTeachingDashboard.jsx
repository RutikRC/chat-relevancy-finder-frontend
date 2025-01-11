import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { useParams } from 'react-router-dom';
import { useGetRoomDetailsQuery } from '../store/store';
import { generateAIResponseForQuestion } from '../atoms/state';

const TeachersMeetingDashboard = () => {
    const { id } = useParams();
    console.log("ID ", id);

    const { data } = useGetRoomDetailsQuery({ id: id });
    console.log("Room Details", data);

    const [questions, setQuestions] = useState([]);
    console.log("questions", questions);
    const [answer, setAnswer] = useState();
    const [Id, setId] = useState();
    console.log("Questions answers", answer);
    // Initialize questions state based on room details (if available)
    useEffect(() => {
        if (data?.messages) {
            const initialQuestions = data.messages
                .filter(message => message.prediction !== "Spam")
                .map((message, index) => ({
                    id: index,
                    text: message.comment,
                    author: message.sender,
                    time: new Date(message.timestamp).toLocaleString(),
                    relevance: 100, // You can calculate or pass this as needed
                    answered: false, // Initially set to false, can be toggled
                    aiResponse: null, // Placeholder for AI response
                }));
            setQuestions(initialQuestions);
        }
    }, [data]);

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
    const generateAIResponse = async (id, question) => {
        try {
            // Fetch AI response
            console.log("ID for generate AI response", id);
            const response = await generateAIResponseForQuestion(question);
            console.log("real :", response);

            setAnswer(response);
            setId(id);
            return response;
        } catch (error) {
            console.error("Error generating AI response:", error.message);
        }
    };

    // Render the question cards
    const renderQuestionCard = (question, id) => (
        <div className={`question-card ${question.answered ? 'answered' : ''}`} key={question.id}>
            {/* <p>{id}</p> */}
            <p>{question.text}</p>
            {/* <p>{question.id}</p> */}
            <div className="question-meta">
                <span>Asked by {question.author} • {question.time}</span>
                <span className="relevance-score">{question.relevance}% Relevant</span>
            </div>
            <div className="question-actions flex flex-col">
                <div className='flex gap'>
                <button
                    className={`btn ${question.answered ? 'btn-secondary' : ''}`}
                    onClick={() => toggleAnswered(question.id)}
                >
                    {question.answered ? 'Mark as Pending' : 'Mark as Answered'}
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => generateAIResponse(question.id, question.text)}
                >
                    Generate AI Answer
                </button>
                </div>
                {question.id == Id ? <div style={{color: "white", fontSize: "14px", textAlign: "left "}}>{answer}</div> : <div></div>}
                
            </div>
            {/* Render AI response below the button if it exists */}
            {question.aiResponse && (
                <div className="ai-response">
                    <p><strong>AI Response:</strong></p>
                    <p>{question.aiResponse}</p>
                </div>
            )}
        </div>
    );

    // Function to extract unique usernames from messages
    const getUniqueUsers = () => {
        if (!data?.messages) return [];
        const uniqueUsernames = Array.from(new Set(data.messages.map(message => message.sender)));
        return uniqueUsernames.map(user => ({
            name: user,
            status: 'online', // Assuming all users from messages are online
        }));
    };

    // Extracted unique users
    const uniqueUsers = getUniqueUsers();

    return (
        <div className="container5">
            {/* Left Section - Students */}
            <div className="section">
                <h2>
                    Students
                    <span className="student-count">{uniqueUsers.length} Online</span>
                </h2>
                <ul className="student-list">
                    {uniqueUsers.map((user, index) => (
                        <li className="student-item" key={index}>
                            <span
                                className={`student-status ${
                                    user.status === 'online' ? 'online' : 'offline'
                                }`}
                            ></span>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Section - Current Questions */}
            <div className="section">
                <h2>Current Questions</h2>
                <div id="currentQuestions">
                    {questions?.map((question) => renderQuestionCard(question, question.id))}
                </div>
            </div>

            {/* Right Section - Related Questions */}
            <div className="section">
                <h2>Related Questions</h2>
                <div id="relatedQuestions">
                    {data?.messages
                        .filter(message => message.prediction !== "Spam")
                        ?.map((message, index) => (
                            <div className="question-card" key={index}>
                                <p>{message.comment}</p>
                                <div className="question-meta">
                                    <span className="relevance-score">100% Relevant</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TeachersMeetingDashboard;





