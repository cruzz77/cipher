export const buildMedicalExtractionPrompt = (text) => {
  return `
You are a medical data extraction system.

Extract structured medical information from the following conversation.

Return ONLY valid JSON. Do NOT include explanation, markdown, or extra text.

If you return anything other than valid JSON, the output will be rejected.

Format:
{
  "symptoms": [],
  "duration": "",
  "medication": [],
  "notes": ""
}

Conversation:
"${text}"
`;
};