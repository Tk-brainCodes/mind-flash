"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Flashcard {
  id?: string;
  question: string;
  correctAnswer: string;
  answers: string[];
  difficulty: string;
  options: string[];
  context?: string;
  topic: string;
  category: string;
}

const FlashCards = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string | null>
  >({});
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<
    Record<string, boolean>
  >({});

  const router = useRouter();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAnswerSelection = (cardId: string, selectedAnswer: string) => {
    if (
      flashcards.some(
        (card) => card.id === cardId && card.correctAnswer === selectedAnswer
      )
    ) {
      // Correct answer selected
      setSelectedAnswers((prev) => ({ ...prev, [cardId]: selectedAnswer }));
      setShowCorrectAnswer((prev) => ({ ...prev, [cardId]: false }));
    } else {
      // Wrong answer selected
      setSelectedAnswers((prev) => ({ ...prev, [cardId]: selectedAnswer }));
      setShowCorrectAnswer((prev) => ({ ...prev, [cardId]: true }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGenerateFlashcards = async () => {
    if (!text) {
      alert("Please enter some text to generate flashcards");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axios.post("/api/generate-flashcards", { text });
      const generatedFlashcards = JSON.parse(response.data);
      console.log("generated flash cards", generatedFlashcards);

      setFlashcards((prevFlashcards) => [
        ...prevFlashcards,
        ...generatedFlashcards,
      ]);
    } catch (error) {
      alert("An error occurred while generating flashcards. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const retryQuestion = (cardId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [cardId]: "" }));
    setShowCorrectAnswer((prev) => ({ ...prev, [cardId]: false }));
  };

  const handleCardFlipped = (index: number) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name for this set of flashcards");
      return;
    }

    try {
      await axios.post("/api/flashcards", {
        name,
        flashcards,
        userId: user?.id,
      });
      handleClose();
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleEditCard = (card: Flashcard) => {
    setEditingCard(card);
  };

  const handleUpdateCard = async (updatedCard: Flashcard) => {
    try {
      const response = await axios.patch("/api/flashcards", updatedCard);
      setFlashcards(
        flashcards.map((card) =>
          card.id === updatedCard.id ? response.data.flashcard : card
        )
      );
      setEditingCard(null);
    } catch (error) {
      console.error("Error updating flashcard:", error);
      alert(
        "An error occurred while updating the flashcard. Please try again."
      );
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Please sign in to use this feature.</div>;
  }

  console.log("flashcards", flashcards);
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>AI-Powered Flashcards</h1>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Enter your text here to generate flashcards...'
        className='mb-4'
      />
      <Button onClick={handleGenerateFlashcards} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Flashcard"}
      </Button>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {flashcards.map((card: any, index) => (
            <Card key={card.id || index} className='cursor-pointer'>
              <CardHeader>
                <CardTitle>{card.topic}</CardTitle>
              </CardHeader>
              <CardContent className='p-4'>
                <p>
                  <strong>Question:</strong> {card.question}
                </p>

                {showCorrectAnswer[card.id || index] && (
                  <p className='text-green-500'>
                    <strong>Correct Answer:</strong> {card.correctAnswer}
                  </p>
                )}

                <div className='mt-4'>
                  {card.answers.map((answer: string, i: any) => (
                    <label key={i} className='block mb-2'>
                      <input
                        type='radio'
                        name={`answer-${card.id || index}`}
                        value={answer}
                        checked={selectedAnswers[card.id || index] === answer}
                        onChange={() =>
                          handleAnswerSelection(card.id || index, answer)
                        }
                        className='mr-2'
                      />
                      {answer}
                    </label>
                  ))}
                </div>

                {selectedAnswers[card.id || index] &&
                  selectedAnswers[card.id || index] !== card.correctAnswer && (
                    <div className='mt-4 text-red-500'>
                      <p>Incorrect! Please try again.</p>
                      <Button
                        onClick={() => retryQuestion(card.id || index)}
                        className='mt-2'
                      >
                        Retry
                      </Button>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
      </div>

      {flashcards.length > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='mt-4'>Save Flashcards</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Your Flashcards</DialogTitle>
            </DialogHeader>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter a name for this set of flashcards'
              className='mb-4'
            />
            <Button onClick={saveFlashCards}>Save</Button>
          </DialogContent>
        </Dialog>
      )}

      {editingCard && (
        <Dialog open={!!editingCard} onOpenChange={() => setEditingCard(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Flashcard</DialogTitle>
            </DialogHeader>
            <Textarea
              value={editingCard.question}
              onChange={(e) =>
                setEditingCard({ ...editingCard, question: e.target.value })
              }
              placeholder='Question'
              className='mb-2'
            />
            <Textarea
              value={editingCard.correctAnswer}
              onChange={(e) =>
                setEditingCard({
                  ...editingCard,
                  correctAnswer: e.target.value,
                })
              }
              placeholder='Answer'
              className='mb-2'
            />
            <Input
              value={editingCard.difficulty}
              onChange={(e) =>
                setEditingCard({ ...editingCard, difficulty: e.target.value })
              }
              placeholder='Difficulty'
              className='mb-2'
            />
            <Button onClick={() => handleUpdateCard(editingCard)}>
              Update Flashcard
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FlashCards;
