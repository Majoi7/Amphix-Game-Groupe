import React, { memo, useMemo } from 'react';
import katex from 'katex';
import { parseMathText } from '../lib/mathText.js';
import 'katex/dist/katex.min.css';
import './MathText.css';

/** @param {{ text?: string, className?: string }} props */
function MathText({ text = '', className = '' }) {
  const segments = useMemo(() => parseMathText(text).segments.map((segment) => {
    if (segment.type === 'text') return segment;
    try {
      return {
        ...segment,
        html: katex.renderToString(segment.value, {
          displayMode: segment.type === 'display',
          throwOnError: false,
          trust: false,
          output: 'htmlAndMathml',
        }),
      };
    } catch {
      // Unexpected renderer failures must not prevent a question from displaying.
      return { ...segment, type: 'text', value: segment.raw };
    }
  }), [text]);

  return (
    <span className={`math-text${className ? ` ${className}` : ''}`}>
      {segments.map((segment) => segment.type === 'text'
        ? <React.Fragment key={segment.start}>{segment.value}</React.Fragment>
        : (
          <span
            key={segment.start}
            className={`math-text__math math-text__math--${segment.type}`}
            // Only KaTeX's untrusted, escaped output is HTML; prose is always React text.
            dangerouslySetInnerHTML={{ __html: segment.html }}
          />
        ))}
    </span>
  );
}

export default memo(MathText);
