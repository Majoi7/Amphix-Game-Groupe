/**
 * Parse only explicit $...$ / $$...$$ math, leaving prose for React to escape.
 * Offsets and raw text let the validator report the original field exactly.
 * An odd number of backslashes escapes a dollar; TeX escapes inside math stay intact.
 */
export function parseMathText(text = '') {
  if (typeof text !== 'string') {
    throw new TypeError('Math text must be a string');
  }

  const delimiters = [];
  const delimiterCounts = { inline: 0, display: 0 };
  const errors = [];

  for (let index = 0; index < text.length; index++) {
    if (text[index] !== '$') continue;

    let backslashes = 0;
    for (let before = index - 1; before >= 0 && text[before] === '\\'; before--) {
      backslashes++;
    }
    if (backslashes % 2 === 1) continue;

    let end = index + 1;
    while (text[end] === '$') end++;
    const length = end - index;
    delimiters.push({ index, end, length });

    if (length === 1) delimiterCounts.inline++;
    else if (length === 2) delimiterCounts.display++;
    else errors.push({ index, message: `Invalid dollar run at offset ${index}: use $...$ or $$...$$` });
    index = end - 1;
  }

  const segments = [];
  let proseStart = 0;
  const addProse = (end) => {
    if (end === proseStart) return;
    const raw = text.slice(proseStart, end);
    const value = raw.replace(/(\\+)\$/g, (match, backslashes) =>
      backslashes.length % 2 === 1 ? `${backslashes.slice(0, -1)}$` : match);
    segments.push({ type: 'text', value, raw, start: proseStart, end });
  };

  for (let index = 0; index < delimiters.length;) {
    const opening = delimiters[index];
    if (opening.length > 2) {
      index++;
      continue;
    }

    const closing = delimiters[index + 1];
    const marker = '$'.repeat(opening.length);
    if (!closing) {
      errors.push({ index: opening.index, message: `Unclosed ${marker} delimiter at offset ${opening.index}` });
      index++;
      continue;
    }
    if (closing.length !== opening.length) {
      errors.push({
        index: closing.index,
        message: `Mismatched delimiter at offset ${closing.index}: opened ${marker} at offset ${opening.index}, found ${'$'.repeat(closing.length)}`,
      });
      // Keep the unmatched opening literal, but still recover later valid math.
      index++;
      continue;
    }

    const value = text.slice(opening.end, closing.index);
    if (!value.trim()) {
      errors.push({ index: opening.index, message: `Empty ${marker} expression at offset ${opening.index}` });
      index += 2;
      continue;
    }

    addProse(opening.index);
    segments.push({
      type: opening.length === 2 ? 'display' : 'inline',
      value,
      raw: text.slice(opening.index, closing.end),
      start: opening.index,
      end: closing.end,
    });
    proseStart = closing.end;
    index += 2;
  }

  addProse(text.length);
  return { segments, errors, delimiterCounts };
}
