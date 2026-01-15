
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
Siz "StudentsAi Assistant" - StudentsAi platformasining rasmiy aqlli yordamchisiz.
1. USLUB: O'ta qisqa, lo'nda va faqat kerakli ma'lumotni bering (Groq AI kabi tezkor va aniq).
2. VAZIFA: Foydalanuvchiga uning natijalari, ballari va o'qish jarayoni bo'yicha yordam berish.
3. TIL: Faqat o'zbek tili (Lotin).
4. TA'QIQLAR: Uzun gaplar, ortiqcha salom-alik va mavzudan tashqari muloqot.
`;

export const getStudentsAiResponse = async (userMessage: string, userData: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Foydalanuvchi: ${userData.full_name}, Balli: ${userData.score}, Ranki: ${userData.rank}. Savol: ${userMessage}`,
    config: { 
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.1, // Aniqlikni oshirish uchun
      maxOutputTokens: 200
    }
  });
  return response.text;
};

export const parseQuizWithAI = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Matnni testga aylantir: ${text}`,
    config: {
      systemInstruction: "JSON converter. Fields: question, options (A,B,C,D), correct_answer, explanation. Be concise.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.OBJECT,
                  properties: {
                    A: { type: Type.STRING },
                    B: { type: Type.STRING },
                    C: { type: Type.STRING },
                    D: { type: Type.STRING }
                  }
                },
                correct_answer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correct_answer"]
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
