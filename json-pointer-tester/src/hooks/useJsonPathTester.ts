import { useState, useEffect, useMemo } from 'react';
import { evaluateJsonPointer, explainJsonPointer } from '../utils/jsonPointer';
import { evaluateJsonPath, explainJsonPath, type JsonPathSyntax } from '../utils/jsonPath';

export type SyntaxMode = 'pointer' | 'path';

export type { JsonPathSyntax };

export interface MatchResult {
  value: any;
  path: string[];
  error?: string;
  matches: number;
}

export interface Explanation {
  segment: string;
  type: string;
  description: string;
}

export function useJsonPathTester() {
  const [jsonInput, setJsonInput] = useState<string>(`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "roles": ["admin", "user"]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "roles": ["user"]
    }
  ],
  "metadata": {
    "total": 2,
    "lastUpdated": "2024-01-15"
  }
}`);
  const [expression, setExpression] = useState<string>('');
  const [syntaxMode, setSyntaxMode] = useState<SyntaxMode>('pointer');
  const [pathSyntax, setPathSyntax] = useState<JsonPathSyntax>('jayway');
  const [result, setResult] = useState<MatchResult | null>(null);
  const [explanation, setExplanation] = useState<Explanation[]>([]);
  const [isValidJson, setIsValidJson] = useState(true);
  const [jsonError, setJsonError] = useState<string>('');

  // Parse JSON input
  const parsedJson = useMemo(() => {
    if (!jsonInput.trim()) {
      setIsValidJson(false);
      setJsonError('Please enter some JSON');
      return null;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setIsValidJson(true);
      setJsonError('');
      return parsed;
    } catch (error) {
      setIsValidJson(false);
      setJsonError(error instanceof Error ? error.message : 'Invalid JSON');
      return null;
    }
  }, [jsonInput]);

  // Evaluate expression when inputs change
  useEffect(() => {
    if (!parsedJson) {
      setResult(null);
      setExplanation([]);
      return;
    }

    if (!expression.trim()) {
      setResult(null);
      setExplanation([]);
      return;
    }

    try {
      if (syntaxMode === 'pointer') {
        const pointerResult = evaluateJsonPointer(expression, parsedJson);
        const pointerExplanation = explainJsonPointer(expression);

        setResult({
          value: pointerResult.value,
          path: pointerResult.path,
          error: pointerResult.error,
          matches: pointerResult.error ? 0 : 1
        });

        setExplanation(pointerExplanation.map(e => ({
          segment: e.token,
          type: 'pointer',
          description: e.description
        })));
      } else {
        const pathResult = evaluateJsonPath(expression, parsedJson, pathSyntax);
        const pathExplanation = explainJsonPath(expression, pathSyntax);

        setResult({
          value: pathResult.value,
          path: Array.isArray(pathResult.path) ? pathResult.path : [pathResult.path],
          error: pathResult.error,
          matches: pathResult.matches
        });

        setExplanation(pathExplanation);
      }
    } catch (error) {
      setResult({
        value: null,
        path: [],
        matches: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      setExplanation([]);
    }
  }, [expression, parsedJson, syntaxMode, pathSyntax]);

  return {
    jsonInput,
    setJsonInput,
    expression,
    setExpression,
    syntaxMode,
    setSyntaxMode,
    pathSyntax,
    setPathSyntax,
    result,
    explanation,
    isValidJson,
    jsonError,
    parsedJson
  };
}
