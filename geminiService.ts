
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
Siz StudentsAi platformasining aqlli yordamchisiz. 
1. Muloqot uslubi: Qisqa, lo'nda, do'stona va motivatsion. 
2. Vazifa: Foydalanuvchiga ballari, natijalari haqida ma'lumot berish va o'qishda maslahatlar berish. 
3. Til: Faqat o'zbek tilida, imlo xatolarisiz javob bering.
`;

export const getStudentsAiAssistantResponse = async (userMessage: string, userData: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Foydalanuvchi ma'lumotlari: ${JSON.stringify(userData)}. Savol: ${userMessage}`,
    config: { 
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7
    }
  });
  return response.text;
};

export const parseQuizWithAI = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Matnni testga aylantir: ${text}`,
    config: {
      systemInstruction: "Strict JSON converter. Use fields: question, options (A,B,C,D), correct_answer, explanation.",
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
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
