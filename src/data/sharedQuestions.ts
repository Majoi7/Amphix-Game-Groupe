// Shared question data - questions without correct answers
// Safe to bundle with frontend as it doesn't contain answers
//
// Imports the `.ts` source explicitly. The bare `./questions` specifier used to
// resolve to the stale `src/data/questions.js` duplicate (Vite prefers `.js`
// over `.ts`), which is why the app only ever saw 66 of the 356 questions and
// the admin panel only listed 3 of the 6 categories.
import { ALL_QUESTIONS } from './questions';

export const SHARED_QUESTIONS = ALL_QUESTIONS.map(({ correctIndex, ...questionWithoutAnswer }) => questionWithoutAnswer);

// Helper to get available categories
export const getAvailableCategories = () => {
  return Array.from(new Set(SHARED_QUESTIONS.map((q: any) => q.category)));
};