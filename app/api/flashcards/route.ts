import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request, res: NextResponse) {
  const { name, flashcards } = await req.json();
  const { userId } = auth();
  const user = await currentUser();

  if (!name || !flashcards || !userId) {
    return NextResponse.json("Missing required fields", { status: 400 });
  }

  try {
    // Check if the user exists in the database
    let existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    // If the user doesn't exist, create a new user
    if (!existingUser) {
      existingUser = await db.user.create({
        data: {
          id: userId,
          email: user?.emailAddresses[0]?.emailAddress || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    // Proceed with creating the flashcard set
    const newSet = await db.flashcardSet.create({
      data: {
        name,
        userId,
        flashcards: {
          create: flashcards.map((card: any) => ({
            question: card.question,
            answer: card.answers,
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

    return NextResponse.json({ setId: newSet.id });
  } catch (error) {
    console.error("Error saving flashcards:", error);
    return NextResponse.json("Error saving flashcards", { status: 500 });
  }
}

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json("User not authenticated", { status: 401 });
  }

  try {
    // Fetch flashcard sets for the authenticated user
    const flashcardSets = await db.flashcardSet.findMany({
      where: {
        userId: userId,
      },
      include: {
        flashcards: true,
      },
    });

    // If no flashcards are found, return an empty array
    if (!flashcardSets || flashcardSets.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Return the flashcard sets with their flashcards
    return NextResponse.json(flashcardSets, { status: 200 });
  } catch (error) {
    console.error("Error retrieving flashcards:", error);
    return NextResponse.json("Error retrieving flashcards", { status: 500 });
  }
}

export async function PATCH(req: Request, res: NextResponse) {
  const { id, ...updateData } = await req.json();

  console.log("update id from backend", id);

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
