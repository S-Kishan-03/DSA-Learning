'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
}

// Augment the window object
declare global {
  interface Window {
    hljs?: {
      highlightElement: (element: HTMLElement) => void;
    };
  }
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && window.hljs) {
      // Clean up previous highlighting if content changes
      const currentRef = codeRef.current;
      currentRef.removeAttribute('data-highlighted');
      currentRef.textContent = code;
      window.hljs.highlightElement(currentRef);
    }
  }, [code]);

  return (
    <pre className="bg-[#1e1e1e] p-4 rounded-md overflow-x-auto text-sm font-code">
      <code ref={codeRef} className={cn('language-', language)}>
        {code}
      </code>
    </pre>
  );
}
