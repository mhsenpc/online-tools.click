// SQL Dialect-specific keywords and functions
const DIALECT_KEYWORDS: Record<string, Set<string>> = {
  standard: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
    'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH',
    'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS'
  ]),

  tsql: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'INSERT', 'INTO', 'VALUES', 'UPDATE',
    'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX', 'VIEW', 'CASE',
    'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH', 'UNION',
    'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS',
    'TOP', 'FETCH', 'PIVOT', 'UNPIVOT', 'APPLY', 'CROSS', 'OUTER', 'DECLARE', 'BEGIN',
    'TRAN', 'COMMIT', 'ROLLBACK', 'TRY', 'CATCH', 'THROW', 'RAISERROR', 'PRINT', 'GO'
  ]),

  bigquery: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
    'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH',
    'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS',
    'ARRAY', 'STRUCT', 'UNNEST', 'FLATTEN', 'QUALIFY', 'EXTRACT', 'DATE_TRUNC', 'TIMESTAMP',
    'DATETIME', 'GEOGRAPHY', 'SAFE_CAST', 'HASH', 'ML', 'TABLEAU', 'EXPORT'
  ]),

  snowflake: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
    'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH',
    'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS',
    'QUALIFY', 'LATERAL', 'TABLE', 'SAMPLE', 'PIVOT', 'UNPIVOT', 'CLUSTER', 'LOCALGLOBAL',
    'TIMESTAMP_LTZ', 'TIMESTAMP_NTZ', 'TIMESTAMP_TZ', 'VARIANT', 'OBJECT', 'ARRAY'
  ]),

  postgres: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
    'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH',
    'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS',
    'WINDOW', 'FILTER', 'LATERAL', 'TABLESAMPLE', 'RETURNING', 'CONFLICT', 'NOTHING'
  ]),

  mysql: new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'CROSS',
    'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
    'AS', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
    'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'DISTINCT', 'WITH',
    'UNION', 'INTERSECT', 'EXCEPT', 'ALL', 'ANY', 'SOME', 'OVER', 'PARTITION', 'ROWS',
    'SHOW', 'DESCRIBE', 'EXPLAIN', 'OPTIMIZE', 'LOCK', 'UNLOCK', 'FORCE', 'IGNORE'
  ])
};

const FUNCTIONS = new Set([
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'EXTRACT',
  'DATE_TRUNC', 'NOW', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'UPPER',
  'LOWER', 'TRIM', 'SUBSTRING', 'CONCAT', 'LENGTH', 'POSITION', 'REPLACE',
  'SPLIT_PART', 'REGEXP_REPLACE', 'ARRAY_AGG', 'JSON_AGG', 'ROW_TO_JSON',
  'JSONB_BUILD_OBJECT', 'GENSERIAL', 'ABS', 'ROUND', 'CEIL', 'FLOOR', 'POWER',
  'SQRT', 'LOG', 'EXP', 'MOD', 'RAND', 'RANDOM', 'IFNULL', 'ISNULL', 'NVL'
]);

interface FormatterOptions {
  dialect: string;
  keywordCase: 'upper' | 'lower' | 'camel';
  indentSize: number;
  commaBefore: boolean;
  linesBetweenQueries: boolean;
  compactExpressions: boolean;
}

// Tokenize SQL input
function tokenizeSQL(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inString = false;
  let stringChar = '';
  let inComment = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const nextChar = input[i + 1];

    // Handle single-line comments
    if (!inString && !inComment && char === '-' && nextChar === '-') {
      if (current.trim()) tokens.push(current);
      current = '';
      inComment = true;
      continue;
    }

    if (inComment) {
      current += char;
      if (char === '\n') {
        tokens.push(current.trim());
        current = '';
        inComment = false;
      }
      continue;
    }

    // Handle multi-line comments
    if (!inString && !inComment && char === '/' && nextChar === '*') {
      if (current.trim()) tokens.push(current);
      current = '';
      inComment = true;
      i++; // Skip next char
      continue;
    }

    if (inComment) {
      current += char;
      if (char === '*' && nextChar === '/') {
        current += nextChar;
        tokens.push(current.trim());
        current = '';
        inComment = false;
        i++; // Skip next char
      }
      continue;
    }

    // Handle strings
    if ((char === '"' || char === "'") && !inString) {
      inString = true;
      stringChar = char;
      current += char;
      continue;
    }

    if (inString) {
      current += char;
      if (char === stringChar) {
        inString = false;
      }
      continue;
    }

    // Handle operators and punctuation
    if (' ,;=<>!+*/()-'.includes(char)) {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
      if (char !== ' ') {
        tokens.push(char);
      }
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    tokens.push(current.trim());
  }

  return tokens.filter(t => t.length > 0);
}

