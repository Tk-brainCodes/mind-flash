import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  const { name, flashcards, userId } = await req.json();

  console.log("save flash card itemsa", name, flashcards, userId)

  if (!name || !flashcards || !userId) {
    return NextResponse.json("Missing required fields", { status: 400 });
  }

  try {
    const newSet = await db.flashcardSet.create({
      data: {
        name,
        userId,
        flashcards: {
          create: flashcards.map((card: any) => ({
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty,
            context: card.context,
            topic: card.topic,
            category: card.category,
            userId,
          })),
        },
      },
      include: {
        flashcards: true,
      },
    });

    res;
    NextResponse.json({ setId: newSet.id });
  } catch (error) {
    console.error("Error saving flashcards:", error);
    return NextResponse.json("Error saving flashcards", { status: 500 });
  }
}

export async function PATCH(req: Request, res: NextResponse) {
  const { id, ...updateData } = await req.json();

  console.log("update id from backend", id)

  if (!id) {
    return NextResponse.json("Flashcard ID is required", { status: 500 });
  }

  try {
    const updatedFlashcard = await db.flashcard.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      flashcard: updatedFlashcard,
    });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    NextResponse.json("Error updating flashcard", { status: 500 });
  }
}
