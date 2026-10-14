// STALE DUPLICATE - DO NOT ADD DATA HERE.
//
// This file used to hold its own copy of the question bank (only 66 of the 356
// questions). Because a bare `./questions` specifier resolves to `.js` before
// `.ts` by default, that truncated copy was silently used by the Vite bundle
// and by `tsx` in development.
//
// It is now a pure re-export of the TypeScript source of truth, so whichever
// file a resolver picks, it always gets the full dataset. `vite.config.ts`
// additionally prefers `.ts` first, and both build configs exclude this file.
//
// This file can safely be deleted.
export { ALL_QUESTIONS } from './questions.ts';
