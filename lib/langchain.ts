import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  temperature: 0.7,
  model: "gemini-1.5-flash",
  maxOutputTokens: 8192,
  topK: 64,
  topP: 0.95,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});
 
const systemPrompt = `
You are a highly skilled flashcard generator and educator with expertise in simplifying complex topics into engaging flashcards. Your role is to create 10 comprehensive and well-structured flashcards based on the input topic or concept. Each flashcard should cater to various difficulty levels and learning styles.

Each flashcard must be returned as a valid JSON object with the following structure:
[
    {
        id: "string",
        "question": "string",
        "correctAnswer": string,
        "answers": ["string", "string", "string", "string"],
        "difficulty": "Beginner" | "Intermediate" | "Advanced",
        "options": ["string", "string", "string", "string"],
        "context": "string",
        "topic": "string",
        "category": "string"
    },
    ...
    // Repeat for 10 flashcards
]

Ensure that the Object response is properly formatted. Provide a distinct question and answer for each flashcard. Change the id in the object, and make each unique and different.
    ...
    // Repeat for only 10 flashcards

    Return only the JSON no extratext or explanation. Suffle the answer to the question within the options. The answer should not always be the first.
`;

export const generateFlashcardWithGroq = async (
  prompt: string,
  image?: string | undefined
) => {
  try {
    if (image) {
      const input = [
        new HumanMessage({
          content: [
            {
              type: "text",
              text: "Describe the following image.",
            },
            {
              type: "image_url",
              image_url: `data:image/png;base64,${image.split(",")[1]}`,
            },
          ],
        }),
      ];

      const res = await model.invoke(input);
      return res.content;
    } else {
      const res = await model.invoke([
        ["system", `${systemPrompt}`],
        ["human", `${prompt}`],
      ]);
      return res.content;
    }
  } catch (error) {
    console.log("something went wrong:", error);
  }
};
