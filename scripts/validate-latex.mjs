import katex from 'katex';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseMathText } from '../src/lib/mathText.js';

export const EXPECTED_QUESTION_COUNT = 356;

// Math covers operators, relations, sets, roots, sums, integrals and letterlike
// alphabets. Modifier letters also cover superscripts outside U+2070–U+209F.
// Add non-Math fractions/primes/overbars and the remaining Unicode arrow blocks.
const UNICODE_MATH = /[\p{Math}\p{Script=Greek}\p{Lm}ª¯°²³µ·¹º¼-¾̸̲̳̄̅′-‷⁗⁰-₟⃐-⃯⅐-↏←-⇿⏨✕✖✚➕-➗⟰-⟿⤀-⥿⬀-⬑⬰-⭌⭠-⮹\u{1F800}-\u{1F8FF}]/gu;

export function findUnicodeMath(text) {
  return Array.from(text.matchAll(UNICODE_MATH))
    .filter((match) => {
      if (match[0].codePointAt(0) <= 0x7f) return false;
      // French “n° 3” is a prose abbreviation, not an unwrapped degree expression.
      return !(match[0] === '°' && /(?:^|[^\p{L}\p{N}_])[nN]$/u.test(text.slice(0, match.index)));
    })
    .map((match) => ({ character: match[0], offset: match.index }));
}

export function validateLatexField(text) {
  const { segments, errors: parseErrors, delimiterCounts } = parseMathText(text);
  const errors = parseErrors.map(({ message }) => message);
  const expressionCounts = { inline: 0, display: 0 };

  for (const type of ['inline', 'display']) {
    if (delimiterCounts[type] % 2 !== 0) {
      errors.push(`Odd ${type} delimiter count: ${delimiterCounts[type]}`);
    }
  }

  const unwrapped = new Map();
  for (const segment of segments) {
    if (segment.type === 'text') {
      for (const match of findUnicodeMath(segment.raw)) {
        if (!unwrapped.has(match.character)) {
          unwrapped.set(match.character, segment.start + match.offset);
        }
      }
      continue;
    }

    expressionCounts[segment.type]++;
    try {
      katex.renderToString(segment.value, {
        displayMode: segment.type === 'display',
        throwOnError: true,
        trust: false,
        output: 'htmlAndMathml',
      });
    } catch (error) {
      errors.push(`Invalid ${segment.type} LaTeX at offset ${segment.start} in ${JSON.stringify(segment.raw)}: ${error.message}`);
    }
  }

  if (unwrapped.size) {
    const characters = Array.from(unwrapped, ([character, offset]) =>
      `${JSON.stringify(character)} (U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}, offset ${offset})`);
    errors.push(`Unicode math outside $/$$ delimiters: ${characters.join(', ')}`);
  }

  return { errors, delimiterCounts, expressionCounts };
}

