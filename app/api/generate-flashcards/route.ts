import { generateFlashcardWithGroq } from "@/lib/langchain";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const flashcard = await generateFlashcardWithGroq(text);

    return NextResponse.json(flashcard);
  } catch (error) {
    console.error("Error generating flashcard:", error);
    return NextResponse.json(
      { error: "Error generating flashcard" },
      { status: 500 }
    );
  }
}
