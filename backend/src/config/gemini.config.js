import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

// create a instance of gemini
export const gemini = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})
