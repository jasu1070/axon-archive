
import { GoogleGenAI } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getMarketInsights = async (query: string): Promise<AIResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Search for current market trends, reviews, and real-time availability for this type of product: ${query}. 
                 Provide a concise, helpful summary for a shopper. If there are specific recent models mentioned in the news, include them.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I couldn't find specific insights right now.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      sources: sources.filter(chunk => chunk.web).map(chunk => chunk.web as any)
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "Sorry, I'm having trouble connecting to my research modules. Please try again later.",
      sources: []
    };
  }
};
