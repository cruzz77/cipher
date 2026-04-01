import axios from 'axios';
import { buildMedicalExtractionPrompt } from '../utils/promptBuilder.js';


const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const analyzeConversation = async (text) => {
    const API_KEY = process.env.GROQ_API_KEY;
    if (!API_KEY) {
        throw new Error('API Key is not configured. Please check your .env file.');
    }

    const prompt = buildMedicalExtractionPrompt(text);

    try {
        const response = await axios.post(
            API_URL,
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0
            },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content = response.data.choices[0].message.content;
        let jsonString = content.trim();
        if (jsonString.startsWith('Assistant:')) {
            jsonString = jsonString.replace('Assistant:', '').trim();
        }

        if (!jsonString.startsWith('{')) {
            jsonString = '{' + jsonString;
        }

        try {
            return JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse LLM response as JSON:', content);
            throw new Error('LLM returned invalid JSON structure.');
        }
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
            throw new Error(`API Error: ${error.response.data.error?.message || 'Unknown error'}`);
        }
        throw error;
    }
};

