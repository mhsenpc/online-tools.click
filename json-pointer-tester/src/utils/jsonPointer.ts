/**
 * JSON Pointer implementation following RFC 6901
 * https://tools.ietf.org/html/rfc6901
 */

export interface PointerResult {
  value: any;
  path: string[];
  error?: string;
}

/**
 * Evaluate a JSON Pointer expression against a JSON object
 * @param pointer - The JSON Pointer string (e.g., "/users/0/name")
 * @param obj - The JSON object to evaluate against
 * @returns The result containing value, path, and optional error
 */
export function evaluateJsonPointer(pointer: string, obj: any): PointerResult {
  if (!pointer || pointer === '') {
    return { value: obj, path: [] };
  }

  if (!pointer.startsWith('/')) {
    return {
      value: null,
      path: [],
      error: 'JSON Pointer must start with "/"'
    };
  }

  try {
    const tokens = pointer.split('/').slice(1); // Remove empty first element
    const path: string[] = [];
    let current = obj;

    for (let token of tokens) {
      // Unescape special characters
      const unescaped = token
        .replace(/~1/g, '/')
        .replace(/~0/g, '~');

      path.push(unescaped);

      if (current === null || current === undefined) {
        return {
          value: null,
          path,
          error: `Cannot traverse through null/undefined at "${unescaped}"`
        };
      }

      if (Array.isArray(current)) {
        const index = parseInt(unescaped, 10);
        if (isNaN(index)) {
          return {
            value: null,
            path,
            error: `Array index must be a number, got "${unescaped}"`
          };
        }
        if (index < 0 || index >= current.length) {
          return {
            value: null,
            path,
            error: `Array index out of bounds: ${index}`
          };
        }
        current = current[index];
      } else {
        if (typeof current !== 'object') {
          return {
            value: null,
            path,
            error: `Cannot access property on primitive type at "${unescaped}"`
          };
        }
        if (!(unescaped in current)) {
          return {
            value: null,
            path,
            error: `Property "${unescaped}" not found`
          };
        }
        current = current[unescaped];
      }
    }

    return { value: current, path };
  } catch (error) {
    return {
      value: null,
      path: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Find all paths in a JSON object that match a partial pointer
 * @param partialPointer - A partial JSON Pointer (e.g., "/users")
 * @param obj - The JSON object to search
 * @returns Array of matching paths
 */
export function findMatchingPaths(partialPointer: string, obj: any): string[] {
  const result: string[] = [];

  if (!partialPointer || partialPointer === '') {
    return [''];
  }

  if (!partialPointer.startsWith('/')) {
    return result;
  }

  try {
    const tokens = partialPointer.split('/').slice(1);
    const paths = findAllPaths(obj);

    for (const path of paths) {
      const pathTokens = path.split('/').slice(1);
      if (tokens.every((token, i) => pathTokens[i] === token)) {
        result.push(path);
      }
    }
  } catch (error) {
    // Return empty array on error
  }

  return result;
}

/**
 * Get all possible paths in a JSON object
 */
function findAllPaths(obj: any, prefix: string = ''): string[] {
  if (obj === null || obj === undefined) {
    return [prefix];
  }

  if (typeof obj !== 'object') {
    return [prefix];
  }

  const paths: string[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const path = prefix + '/' + index;
      paths.push(...findAllPaths(item, path));
    });
  } else {
    Object.keys(obj).forEach(key => {
      const escapedKey = key
        .replace(/~/g, '~0')
        .replace(/\//g, '~1');
      const path = prefix + '/' + escapedKey;
      paths.push(...findAllPaths(obj[key], path));
    });
  }

  return paths.length > 0 ? paths : [prefix];
}

/**
 * Break down a JSON Pointer into components with explanations
 */
export function explainJsonPointer(pointer: string): Array<{
  token: string;
  unescaped: string;
  description: string;
}> {
  if (!pointer || pointer === '') {
    return [{ token: '', unescaped: '', description: 'Root object' }];
  }

  const tokens = pointer.split('/').slice(1);
  return tokens.map((token, index) => {
    const unescaped = token
      .replace(/~1/g, '/')
      .replace(/~0/g, '~');

    let description = '';
    if (index === 0) {
      description = `Access property "${unescaped}"`;
    } else {
      description = `Navigate to "${unescaped}"`;
    }

    if (!isNaN(parseInt(unescaped, 10))) {
      description = `Access array index ${unescaped}`;
    }

    return { token, unescaped, description };
  });
}
