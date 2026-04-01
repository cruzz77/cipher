import { analyzeConversation } from '../services/llmService.js';

export const analyzeController = async (req, res) => {
    const { text } = req.body;

    // Input validation
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({
            error: 'Missing or invalid "text" field in request body.'
        });
    }

    try {
        console.log(`Analyzing text: "${text.substring(0, 50)}..."`);

        const result = await analyzeConversation(text);

        // Safety check for structured output fields
        const formattedResult = {
            symptoms: Array.isArray(result.symptoms) ? result.symptoms : [],
            duration: typeof result.duration === 'string' ? result.duration : '',
            medication: Array.isArray(result.medication) ? result.medication : [],
            notes: typeof result.notes === 'string' ? result.notes : ''
        };

        return res.status(200).json(formattedResult);
    } catch (error) {
        console.error('Analysis error:', error.message);

        const statusCode = error.message.includes('API Key') ? 501 : 500;
        return res.status(statusCode).json({
            error: 'Failed to analyze conversation.',
            details: error.message
        });
    }
};
