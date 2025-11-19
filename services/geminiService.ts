import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing from environment variables.");
        // We handle this gracefully in the UI, but logging here helps debugging
    }
    return new GoogleGenAI({ apiKey: apiKey });
};

export const generateAgentResponse = async (
    prompt: string, 
    previousContext: string = ""
): Promise<string> => {
    const client = getClient();
    try {
        // Using gemini-2.5-flash as requested for agentic tasks/demos
        // We will use thinkingConfig to simulate "Agent Reasoning" if supported or standard generation
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an expert "Agentic Coding" assistant. 
            
            Your goal is to demonstrate how an AI agent works. 
            When the user asks for code, do not just give the code.
            
            Format your response in two distinct sections:
            1. [PLAN]: Briefly explain your reasoning, what files you would touch, and the strategy (simulate an agent's thought process).
            2. [ACTION]: Provide the actual code or terminal command requested.
            
            Keep responses concise suitable for a demo presentation.
            
            Context so far: ${previousContext}
            
            User Request: ${prompt}`,
            config: {
               // We use a small thinking budget to demonstrate the capability without waiting too long
               thinkingConfig: { thinkingBudget: 1024 } 
            }
        });
        
        return response.text || "No response generated.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error: Unable to connect to the Agent. Please check your API configuration.";
    }
};