// Convert case of keywords
function convertKeyword(keyword: string, keywordCase: 'upper' | 'lower' | 'camel'): string {
  const upper = keyword.toUpperCase();
  switch (keywordCase) {
    case 'upper':
      return upper;
    case 'lower':
      return upper.toLowerCase();
    case 'camel':
      return upper.charAt(0).toUpperCase() + upper.slice(1).toLowerCase();
    default:
      return upper;
  }
}

// Format SQL with dialect support
function formatSQL(input: string, options: FormatterOptions): string {
  if (!input.trim()) {
    return '';
  }

  const keywords = DIALECT_KEYWORDS[options.dialect] || DIALECT_KEYWORDS.standard;
  const indent = ' '.repeat(options.indentSize);

  const tokens = tokenizeSQL(input);
  let output = '';
  let level = 0;
  let parenLevel = 0;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    const prevToken = i > 0 ? tokens[i - 1] : '';

    // Skip comments (they're already formatted)
    if (token.startsWith('--') || token.startsWith('/*')) {
      output += '\n' + token + '\n';
      continue;
    }

    // Track parentheses
    if (token === '(') {
      parenLevel++;
    } else if (token === ')') {
      parenLevel = Math.max(0, parenLevel - 1);
    }

    // Convert keyword case
    const upperToken = token.toUpperCase();
    if (keywords.has(upperToken) || FUNCTIONS.has(upperToken)) {
      token = convertKeyword(token, options.keywordCase);
    }

    // Handle major keywords
    if (keywords.has(upperToken)) {
      const needsNewline =
        !prevToken ||
        prevToken === ';' ||
        prevToken === ',' ||
        keywords.has(prevToken.toUpperCase());

      if (needsNewline && upperToken !== 'AND' && upperToken !== 'OR') {
        output += '\n' + indent.repeat(level);
      } else if (upperToken === 'FROM' || upperToken === 'WHERE') {
        output += '\n' + indent.repeat(Math.max(0, level - 1));
      } else if ((upperToken === 'AND' || upperToken === 'OR') && parenLevel === 0) {
        output += '\n' + indent.repeat(level);
      }
    }

    // Handle commas
    if (token === ',') {
      if (options.commaBefore) {
        output += '\n' + indent.repeat(level) + token + ' ';
      } else {
        output += token + '\n' + indent.repeat(level);
      }
      continue;
    }

    // Handle opening parentheses
    if (token === '(') {
      output += token;
      if (!options.compactExpressions) {
        output += '\n' + indent.repeat(level + 1);
        level++;
      }
      continue;
    }

    // Handle closing parentheses
    if (token === ')') {
      if (!options.compactExpressions) {
        level = Math.max(0, level - 1);
        output += '\n' + indent.repeat(level);
      }
      output += token;
      continue;
    }

    // Handle semicolons
    if (token === ';') {
      output += token;
      if (options.linesBetweenQueries) {
        output += '\n\n';
      } else {
        output += '\n';
      }
      continue;
    }

    // Add token
    output += (output && !output.endsWith('\n') && !output.endsWith(' ') ? ' ' : '') + token;
  }

  return output.trim();
}

