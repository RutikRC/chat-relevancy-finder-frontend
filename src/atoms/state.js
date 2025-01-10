import * as yup from "yup";

export const categoryMasterSchema = yup.object().shape({
    question: yup.string(),
});

export const categoryMasterValues = {
    question: "",
};


import { GoogleGenerativeAI } from "@google/generative-ai";
// / Function to generate AI response
export const generateAIResponse = async (topic) => {
    // Initialize Google Generative AI client
    const API_KEY = "AIzaSyCfN_pDEb9TNp-0J173g92yyg9IAtZQVWo";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Define the prompt using the topic
    const prompt = `Generate suggestions or ideas related to the following topic: "${topic}"`;

    try {
        // Generate content using the API
        const result = await model.generateContent(prompt);
        const rawResponse = result?.response?.text();

        if (!rawResponse) {
            throw new Error("No response text received from Gemini API");
        }

        console.log("Raw Response from Gemini API:", rawResponse);
        return rawResponse; // Return the response text
    } catch (err) {
        console.error("Error handling Gemini API response:", err.message);
        return {
            message: "Error in processing Gemini API response.",
            error: err.message,
        };
    }
};
