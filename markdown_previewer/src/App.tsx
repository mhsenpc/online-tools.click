import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import 'prismjs/themes/prism-tomorrow.min.css';
import Prism from 'prismjs';

// Load Prism languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

// Configure Marked
marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: (code, lang) => {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  },
});

function App() {
  const [markdown, setMarkdown] = useState<string>(
    localStorage.getItem('markdown_content') || '# Hello World\n\nWelcome to the Markdown Editor.'
  );
  const [html, setHtml] = useState<string>('');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const cleanHTML = DOMPurify.sanitize(marked.parse(markdown) as string);
    setHtml(cleanHTML);
    localStorage.setItem('markdown_content', markdown);
    Prism.highlightAll();
  }, [markdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        insertAtCursor('**', '**');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        insertAtCursor('_', '_');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        insertAtCursor('[', '](https://)');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const insertAtCursor = (prefix: string, suffix: string = '') => {
    if (!editorRef.current) return;
    const { selectionStart, selectionEnd, value } = editorRef.current;
    const before = value.substring(0, selectionStart);
    const after = value.substring(selectionEnd);
    const selection = value.substring(selectionStart, selectionEnd);
    
    setMarkdown(before + prefix + selection + suffix + after);
    
    setTimeout(() => {
        if (editorRef.current) {
            editorRef.current.focus();
            const newCursorPos = selectionStart + prefix.length + selection.length + suffix.length;
            editorRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
    }, 0);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h1 className="font-bold text-lg">Markdown Editor</h1>
        <button 
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
        >
          Toggle Theme
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 border-r border-gray-200 dark:border-gray-800 flex flex-col">
          <textarea
            ref={editorRef}
            className="flex-1 p-6 w-full h-full resize-none bg-white dark:bg-gray-800 outline-none font-mono text-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <div 
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
