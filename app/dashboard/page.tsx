"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderOpen, Save, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import NewFlashCards from "@/components/flash-cards/newflashcards";
import Unauthorized from "@/components/unathorized/unauthorized";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logo } from "@/assets";
import Image from "next/image";


export interface Flashcard {
  id?: string;
  question: string;
  correctAnswer: string;
  answers: string[];
  difficulty: string;
  options: string[];
  topic: string;
}

interface FlashcardSet {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  flashcards: Flashcard[];
}

const FlashCards = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [savedSets, setSavedSets] = useState<FlashcardSet[]>([]);
  const [viewSavedCards, setViewSavedCards] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const fetchSavedSets = async () => {
    try {
      const response = await axios.get("/api/flashcards");
      setSavedSets(response.data);
    } catch (error) {
      console.error("Error fetching saved sets:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchSavedSets();
    }
  }, [isLoaded, isSignedIn, saveCard]);

  const saveFlashCards = async () => {
    if (!name) {
      alert("Please enter a name for this set of flashcards");
      return;
    }

    try {
      setSaveCard(true);
      await axios.post("/api/flashcards", {
        name,
        flashcards,
      });
      setOpen(false);
      fetchSavedSets();
      toast.success("Flash card successfully saved");
      setSaveCard(false);
    } catch (error) {
      toast.error(
        `An error occurred while saving flashcards. Please try again. ${error}`
      );
    }
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
      toast.success("Flash card successfully updated");
    } catch (error) {
      toast.error(
        `An error occurred while updating the flashcard. Please try again: ${error}`
      );
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <Unauthorized />;
  }

  return (
    <>
      <ToastContainer />
      <div className='bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen'>
        <header className='bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-10'>
          <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
            <h1>
              <Link
                href={"/"}
                className='text-2xl flex items-center justify-center gap-x-2 font-bold tracking-tight'
              >
                <Image
                  src={Logo}
                  alt='mind-flash'
                  loading='lazy'
                  className='w-[25px] h-[25px]'
                />
                MindFlash
              </Link>
            </h1>
            <div className='flex items-center space-x-4'>
              <span className='text-white'>
                Welcome {user?.lastName || "User"}!
              </span>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </div>
        </header>

        <main className='container mx-auto px-4 py-8'>
          <div className='flex flex-wrap gap-3 justify-between mb-8'>
            <Button
              onClick={() => setViewSavedCards(false)}
              className={`${
                !viewSavedCards
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-indigo-500"
              } hover:bg-indigo-600 hover:text-white transition-colors duration-300`}
            >
              Create Flashcards
            </Button>
            <Button
              onClick={() => setViewSavedCards(true)}
              className={`${
                viewSavedCards
                  ? "bg-purple-500 text-white"
                  : "bg-white text-purple-500"
              } hover:bg-purple-600 hover:text-white transition-colors duration-300`}
            >
              <FolderOpen className='mr-2 h-4 w-4' /> View Saved Flashcards
            </Button>
          </div>

          {viewSavedCards ? (
            <div>
              <h2 className='text-2xl font-bold mb-6 text-indigo-700'>
                Your Saved Flashcard Sets
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {savedSets.map((set: any) => (
                  <Card
                    key={set.id}
                    className='hover:shadow-xl transition-shadow duration-300 border-t-4 border-indigo-500 bg-white'
                  >
                    <CardHeader className='bg-indigo-50'>
                      <CardTitle className='text-lg text-indigo-700'>
                        {set.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-4'>
                      <p className='text-gray-600'>
                        Flashcards: {set.flashcards.length}
                      </p>
                      <Button
                        size='sm'
                        className='mt-4 bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300'
                        onClick={() => setFlashcards(set.flashcards)}
                      >
                        Load Flashcards
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <NewFlashCards
              flashcards={flashcards}
              setFlashcards={setFlashcards}
              setEditingCard={setEditingCard}
            />
          )}

          {/* Save Flashcards Dialog */}
          {flashcards.length > 0 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className='mt-8 fixed bottom-8 right-8 shadow-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300'>
                  <Save className='mr-2 h-4 w-4' /> Save Flashcards
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-white'>
                <DialogHeader>
                  <DialogTitle className='text-indigo-700'>
                    Save Your Flashcards
                  </DialogTitle>
                </DialogHeader>
                <Textarea
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter a name for this set of flashcards'
                  className='mb-4 border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500'
                />
                <Button
                  onClick={saveFlashCards}
                  className='bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300'
                >
                  {saveCard ? "Saving" : "Save"}
                  {saveCard && (
                    <LoaderCircle className='animate-spin ml-2 h-4 w-4' />
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          )}
          {editingCard && (
            <Dialog
              open={!!editingCard}
              onOpenChange={() => setEditingCard(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Flashcard</DialogTitle>
                </DialogHeader>
                <h3>Question</h3>
                <Textarea
                  value={editingCard.question}
                  onChange={(e) =>
                    setEditingCard({ ...editingCard, question: e.target.value })
                  }
                  placeholder='Question'
                  className='mb-2'
                />
                {/* options as seperate fields */}
                <h3>Options</h3>
                {editingCard.options.map((option, i) => (
                  <Input
                    key={i}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editingCard.options];
                      newOptions[i] = e.target.value;
                      setEditingCard({ ...editingCard, options: newOptions });
                    }}
                    placeholder='Option'
                    className='mb-1'
                  />
                ))}
                <h3>Correct Answer</h3>
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
                <h3>Difficulty</h3>
                <Input
                  value={editingCard.difficulty}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      difficulty: e.target.value,
                    })
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
        </main>
      </div>
    </>
  );
};

export default FlashCards;
