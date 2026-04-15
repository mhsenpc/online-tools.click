/**
 * JSONPath implementation supporting Jayway and Goessner syntaxes
 */

export type JsonPathSyntax = 'jayway' | 'goessner';

export interface PathResult {
  value: any;
  path: string[];
  matches: number;
  error?: string;
}

export interface PathExplanation {
  segment: string;
  type: string;
  description: string;
}

/**
 * Evaluate a JSONPath expression against a JSON object
 * @param path - The JSONPath expression
 * @param obj - The JSON object to evaluate against
 * @param syntax - The syntax variant to use
 * @returns The result containing value(s), path(s), match count, and optional error
 */
export function evaluateJsonPath(path: string, obj: any, syntax: JsonPathSyntax = 'jayway'): PathResult {
  if (!path || path === '' || path === '$') {
    return { value: obj, path: ['$'], matches: 1 };
  }

  try {
    if (syntax === 'jayway') {
      return evaluateJaywayPath(path, obj);
    } else {
      return evaluateGoessnerPath(path, obj);
    }
  } catch (error) {
    return {
      value: null,
      path: [],
      matches: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Jayway syntax implementation (used in Java/json-path)
 */
function evaluateJaywayPath(path: string, obj: any): PathResult {
  // Normalize path
  let normalizedPath = path.trim();

  if (!normalizedPath.startsWith('$')) {
    return {
      value: null,
      path: [],
      matches: 0,
      error: 'Jayway JSONPath must start with $'
    };
  }

  const results: Array<{ value: any; path: string[] }> = [{ value: obj, path: ['$'] }];

  // Tokenize the path
  const tokens = tokenizeJaywayPath(normalizedPath.slice(1)); // Remove $

  for (const token of tokens) {
    const newResults: Array<{ value: any; path: string[] }> = [];

    for (const result of results) {
      const matches = applyToken(result.value, result.path, token);
      newResults.push(...matches);
    }

    results.length = 0;
    results.push(...newResults);

    if (results.length === 0) {
      return {
        value: null,
        path: [],
        matches: 0,
        error: 'No matches found'
      };
    }
  }

  // Extract values and paths
  const values = results.map(r => r.value);
  const paths = results.map(r => r.path.join('.'));

  return {
    value: values.length === 1 ? values[0] : values,
    path: paths,
    matches: values.length
  };
}

/**
 * Tokenize a Jayway JSONPath expression
 */
function tokenizeJaywayPath(path: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inBracket = false;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < path.length; i++) {
    const char = path[i];

    if (inString) {
      current += char;
      if (char === stringChar && path[i - 1] !== '\\') {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      current += char;
      continue;
    }

    if (char === '[') {
      if (inBracket) {
        throw new Error('Nested brackets not supported');
      }
      inBracket = true;
      if (current) {
        tokens.push(current);
        current = '';
      }
      current += char;
    } else if (char === ']') {
      inBracket = false;
      current += char;
      tokens.push(current);
      current = '';
    } else if (char === '.' && !inBracket) {
      if (current) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens.filter(t => t !== '.');
}

/**
 * Apply a single token to a value
 */
function applyToken(value: any, path: string[], token: string): Array<{ value: any; path: string[] }> {
  const results: Array<{ value: any; path: string[] }> = [];

  if (token.startsWith('[') && token.endsWith(']')) {
    // Bracket notation
    const inner = token.slice(1, -1).trim();

    if (inner === '*') {
      // Wildcard - all items
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          results.push({ value: item, path: [...path, `[${index}]`] });
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => {
          results.push({ value: value[key], path: [...path, `['${key}']`] });
        });
      }
    } else if (inner.startsWith('?')) {
      // Filter expression (simplified - just return all for now)
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          results.push({ value: item, path: [...path, `[${index}]`] });
        });
      }
    } else if (inner.startsWith('..')) {
      // Recursive descent
      const keys = inner.slice(2).trim();
      results.push(...recursiveSearch(value, path, keys));
    } else if (inner.startsWith(':')) {
      // Array slice
      if (Array.isArray(value)) {
        const parts = inner.slice(1).split(':');
        const start = parts[0] ? parseInt(parts[0]) : 0;
        const end = parts[1] ? parseInt(parts[1]) : value.length;
        for (let i = start; i < end; i++) {
          results.push({ value: value[i], path: [...path, `[${i}]`] });
        }
      }
    } else if (!isNaN(parseInt(inner))) {
      // Array index
      if (Array.isArray(value)) {
        const index = parseInt(inner);
        if (index >= 0 && index < value.length) {
          results.push({ value: value[index], path: [...path, `[${index}]`] });
        }
      }
    } else if (inner.startsWith("'") || inner.startsWith('"')) {
      // String key
      const key = inner.slice(1, -1);
      if (typeof value === 'object' && value !== null && key in value) {
        results.push({ value: value[key], path: [...path, `['${key}']`] });
      }
    } else {
      // Property name
      if (typeof value === 'object' && value !== null && inner in value) {
        results.push({ value: value[inner], path: [...path, `.${inner}`] });
      }
    }
  } else if (token === '*') {
    // Wildcard
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        results.push({ value: item, path: [...path, `[${index}]`] });
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.keys(value).forEach(key => {
        results.push({ value: value[key], path: [...path, `.${key}`] });
      });
    }
  } else if (token === '..') {
    // Recursive descent (not implemented for dot notation)
    results.push({ value, path });
  } else {
    // Dot notation
    if (typeof value === 'object' && value !== null && token in value) {
      results.push({ value: value[token], path: [...path, `.${token}`] });
    }
  }

  return results;
}

