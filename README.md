# AI-Powered Flashcard Application

## Overview

This AI-powered flashcard application leverages cutting-edge natural language processing to automatically generate study materials from any text input. Built with Next.js, TypeScript, and integrated with Groq AI, this app offers a modern, efficient way to create and study flashcards.

## Features

- **AI-Generated Flashcards**: Transform any text into a set of study-ready flashcards using advanced AI.
- **Customizable Content**: Edit AI-generated flashcards or create your own to tailor your study experience.
- **Spaced Repetition**: Utilize scientifically-proven spaced repetition techniques to optimize your learning and retention.
- **Progress Tracking**: Monitor your learning journey with comprehensive progress analytics.
- **User-Friendly Interface**: Enjoy a clean, intuitive design built with shadcn UI components.
- **Responsive Design**: Access your flashcards seamlessly across desktop and mobile devices.

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)
- [shadcn UI](https://ui.shadcn.com/)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/pro/)
- Langchain

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
git clone https://github.com/your-username/ai-flashcard-app.git
cd ai-flashcard-app
Copy
2. Install dependencies:
npm install
Copy
3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following variables:
```
DATABASE_URL="your-postgresql-connection-string"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
GOOGLE_API_KEY="your-groq-api-key"
Copy
```
4. Initialize Prisma and generate the client:
npx prisma generate
npx prisma db push
Copy
5. Run the development server:
`npm run dev`
Copy
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Sign up or log in to your account.
2. Navigate to the "Create Flashcards" section.
3. Enter text or paste content you want to study.
4. Click "Generate Flashcards" to let the AI create study materials.
5. Review, edit, or add to the generated flashcards as needed.
6. Save your flashcard set and start studying!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Google Gemini AI](https://deepmind.google/technologies/gemini/pro/) for powering the AI-generated flashcards
- [shadcn UI](https://ui.shadcn.com/) for the beautiful UI components


