import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import test from 'node:test';

// Bundle the real JSX component in memory; CSS remains covered by the Vite build.
// This keeps the suite on the installed tools, without a DOM package or temp files.
const bundle = await build({
  entryPoints: [fileURLToPath(new URL('./MathText.jsx', import.meta.url))],
  bundle: true,
  write: false,
  platform: 'node',
  format: 'cjs',
  jsx: 'automatic',
  packages: 'external',
  external: ['*.css'],
});
const require = createRequire(import.meta.url);
const requireWithoutCss = (specifier) => specifier.endsWith('.css') ? {} : require(specifier);
const module = { exports: {} };
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(
  requireWithoutCss, module, module.exports,
);
const MathText = module.exports.default;
const render = (text, className) => renderToStaticMarkup(React.createElement(MathText, { text, className }));

const assertAccessibleMath = (html, count = 1) => {
  assert.equal((html.match(/class="katex-mathml"/g) || []).length, count);
  assert.equal((html.match(/<math\b/g) || []).length, count);
  assert.equal((html.match(/class="katex-html" aria-hidden="true"/g) || []).length, count);
};

test('MathText renders mixed inline/display math and optional classes with accessible MathML', () => {
  const html = render(String.raw`Avant $\frac{1}{2}$ puis $$x^2+y^2=1$$ après.`, 'answer flex-1');
  assert.ok(html.startsWith('<span class="math-text answer flex-1">Avant '));
  assert.ok(html.includes('math-text__math--inline'));
  assert.ok(html.includes('math-text__math--display'));
  assert.ok(html.endsWith(' après.</span>'));
  assertAccessibleMath(html, 2);
});

test('fractions, aligned systems, matrices and permutations render without KaTeX errors', () => {
  const expressions = [
    String.raw`$\frac{u_{n+1}}{u_n}$`,
    String.raw`$$\left\{\begin{aligned}x+y&=3\\2x-y&=0\end{aligned}\right.$$`,
    String.raw`$$\begin{pmatrix}1&2\\3&4\end{pmatrix}$$`,
    String.raw`$$\sigma=\begin{pmatrix}1&2&3\\2&3&1\end{pmatrix}$$`,
  ];
  for (const expression of expressions) {
    const html = render(expression);
    assert.ok(!html.includes('katex-error'), expression);
    assertAccessibleMath(html);
  }
});

test('MathText escapes prose as React text, including HTML and ampersands', () => {
  const html = render('<script>alert(1)</script> <img src=x onerror=alert(2)> & $x<y$');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(2)&gt; &amp; '));
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('<img'));
  assertAccessibleMath(html);
});

test('unclosed, mismatched and escaped dollars display gracefully as text', () => {
  for (const text of ['Prix $5', '$$x+1', '$x$$', '$$x$', '$$$x$$$']) {
    const html = render(text);
    assert.ok(!html.includes('class="katex"'), text);
    assert.ok(html.includes(text), text);
  }
  const escaped = render(String.raw`Prix \$5 et \$\$`);
  assert.equal(escaped, '<span class="math-text">Prix $5 et $$</span>');
});

test('malformed LaTeX does not throw, and trust-disabled commands cannot inject HTML', () => {
  const invalid = render(String.raw`Avant $\frac{1}{$ après`);
  assert.ok(invalid.includes('katex-error'));
  assert.ok(invalid.includes('Avant '));
  assert.ok(invalid.includes(' après'));

  for (const text of [
    String.raw`$\href{javascript:alert(1)}{clic}$`,
    String.raw`$\htmlClass{injected}{x}$`,
    String.raw`$\includegraphics{https://example.invalid/a.svg}$`,
  ]) {
    const html = render(text);
    assert.ok(!html.includes('<a '), text);
    assert.ok(!html.includes('<img'), text);
    assert.ok(!html.includes('class="injected"'), text);
  }
});

test('display math uses spans so the component remains valid inside paragraphs and buttons', () => {
  for (const parent of ['p', 'button']) {
    const html = renderToStaticMarkup(React.createElement(parent, null,
      React.createElement(MathText, { text: 'Avant $$x=1$$ après' })));
    assert.ok(html.startsWith(`<${parent}>`));
    assert.ok(!html.includes('<div'));
    assertAccessibleMath(html);
  }
});

test('empty and prose-only values render without math markup', () => {
  assert.equal(render(''), '<span class="math-text"></span>');
  assert.equal(renderToStaticMarkup(React.createElement(MathText)), '<span class="math-text"></span>');
  assert.equal(render('Texte ordinaire'), '<span class="math-text">Texte ordinaire</span>');
});
