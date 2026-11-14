import assert from 'node:assert/strict';
import test from 'node:test';
import {
  EXPECTED_QUESTION_COUNT,
  findUnicodeMath,
  validateLatexField,
  validateQuestionBank,
} from './validate-latex.mjs';

const fixture = () => Array.from({ length: EXPECTED_QUESTION_COUNT }, (_, index) => ({
  id: index + 1,
  category: `category_${index % 6}`,
  text: String.raw`Calculer $\frac{1}{2}$ puis $$\begin{aligned}x&=1\\y&=2\end{aligned}$$.`,
  options: ['$1$', '$2$', '$3$', 'Aucune réponse'],
  correctIndex: index % 4,
}));

test('validation accepts 356 ordered records and renders every inline/display expression', () => {
  const questions = fixture();
  const backup = structuredClone(questions);
  backup.forEach((question) => { question.text = 'Original uₙ'; });
  const { errors, stats } = validateQuestionBank(questions, backup);
  assert.deepEqual(errors, []);
  assert.deepEqual(stats, {
    questions: 356,
    fields: 1780,
    inlineDelimiters: 2848,
    displayDelimiters: 712,
    inlineExpressions: 1424,
    displayExpressions: 356,
  });
});

test('record order, IDs, categories and correctIndex must match the backup exactly', () => {
  const backup = fixture();
  const reordered = structuredClone(backup);
  [reordered[0], reordered[1]] = [reordered[1], reordered[0]];
  let result = validateQuestionBank(reordered, backup);
  assert.ok(result.errors.some((error) => error.includes('id changed or record reordered at index 0')));

  const modified = structuredClone(backup);
  modified[41].category = 'different';
  modified[72].correctIndex = (modified[72].correctIndex + 1) % 4;
  result = validateQuestionBank(modified, backup);
  assert.ok(result.errors.some((error) => error.includes('[current question 42]') && error.includes('category changed')));
  assert.ok(result.errors.some((error) => error.includes('[current question 73]') && error.includes('correctIndex changed')));
});

test('missing/duplicate IDs, wrong counts and malformed records are rejected', () => {
  const questions = fixture();
  questions[1].id = 1;
  questions.pop();
  questions[4].id = undefined;
  const { errors } = validateQuestionBank(questions);
  assert.ok(errors.some((error) => error.includes('Expected 356 records, found 355')));
  assert.ok(errors.some((error) => error.includes('Duplicate ID 1')));
  assert.ok(errors.some((error) => error.includes('Missing question IDs: 2, 5, 356')));
  assert.ok(errors.some((error) => error.includes('Expected an integer ID')));
  assert.ok(validateQuestionBank(null).errors.some((error) => error.includes('must be an array')));
});

test('both current and backup records require string fields, four options and an integer correctIndex', () => {
  const questions = fixture();
  questions[0].text = 9;
  questions[1].category = null;
  questions[2].options.pop();
  questions[3].options[1] = 1;
  questions[4].correctIndex = 4;
  questions[5].correctIndex = 1.5;
  const backup = fixture();
  backup[6].options = ['one'];
  const { errors } = validateQuestionBank(questions, backup);
  assert.ok(errors.some((error) => error.includes('[current question 1] text: Expected a string')));
  assert.ok(errors.some((error) => error.includes('[current question 2] category: Expected a string')));
  assert.ok(errors.some((error) => error.includes('[current question 3] options: Expected exactly four options')));
  assert.ok(errors.some((error) => error.includes('[current question 4] options[1]: Expected a string')));
  assert.ok(errors.some((error) => error.includes('[current question 5] correctIndex:')));
  assert.ok(errors.some((error) => error.includes('[current question 6] correctIndex:')));
  assert.ok(errors.some((error) => error.includes('[backup question 7] options: Expected exactly four options')));
});

test('sparse arrays cannot conceal a missing question or option', () => {
  const questions = fixture();
  delete questions[14];
  delete questions[15].options[2];
  const { errors } = validateQuestionBank(questions);
  assert.ok(errors.some((error) => error.includes('at index 14] record: Expected a question object')));
  assert.ok(errors.some((error) => error.includes('Missing question IDs: 15')));
  assert.ok(errors.some((error) => error.includes('[current question 16] options[2]: Expected a string')));
});

test('delimiter validation rejects mismatched/unclosed runs, even with even parity', () => {
  for (const text of ['$x', '$$x', '$x$$', '$$x$', '$x $$y$ z$$', '$$$x$$$', '$ $']) {
    assert.ok(validateLatexField(text).errors.length > 0, text);
  }
  assert.ok(validateLatexField('$x').errors.some((error) => error.includes('Odd inline delimiter count')));
  assert.ok(validateLatexField('$$x').errors.some((error) => error.includes('Odd display delimiter count')));
  assert.deepEqual(validateLatexField(String.raw`Prix \$5 et $x+1$`).errors, []);
});

test('strict KaTeX errors report question ID and the exact text or option source', () => {
  const questions = fixture();
  questions[41].options[2] = String.raw`Résultat $\frac{1}{$`;
  questions[8].text = 'Question avec $x';
  const { errors } = validateQuestionBank(questions);
  assert.ok(errors.some((error) => error.includes('[current question 42] options[2]')
    && error.includes('Invalid inline LaTeX')
    && error.includes(`exact options[2]: ${JSON.stringify(questions[41].options[2])}`)));
  assert.ok(errors.some((error) => error.includes('[current question 9] text')
    && error.includes(`exact text: ${JSON.stringify(questions[8].text)}`)));
});

test('Unicode math outside delimiters includes superscripts, subscripts, Greek, sets, operators, arrows and complements', () => {
  const symbols = [
    '²', '³', '¹', '⁰', 'ⁱ', 'ⁿ', '₀', 'ₙ', 'ᵃ', 'ᶿ', 'ᵦ',
    'α', 'β', 'Γ', 'ϑ', 'ℝ', 'ℕ', '𝔸', '∀', '∅', '∈', '∪', '∩',
    '∑', '∏', '∫', '√', '→', '⇒', '⟶', '⤇', '⬅', '≤', '≠', '≈',
    '∁', '¬', '∧', '⊕', '×', '÷', '−', '½', '′', 'ℓ', 'µ', '·', '°', '✕', '⏨', '̄', '̅', '⃗',
  ];
  for (const symbol of symbols) {
    assert.ok(findUnicodeMath(symbol).length > 0, `Not detected: ${symbol}`);
    assert.ok(validateLatexField(`Valeur ${symbol}`).errors.some((error) => error.includes('Unicode math outside')), symbol);
  }
  assert.deepEqual(findUnicodeMath('Énoncé français : À la première étape, x=1+2, n° 3.'), []);
  assert.deepEqual(validateLatexField('Soit $α + β ≤ 2$ dans $ℝ$.').errors, []);
});