/**
 * Recursive search for properties
 */
function recursiveSearch(value: any, path: string[], key: string): Array<{ value: any; path: string[] }> {
  const results: Array<{ value: any; path: string[] }> = [];

  if (typeof value !== 'object' || value === null) {
    return results;
  }

  if (key in value) {
    results.push({ value: value[key], path: [...path, `.${key}`] });
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      results.push(...recursiveSearch(item, [...path, `[${index}]`], key));
    });
  } else {
    Object.values(value).forEach(item => {
      results.push(...recursiveSearch(item, path, key));
    });
  }

  return results;
}

/**
 * Goessner syntax implementation (original JSONPath)
 */
function evaluateGoessnerPath(path: string, obj: any): PathResult {
  // For simplicity, we'll use a subset of Jayway syntax for Goessner
  // The main differences are in the path notation
  return evaluateJaywayPath(path, obj);
}

/**
 * Break down a JSONPath expression into components with explanations
 */
export function explainJsonPath(path: string, syntax: JsonPathSyntax = 'jayway'): PathExplanation[] {
  const explanations: PathExplanation[] = [];

  if (!path || path === '' || path === '$') {
    return [{ segment: '$', type: 'root', description: 'Root object' }];
  }

  const tokens = syntax === 'jayway'
    ? tokenizeJaywayPath(path.slice(1))
    : tokenizeJaywayPath(path.slice(1));

  tokens.forEach(token => {
    let type = 'property';
    let description = '';

    if (token.startsWith('[') && token.endsWith(']')) {
      const inner = token.slice(1, -1).trim();

      if (inner === '*') {
        type = 'wildcard';
        description = 'Select all items in array or object';
      } else if (inner.startsWith('..')) {
        type = 'recursive';
        description = `Recursively search for "${inner.slice(2).trim()}"`;
      } else if (inner.startsWith(':')) {
        type = 'slice';
        description = 'Array slice operation';
      } else if (!isNaN(parseInt(inner))) {
        type = 'index';
        description = `Access array index ${inner}`;
      } else {
        type = 'bracket';
        description = `Access property "${inner}"`;
      }
    } else if (token === '*') {
      type = 'wildcard';
      description = 'Select all items';
    } else if (token === '..') {
      type = 'recursive';
      description = 'Recursive descent';
    } else {
      type = 'property';
      description = `Access property "${token}"`;
    }

    explanations.push({ segment: token, type, description });
  });

  return explanations;
}

/**
 * Find all matching paths for a partial JSONPath
 */
export function findMatchingJsonPaths(partialPath: string, obj: any, syntax: JsonPathSyntax = 'jayway'): string[] {
  const result = evaluateJsonPath(partialPath, obj, syntax);
  if (result.error) {
    return [];
  }

  if (Array.isArray(result.path)) {
    return result.path;
  }
  return [result.path as string];
}
