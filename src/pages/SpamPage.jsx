import React from "react";

const CommentRelevancyTable = () => {
    const data = [
        {
            "comment": "What is the use of learning rate",
            "relevancyScore": 0.4731263816356659
        },
        {
            "comment": "whats partial derivative of loss function",
            "relevancyScore": 0.417471706867218
        },
        {
            "comment": "which loss function is mostly used\\",
            "relevancyScore": 0.3811797797679901
        },
        {
            "comment": "what is vanishing gradient problem",
            "relevancyScore": 0.32772359251976013
        },
        {
            "comment": "how do know the overfitting",
            "relevancyScore": 0.24688388407230377
        },
        {
            "comment": "what is the meaning of abstract model",
            "relevancyScore": 0.1269431859254837
        },
        {
            "comment": "How are you sir",
            "relevancyScore": 0.11247066408395767
        },
        {
            "comment": "which class it is",
            "relevancyScore": 0.10161466896533966
        },
        {
            "comment": "what are id in apis",
            "relevancyScore": 0.08519694209098816
        },
        {
            "comment": "what is apis",
            "relevancyScore": 0.05723315477371216
        },
        {
            "comment": "what is redius",
            "relevancyScore": 0.034356653690338135
        },
        {
            "comment": "is there extra class on sunday",
            "relevancyScore": -0.059424541890621185
        }
    ]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">
                Comment Relevancy Table
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Comment</th>
                            <th className="py-3 px-6 text-right">Relevancy Score</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-200`}
                            >
                                <td className="py-3 px-6 text-left">{item.comment}</td>
                                <td className="py-3 px-6 text-right">
                                    {item.relevancyScore.toFixed(4)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommentRelevancyTable;
