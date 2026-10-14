/// Server-only question data - source of truth for questions and answers
// This file should NEVER be bundled with the frontend

// Relative import on purpose: the `@/*` alias from tsconfig is NOT rewritten
// in the emitted JavaScript, so `@/src/data/questions.js` resolved to nothing
// once compiled and `node dist/server/src/index.js` crashed on startup.
// The relative depth is identical in source and in dist/, so one path works
// both under `tsx` and under `node`.
import { ALL_QUESTIONS } from '../../src/data/questions.js';

// Export the full questions with answers for server-only use
export const SERVER_QUESTIONS = ALL_QUESTIONS;

// Helper to get sanitized questions (without correct answers) for frontend
export const getSanitizedQuestions = () => {
  return SERVER_QUESTIONS.map(({ correctIndex, ...questionWithoutAnswer }) => questionWithoutAnswer);
};

// Helper to get a question by ID (for validation)
export const getQuestionById = (id: number) => {
  return SERVER_QUESTIONS.find(q => q.id === id);
};

// Helper to validate an answer
export const validateAnswer = (questionId: number, selectedOption: number): { isCorrect: boolean; correctIndex: number } => {
  const question = getQuestionById(questionId);
  if (!question) {
    throw new Error(`Question with ID ${questionId} not found`);
  }

  return {
    isCorrect: question.correctIndex === selectedOption,
    correctIndex: question.correctIndex
  };
};