import assert from 'node:assert/strict';
import test from 'node:test';
import { parseMathText } from './mathText.js';

const compact = (text) => parseMathText(text).segments.map(({ type, value }) => ({ type, value }));

test('mixed prose, inline and display math retain their order and exact source offsets', () => {
  const text = String.raw`Avant $\frac{1}{2}$ puis $$x^2+y^2=1$$ après.`;
  const parsed = parseMathText(text);
  assert.deepEqual(compact(text), [
    { type: 'text', value: 'Avant ' },
    { type: 'inline', value: String.raw`\frac{1}{2}` },
    { type: 'text', value: ' puis ' },
    { type: 'display', value: 'x^2+y^2=1' },
    { type: 'text', value: ' après.' },
  ]);
  assert.deepEqual(parsed.errors, []);
  assert.deepEqual(parsed.delimiterCounts, { inline: 2, display: 2 });
  assert.equal(parsed.segments.map(({ raw }) => raw).join(''), text);
  for (const segment of parsed.segments) {
    assert.equal(text.slice(segment.start, segment.end), segment.raw);
  }
});

test('escaped dollars remain literal prose and do not affect delimiter parity', () => {
  const text = String.raw`Prix \$5 et \$\$ ; $x+1$`;
  assert.deepEqual(compact(text), [
    { type: 'text', value: 'Prix $5 et $$ ; ' },
    { type: 'inline', value: 'x+1' },
  ]);
  assert.deepEqual(parseMathText(text).delimiterCounts, { inline: 2, display: 0 });
  assert.deepEqual(parseMathText(text).errors, []);
});

test('backslash parity distinguishes literal dollars from TeX delimiters', () => {
  const text = String.raw`pair \\$x$ et impair \\\$5`;
  assert.deepEqual(compact(text), [
    { type: 'text', value: String.raw`pair \\` },
    { type: 'inline', value: 'x' },
    { type: 'text', value: String.raw` et impair \\$5` },
  ]);
  assert.deepEqual(parseMathText(text).errors, []);
});

test('escaped dollars and row breaks inside math are passed to KaTeX unchanged', () => {
  const text = String.raw`$\text{prix }\$5$ et $$\begin{aligned}x&=1\\y&=2\end{aligned}$$`;
  const expressions = parseMathText(text).segments.filter(({ type }) => type !== 'text');
  assert.equal(expressions[0].value, String.raw`\text{prix }\$5`);
  assert.equal(expressions[1].value, String.raw`\begin{aligned}x&=1\\y&=2\end{aligned}`);
  assert.deepEqual(parseMathText(text).errors, []);
});

test('unmatched delimiters render literally while reporting an error', () => {
  for (const text of ['Avant $x+1', 'Avant $$x+1', '$x$$', '$$x$']) {
    const parsed = parseMathText(text);
    assert.ok(parsed.errors.length > 0, text);
    assert.equal(parsed.segments.map(({ raw }) => raw).join(''), text);
    assert.ok(parsed.segments.every(({ type }) => type === 'text'), text);
  }
});

test('mismatched delimiters are rejected even when each delimiter count is even', () => {
  const parsed = parseMathText('$x $$y$ z$$');
  assert.deepEqual(parsed.delimiterCounts, { inline: 2, display: 2 });
  assert.ok(parsed.errors.some(({ message }) => message.includes('Mismatched')));
});

test('later balanced math can recover after an unmatched opening delimiter', () => {
  const parsed = parseMathText('Avant $oops $$x^2$$ après');
  assert.ok(parsed.errors.length > 0);
  assert.deepEqual(parsed.segments.map(({ type, value }) => ({ type, value })), [
    { type: 'text', value: 'Avant $oops ' },
    { type: 'display', value: 'x^2' },
    { type: 'text', value: ' après' },
  ]);
});

test('empty expressions and invalid dollar runs stay literal rather than producing math', () => {
  for (const text of ['$ $', '$$ $$', '$$$x$$$', '$$$$', '$$$$$$']) {
    const parsed = parseMathText(text);
    assert.ok(parsed.errors.length > 0, text);
    assert.equal(parsed.segments.map(({ value }) => value).join(''), text);
    assert.ok(parsed.segments.every(({ type }) => type === 'text'), text);
  }
});

test('ordinary and empty prose are not interpreted as HTML or implicit math', () => {
  const text = '<img src=x onerror=alert(1)> & x² → α';
  assert.deepEqual(compact(text), [{ type: 'text', value: text }]);
  assert.deepEqual(parseMathText('').segments, []);
  assert.deepEqual(parseMathText().segments, []);
  assert.throws(() => parseMathText(123), TypeError);
});