// Highlight SQL syntax
function highlightSQL(sql: string): string {
  // Simple highlighting - in a real implementation, you'd use a proper tokenizer
  let highlighted = sql
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight strings
  highlighted = highlighted.replace(/(['"`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="string">$&</span>');

  // Highlight numbers
  highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

  // Highlight comments
  highlighted = highlighted.replace(/(--[^\n]*)/g, '<span class="comment">$1</span>');
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');

  // Highlight keywords and functions
  const pattern = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|ALTER|INDEX|VIEW|CASE|WHEN|THEN|ELSE|END|ASC|DESC|DISTINCT|WITH|UNION|INTERSECT|EXCEPT|ALL|ANY|SOME|OVER|PARTITION|ROWS|COUNT|SUM|AVG|MIN|MAX|COALESCE|NULLIF|CAST|EXTRACT|NOW|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|UPPER|LOWER|TRIM|SUBSTRING|CONCAT|LENGTH|POSITION|REPLACE)\b/gi;
  highlighted = highlighted.replace(pattern, '<span class="keyword">$1</span>');

  return highlighted;
}

// UI Controllers
const inputSQL = document.getElementById('input-sql') as HTMLTextAreaElement;
const outputSQL = document.getElementById('output-sql') as HTMLDivElement;
const formatBtn = document.getElementById('format-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const sampleBtn = document.getElementById('sample-btn') as HTMLButtonElement;
const dialectSelect = document.getElementById('dialect-select') as HTMLSelectElement;
const errorMessage = document.getElementById('error-message') as HTMLDivElement;

// Get formatter options
function getOptions(): FormatterOptions {
  const keywordCase = document.querySelector('input[name="keyword-case"]:checked') as HTMLInputElement;
  const indentSize = document.querySelector('input[name="indent-size"]:checked') as HTMLInputElement;
  const commaBefore = document.getElementById('opt-commas') as HTMLInputElement;
  const linesBetweenQueries = document.getElementById('opt-lines') as HTMLInputElement;
  const compactExpressions = document.getElementById('opt-compact') as HTMLInputElement;

  return {
    dialect: dialectSelect.value,
    keywordCase: keywordCase.value as 'upper' | 'lower' | 'camel',
    indentSize: parseInt(indentSize.value),
    commaBefore: commaBefore.checked,
    linesBetweenQueries: linesBetweenQueries.checked,
    compactExpressions: compactExpressions.checked
  };
}

// Show error message
function showError(message: string): void {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, 5000);
}

// Format and display SQL
function formatAndDisplay(): void {
  try {
    const input = inputSQL.value;
    if (!input.trim()) {
      outputSQL.innerHTML = '<div class="empty-state">Enter SQL query to format</div>';
      return;
    }

    const options = getOptions();
    const formatted = formatSQL(input, options);
    const highlighted = highlightSQL(formatted);
    outputSQL.innerHTML = highlighted;
  } catch (error) {
    showError(`Error formatting SQL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Copy formatted SQL to clipboard
async function copyToClipboard(): Promise<void> {
  const text = outputSQL.textContent;
  if (!text || text === 'Formatted SQL will appear here' || text === 'Enter SQL query to format') {
    showError('No formatted SQL to copy');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Copied!
    `;
    setTimeout(() => {
      copyBtn.innerHTML = originalText;
    }, 2000);
  } catch (error) {
    showError('Failed to copy to clipboard');
  }
}

// Load sample SQL
function loadSample(): void {
  const samples: Record<string, string> = {
    standard: `SELECT c.customer_id, c.name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_date >= '2024-01-01' GROUP BY c.customer_id, c.name HAVING COUNT(o.order_id) > 5 ORDER BY total_spent DESC LIMIT 10;`,

    tsql: `SELECT TOP 10 c.CustomerID, c.Name, COUNT(o.OrderID) as OrderCount, SUM(o.TotalAmount) as TotalSpent FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID WHERE o.OrderDate >= '2024-01-01' GROUP BY c.CustomerID, c.Name HAVING COUNT(o.OrderID) > 5 ORDER BY TotalSpent DESC;`,

    bigquery: `SELECT customer_id, name, COUNT(order_id) as order_count, SUM(total_amount) as total_spent FROM \`project.dataset.customers\` c LEFT JOIN \`project.dataset.orders\` o ON c.customer_id = o.customer_id WHERE o.order_date >= '2024-01-01' GROUP BY customer_id, name HAVING order_count > 5 QUALIFY ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) <= 5 ORDER BY total_spent DESC LIMIT 10;`,

    snowflake: `SELECT c.customer_id, c.name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_date >= '2024-01-01' GROUP BY c.customer_id, c.name HAVING COUNT(o.order_id) > 5 QUALIFY ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY o.order_date DESC) <= 5 ORDER BY total_spent DESC LIMIT 10;`,

    postgres: `SELECT c.customer_id, c.name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_date >= '2024-01-01'::date GROUP BY c.customer_id, c.name HAVING COUNT(o.order_id) > 5 WINDOW ordered_orders AS (PARTITION BY c.customer_id ORDER BY o.order_date DESC) ORDER BY total_spent DESC NULLS LAST LIMIT 10;`,

    mysql: `SELECT c.customer_id, c.name, COUNT(o.order_id) as order_count, SUM(o.total_amount) as total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_date >= STR_TO_DATE('2024-01-01', '%Y-%m-%d') GROUP BY c.customer_id, c.name HAVING order_count > 5 ORDER BY total_spent DESC LIMIT 10;`
  };

  const dialect = dialectSelect.value;
  inputSQL.value = samples[dialect] || samples.standard;
  formatAndDisplay();
}

// Event listeners
formatBtn.addEventListener('click', formatAndDisplay);
clearBtn.addEventListener('click', () => {
  inputSQL.value = '';
  outputSQL.innerHTML = '<div class="empty-state">Formatted SQL will appear here</div>';
});
copyBtn.addEventListener('click', copyToClipboard);
sampleBtn.addEventListener('click', loadSample);

// Auto-format on input with debounce
let debounceTimer: NodeJS.Timeout;
inputSQL.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(formatAndDisplay, 500);
});

// Re-format when options change
const optionInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], select');
optionInputs.forEach(input => {
  input.addEventListener('change', formatAndDisplay);
});

// Initialize
loadSample();