/** Validate real records; an optional baseline allows isolated unit tests. */
export function validateQuestionBank(questions, backup) {
  const errors = [];
  const stats = {
    questions: Array.isArray(questions) ? questions.length : 0,
    fields: 0,
    inlineDelimiters: 0,
    displayDelimiters: 0,
    inlineExpressions: 0,
    displayExpressions: 0,
  };
  const issue = (bank, question, index, field, value, message) => {
    const context = field !== 'text' && !field.startsWith('options') && typeof question?.text === 'string'
      ? `\n  exact text: ${JSON.stringify(question.text)}` : '';
    errors.push(`[${bank} question ${question?.id ?? `at index ${index}`}] ${field}: ${message}\n  exact ${field}: ${JSON.stringify(value)}${context}`);
  };

  const validateRecords = (bank, records) => {
    if (!Array.isArray(records)) {
      errors.push(`[${bank} bank] ALL_QUESTIONS must be an array`);
      return;
    }
    if (records.length !== EXPECTED_QUESTION_COUNT) {
      errors.push(`[${bank} bank] Expected ${EXPECTED_QUESTION_COUNT} records, found ${records.length}`);
    }

    const ids = new Map();
    // Explicit indexing ensures a missing/sparse question record cannot be skipped.
    for (const [index, question] of records.entries()) {
      if (!question || typeof question !== 'object' || Array.isArray(question)) {
        issue(bank, question, index, 'record', question, 'Expected a question object');
        continue;
      }
      if (!Number.isInteger(question.id) || question.id < 1 || question.id > EXPECTED_QUESTION_COUNT) {
        issue(bank, question, index, 'id', question.id, `Expected an integer ID in 1..${EXPECTED_QUESTION_COUNT}`);
      }
      if (ids.has(question.id)) {
        issue(bank, question, index, 'text', question.text, `Duplicate ID ${question.id}; first appeared at index ${ids.get(question.id)}`);
      }
      ids.set(question.id, index);

      for (const field of ['category', 'text']) {
        if (typeof question[field] !== 'string') {
          issue(bank, question, index, field, question[field], 'Expected a string');
        }
      }
      if (!Array.isArray(question.options) || question.options.length !== 4) {
        issue(bank, question, index, 'options', question.options, 'Expected exactly four options');
      }
      if (Array.isArray(question.options)) {
        // Explicit indexing also rejects sparse arrays, rather than skipping holes.
        for (let optionIndex = 0; optionIndex < Math.max(4, question.options.length); optionIndex++) {
          if (typeof question.options[optionIndex] !== 'string') {
            issue(bank, question, index, `options[${optionIndex}]`, question.options[optionIndex], 'Expected a string');
          }
        }
      }
      if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
        issue(bank, question, index, 'correctIndex', question.correctIndex, 'Expected an integer correctIndex in 0..3');
      }
    }

    const missing = Array.from({ length: EXPECTED_QUESTION_COUNT }, (_, index) => index + 1)
      .filter((id) => !ids.has(id));
    if (missing.length) errors.push(`[${bank} bank] Missing question IDs: ${missing.join(', ')}`);
  };

  validateRecords('current', questions);
  if (backup !== undefined) validateRecords('backup', backup);

  if (Array.isArray(questions) && Array.isArray(backup)) {
    if (questions.length !== backup.length) {
      errors.push(`[comparison] Record count changed: backup ${backup.length}, current ${questions.length}`);
    }
    for (let index = 0; index < Math.min(questions.length, backup.length); index++) {
      const question = questions[index];
      const original = backup[index];
      for (const field of ['id', 'category', 'correctIndex']) {
        if (question?.[field] !== original?.[field]) {
          issue('current', question, index, 'text', question?.text,
            `${field} changed or record reordered at index ${index}: backup ${JSON.stringify(original?.[field])}, current ${JSON.stringify(question?.[field])}`);
        }
      }
    }
  }

  if (Array.isArray(questions)) {
    questions.forEach((question, index) => {
      if (!question || typeof question !== 'object') return;
      const fields = [['text', question.text]];
      if (Array.isArray(question.options)) {
        question.options.forEach((option, optionIndex) => fields.push([`options[${optionIndex}]`, option]));
      }
      for (const [field, value] of fields) {
        if (typeof value !== 'string') continue;
        const result = validateLatexField(value);
        stats.fields++;
        stats.inlineDelimiters += result.delimiterCounts.inline;
        stats.displayDelimiters += result.delimiterCounts.display;
        stats.inlineExpressions += result.expressionCounts.inline;
        stats.displayExpressions += result.expressionCounts.display;
        for (const error of result.errors) issue('current', question, index, field, value, error);
      }
    });
  }

  return { errors, stats };
}

async function main() {
  // Never read the compatibility reexport or a fixture instead of the real banks.
  const importErrors = [];
  const load = async (bank, importer) => {
    try {
      const module = await importer();
      if (!Array.isArray(module.ALL_QUESTIONS)) throw new Error('Missing ALL_QUESTIONS array export');
      return module.ALL_QUESTIONS;
    } catch (error) {
      importErrors.push(`[${bank}] Unable to import real question bank: ${error.message}`);
      return undefined;
    }
  };
  const [questions, backup] = await Promise.all([
    load('src/data/questions.ts', () => import('../src/data/questions.ts')),
    load('src/data/questions.backup.js', () => import('../src/data/questions.backup.js')),
  ]);
  const result = validateQuestionBank(questions, backup);
  const errors = [...importErrors, ...result.errors];
  const { stats } = result;

  console.log(`Checked ${stats.questions} questions, ${stats.fields} text/option fields; inline: ${stats.inlineDelimiters} delimiters / ${stats.inlineExpressions} expressions; display: ${stats.displayDelimiters} delimiters / ${stats.displayExpressions} expressions.`);
  if (errors.length) {
    for (const error of errors) console.error(error);
    console.error(`LaTeX validation failed: ${errors.length} error(s).`);
    process.exitCode = 1;
  } else {
    console.log(`LaTeX validation passed: ${EXPECTED_QUESTION_COUNT} records match the backup in order (IDs, categories, correctIndex); all options and math are valid.`);
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await main();
}
