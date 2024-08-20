"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { BarChart3, Edit, FileQuestion, PlusCircle, Repeat } from 'lucide-react';
import { Flashcard } from '@/app/dashboard/page';
import axios from 'axios';

interface newFlashCardsProps {
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
  setEditingCard: (card: Flashcard) => void;
}

const NewFlashCards = ({flashcards, setFlashcards, setEditingCard}: newFlashCardsProps) => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({

  });
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnswerSelection = (cardId: string, selectedAnswer: string) => {
    setUserAnswers((prev) => ({ ...prev, [cardId]: selectedAnswer }));
    setFlipped((prev) => ({ ...prev, [cardId]: true }));
  };

  const retryQuestion = (cardId: string) => {
    setUserAnswers((prev) => ({ ...prev, [cardId]: "" }));
    setFlipped((prev) => ({ ...prev, [cardId]: false }));
  };

  const flipCard = (cardId: string) => {
    setFlipped((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
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

      // add to existing cards
      setFlashcards([...flashcards, ...generatedFlashcards]);
    } catch (error) {
      alert("An error occurred while generating flashcards. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditCard = (card: Flashcard) => {
    setEditingCard(card);
  };
  return (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="col-span-1 lg:col-span-2 border-t-4 border-indigo-500 bg-white">
        <CardHeader className="bg-indigo-50">
          <CardTitle className="text-xl font-semibold text-indigo-700">
            Generate New Flashcards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here to generate flashcards..."
            className="mb-4 h-40 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Button
            onClick={handleGenerateFlashcards}
            disabled={isGenerating}
            className="w-full flex justify-center bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
          >
            {isGenerating ? "Generating..." : "Generate Flashcards"}
            <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-purple-500 bg-white">
        <CardHeader className="bg-purple-50">
          <CardTitle className="text-xl font-semibold text-purple-700 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-purple-700" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="my-4 flex items-center justify-center flex-col">
          <p className="text-gray-600 text-sm">Total Flashcards</p>
          <p className="text-2xl font-bold">{flashcards.length}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Your Flashcards</h2>
      <div className="grid grid-cols-12 gap-6 auto-rows-fr">
{flashcards.length === 0 ? (
<div className="w-full h-56 col-span-12 flex items-center justify-center bg-white border-t-4 border-indigo-500 p-8 rounded-lg flex-col gap-5">
  <FileQuestion className="h-12 w-12 text-indigo-500" />
<p className="text-lg text-gray-600">You don&apos;t have any flashcards yet. Generate some above!</p>
</div>
) : flashcards?.map((card, index) => (
<div
key={card.id || index}
className="relative w-full flex col-span-12 md:col-span-6 lg:col-span-4"
>
<div
className={`w-full transition-transform duration-500 transform-style-preserve-3d flex ${
  flipped[card.id || index.toString()] ? "rotate-y-180" : ""
}`}
>
{flipped[card.id || index.toString()] ? (
  <Card
    className={` w-full h-full border-t-4 transform rotate-y-180 hover:shadow-lg transition-shadow duration-300 flex flex-col ${
      userAnswers[card.id || index.toString()] ===
      card.correctAnswer
        ? "bg-green-100 border-green-500"
        : "bg-red-100 border-red-500"
    }`}
  >
    <CardHeader>
      <CardTitle
        className={`text-lg ${
          userAnswers[card.id || index.toString()] ===
          card.correctAnswer
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        {userAnswers[card.id || index.toString()] ===
        card.correctAnswer
          ? "Correct!"
          : "Incorrect"}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 flex flex-col justify-between grow">
      <div>
        <p className="font-medium mb-2">Correct Answer:</p>
        <p
          className={`${
            userAnswers[card.id || index.toString()] ===
            card.correctAnswer
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {card.correctAnswer}
        </p>
      </div>
      <div className="flex justify-center mt-auto">
        <Button
          size="sm"
          className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            retryQuestion(card.id || index.toString());
          }}
        >
          <Repeat className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    </CardContent>
  </Card>
) : (
  <Card
    className="w-full  bg-white border-t-4 border-indigo-500 hover:shadow-lg transition-shadow duration-300 flex flex-col"
  >
    <CardHeader className="bg-indigo-50">
      <CardTitle className="text-lg text-indigo-700 flex justify-between gap-2 items-center">
        {card.topic}
        <Edit className="ml-2 h-4 w-4 cursor-pointer" onClick={() => handleEditCard(card)} />
      </CardTitle>

    </CardHeader>
    <CardContent className="p-4 flex flex-col justify-between grow">
      <p className="font-medium mb-4">{card.question}</p>
      <div className="flex flex-col justify-center">
        {card.options.map((answer, i) => (
          <div
            key={i}
            className="m-1 p-4 rounded-md text-sm cursor-pointer bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-300"
            onClick={() =>
              handleAnswerSelection(card.id || index.toString(), answer)
            }
          >
            {answer}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)}
</div>
</div>
))}
</div>
    </div>
  </div>
  )
}

export default NewFlashCards
