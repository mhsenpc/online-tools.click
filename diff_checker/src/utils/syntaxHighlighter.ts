// Lightweight syntax highlighting utility
// Supports multiple languages with regex-based tokenization

export type Language =
  | 'javascript' | 'typescript' | 'python' | 'java' | 'c' | 'cpp' | 'csharp'
  | 'php' | 'ruby' | 'go' | 'rust' | 'sql' | 'json' | 'yaml' | 'xml'
  | 'html' | 'css' | 'markdown' | 'bash' | 'plaintext';

interface Token {
  type: 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'operator' | 'punctuation' | 'text';
  value: string;
}

const LANGUAGE_PATTERNS: Record<Language, { keywords: string[]; patterns: RegExp[] }> = {
  javascript: {
    keywords: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'finally', 'new', 'this', 'super', 'extends', 'typeof', 'instanceof'],
    patterns: [
      /\/\/.*$/gm, // single-line comments
      /\/\*[\s\S]*?\*\//g, // multi-line comments
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, // strings
      /\b\d+\.?\d*\b/g, // numbers
    ]
  },
  typescript: {
    keywords: ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'finally', 'new', 'this', 'super', 'extends', 'typeof', 'instanceof', 'interface', 'type', 'enum', 'namespace', 'public', 'private', 'protected', 'readonly'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  python: {
    keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'yield', 'async', 'await', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is'],
    patterns: [
      /#.*$/gm,
      /"""[\s\S]*?"""|'''[\s\S]*?'''/g,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  java: {
    keywords: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'super', 'void', 'int', 'String', 'boolean', 'try', 'catch', 'finally', 'throw', 'throws'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  c: {
    keywords: ['int', 'char', 'float', 'double', 'void', 'if', 'else', 'for', 'while', 'return', 'struct', 'typedef', 'sizeof', 'const', 'static', 'extern', 'include', 'define'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  cpp: {
    keywords: ['int', 'char', 'float', 'double', 'void', 'if', 'else', 'for', 'while', 'return', 'class', 'public', 'private', 'protected', 'virtual', 'namespace', 'using', 'template', 'typename', 'const', 'static', 'include', 'define'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  csharp: {
    keywords: ['public', 'private', 'protected', 'static', 'class', 'interface', 'namespace', 'using', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'void', 'int', 'string', 'bool', 'var', 'async', 'await', 'try', 'catch', 'finally'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  php: {
    keywords: ['function', 'class', 'if', 'else', 'for', 'while', 'return', 'public', 'private', 'protected', 'static', 'new', 'this', 'echo', 'var', 'array', 'true', 'false', 'null', 'try', 'catch', 'finally'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /#.*$/gm,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  ruby: {
    keywords: ['def', 'class', 'if', 'elsif', 'else', 'for', 'while', 'return', 'end', 'do', 'begin', 'rescue', 'ensure', 'module', 'require', 'include', 'attr_accessor', 'true', 'false', 'nil'],
    patterns: [
      /#.*$/gm,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  go: {
    keywords: ['package', 'import', 'func', 'type', 'struct', 'interface', 'if', 'else', 'for', 'return', 'var', 'const', 'defer', 'go', 'chan', 'select', 'case', 'default', 'break', 'continue'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  rust: {
    keywords: ['fn', 'let', 'mut', 'const', 'if', 'else', 'for', 'while', 'return', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'match', 'Some', 'None', 'Ok', 'Err'],
    patterns: [
      /\/\/.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  sql: {
    keywords: ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'NULL', 'PRIMARY', 'KEY', 'FOREIGN', 'INDEX'],
    patterns: [
      /--.*$/gm,
      /\/\*[\s\S]*?\*\//g,
      /'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  json: {
    keywords: ['true', 'false', 'null'],
    patterns: [
      /"(?:\\.|[^"\\])*"/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  yaml: {
    keywords: ['true', 'false', 'null', 'yes', 'no'],
    patterns: [
      /#.*$/gm,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  xml: {
    keywords: [],
    patterns: [
      /<!--[\s\S]*?-->/g,
      /<\/?[\w-]+(?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*\s*\/?>/g,
      /"[^"]*"|'[^']*'/g,
    ]
  },
  html: {
    keywords: [],
    patterns: [
      /<!--[\s\S]*?-->/g,
      /<\/?[\w-]+(?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*\s*\/?>/g,
      /"[^"]*"|'[^']*'/g,
    ]
  },
  css: {
    keywords: ['import', 'media', 'keyframes', 'from', 'to'],
    patterns: [
      /\/\*[\s\S]*?\*\//g,
      /"[^"]*"|'[^']*'/g,
      /#[0-9a-fA-F]{3,6}\b/g,
      /\b\d+\.?\d*(?:px|em|rem|%|vh|vw|pt)?\b/g,
    ]
  },
  markdown: {
    keywords: [],
    patterns: [
      /^#{1,6}\s.+$/gm,
      /\*\*.*?\*\*|__.*?__/g,
      /\*.*?\*|_.*?_/g,
      /`[^`]+`/g,
      /```[\s\S]*?```/g,
    ]
  },
  bash: {
    keywords: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'exit', 'export', 'source', 'alias'],
    patterns: [
      /#.*$/gm,
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,
      /\b\d+\.?\d*\b/g,
    ]
  },
  plaintext: {
    keywords: [],
    patterns: []
  }
};

export function detectLanguage(content: string): Language {
  const trimmed = content.trim();

  // JSON detection
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // Not valid JSON
    }
  }

  // HTML/XML detection
  if (trimmed.startsWith('<!DOCTYPE html') || trimmed.startsWith('<html')) return 'html';
  if (trimmed.startsWith('<?xml')) return 'xml';
  if (trimmed.match(/^<[\w-]+(?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'))?)*>/)) return 'xml';

  // Shebang detection
  if (trimmed.startsWith('#!/bin/bash') || trimmed.startsWith('#!/bin/sh')) return 'bash';
  if (trimmed.startsWith('#!/usr/bin/env python')) return 'python';
  if (trimmed.startsWith('#!/usr/bin/env node')) return 'javascript';

  // Extension-based hints or keywords
  if (content.includes('import React') || content.includes('from \'react\'')) return 'javascript';
  if (content.includes('interface ') && content.includes(': ')) return 'typescript';
  if (content.includes('def ') && content.includes(':')) return 'python';
  if (content.includes('<?php')) return 'php';
  if (content.includes('package ') && content.includes('func ')) return 'go';
  if (content.includes('fn ') && content.includes('->')) return 'rust';
  if (content.includes('public class ') && content.includes('static void')) return 'java';
  if (content.includes('SELECT ') && content.includes('FROM ')) return 'sql';
  if (content.includes('---\n') || content.match(/^\w+:\s*$/m)) return 'yaml';

  return 'plaintext';
}

export function highlightSyntax(code: string, language: Language): string {
  if (language === 'plaintext' || !code) {
    return escapeHtml(code);
  }

  const lang = LANGUAGE_PATTERNS[language];
  if (!lang) return escapeHtml(code);

  let highlighted = escapeHtml(code);

  // Apply patterns in order: comments, strings, numbers
  const replacements: Array<{ match: string; replacement: string }> = [];

  // Comments (should be first to avoid highlighting inside comments)
  highlighted = highlighted.replace(/&lt;!--[\s\S]*?--&gt;/g, (match) =>
    `<span class="syntax-comment">${match}</span>`
  );
  highlighted = highlighted.replace(/\/\/.*$/gm, (match) =>
    `<span class="syntax-comment">${match}</span>`
  );
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (match) =>
    `<span class="syntax-comment">${match}</span>`
  );
  highlighted = highlighted.replace(/#.*$/gm, (match) => {
    // Don't highlight if it's inside a span already or if it's a hex color
    if (match.match(/^#[0-9a-fA-F]{3,6}$/)) return match;
    return `<span class="syntax-comment">${match}</span>`;
  });

  // Strings
  highlighted = highlighted.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, (match) => {
    // Don't re-highlight if already in a span
    if (match.includes('<span')) return match;
    return `<span class="syntax-string">${match}</span>`;
  });

  // Numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, (match) => {
    if (match.includes('<span')) return match;
    return `<span class="syntax-number">${match}</span>`;
  });

  // Keywords
  lang.keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, (match, p1) => {
      if (match.includes('<span')) return match;
      return `<span class="syntax-keyword">${p1}</span>`;
    });
  });

  // Functions (basic detection)
  highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, (match, funcName) => {
    if (match.includes('<span')) return match;
    return `<span class="syntax-function">${funcName}</span>(`;
  });

  return highlighted;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
