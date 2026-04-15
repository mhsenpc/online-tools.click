import { format } from 'sql-formatter';

// SQL Keywords for highlighting
const KEYWORDS = new Set([
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON',
    'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'IS', 'NULL', 'ORDER', 'BY',
    'GROUP', 'HAVING', 'AS', 'DISTINCT', 'ALL', 'EXISTS', 'UNION', 'INTERSECT',
    'EXCEPT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE',
    'TABLE', 'DROP', 'ALTER', 'INDEX', 'VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE',
    'END', 'LIMIT', 'OFFSET', 'ASC', 'DESC', 'WITH', 'RECURSIVE', 'OVER',
    'PARTITION', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'FIRST',
    'LAST', 'FILTER', 'WITHIN', 'DESCENDANT', 'ASCENDANT', 'NULLS', 'PRIMARY',
    'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'CHECK', 'DEFAULT', 'CASCADE',
    'RESTRICT', 'NO', 'ACTION', 'SET', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP'
]);

const FUNCTIONS = new Set([
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'EXTRACT',
    'DATE_TRUNC', 'NOW', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP',
    'UPPER', 'LOWER', 'TRIM', 'SUBSTRING', 'CONCAT', 'LENGTH', 'POSITION',
    'REPLACE', 'SPLIT_PART', 'REGEXP_REPLACE', 'ARRAY_AGG', 'JSON_AGG',
    'ROW_TO_JSON', 'JSONB_BUILD_OBJECT', 'GENSERIAL'
]);

// DOM elements
const inputSQL = document.getElementById('input-sql');
const outputSQL = document.getElementById('output-sql');
const formatBtn = document.getElementById('format-btn');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const indentSizeInput = document.getElementById('indent-size');
const uppercaseInput = document.getElementById('uppercase');
const errorMessage = document.getElementById('error-message');
const exampleItems = document.querySelectorAll('.example-item');

// Highlight SQL syntax
function highlightSQL(sql) {
    if (!sql) return '';

    // Escape HTML first
    let highlighted = sql
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Highlight strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>');

    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\b/g, '<span class="number">$&</span>');

    // Highlight comments
    highlighted = highlighted.replace(/--[^\n]*/g, '<span class="comment">$&</span>');

    // Highlight keywords (case-insensitive)
    const keywordPattern = new RegExp(`\\b(${Array.from(KEYWORDS).join('|')})\\b`, 'gi');
    highlighted = highlighted.replace(keywordPattern, '<span class="keyword">$1</span>');

    // Highlight functions
    const functionPattern = new RegExp(`\\b(${Array.from(FUNCTIONS).join('|')})\\s*\\(`, 'gi');
    highlighted = highlighted.replace(functionPattern, '<span class="function">$1</span>(');

    // Highlight operators
    highlighted = highlighted.replace(/([=<>!]+)/g, '<span class="operator">$1</span>');

    return highlighted;
}

// Format button
formatBtn.addEventListener('click', () => {
    try {
        const input = inputSQL.value;
        const indentSize = parseInt(indentSizeInput.value) || 4;
        const uppercase = uppercaseInput.checked;

        if (!input.trim()) {
            showError('Please enter a SQL query to format');
            return;
        }

        const formatted = format(input, {
            language: 'sql',
            indentStyle: 'tabularLeft', // Example of standardized formatting
            keywordCase: uppercase ? 'upper' : 'lower',
            indent: ' '.repeat(indentSize)
        });
        outputSQL.innerHTML = highlightSQL(formatted);
        hideError();
    } catch (error) {
        showError('Error formatting SQL: ' + error.message);
    }
});

// Clear button
clearBtn.addEventListener('click', () => {
    inputSQL.value = '';
    outputSQL.innerHTML = '';
    hideError();
});

// Copy button
copyBtn.addEventListener('click', async () => {
    const text = outputSQL.textContent;
    if (!text) {
        showError('No formatted SQL to copy');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
        `;
        setTimeout(() => {
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
            `;
        }, 2000);
        hideError();
    } catch (error) {
        showError('Failed to copy to clipboard');
    }
});

// Paste button
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        inputSQL.value = text;
        hideError();
    } catch (error) {
        showError('Failed to paste from clipboard. Please use Ctrl+V');
    }
});

// Example clicks
exampleItems.forEach(item => {
    item.addEventListener('click', () => {
        inputSQL.value = item.textContent;
        formatBtn.click();
    });
});

// Auto-format on option change if there's content
indentSizeInput.addEventListener('change', () => {
    if (inputSQL.value.trim()) {
        formatBtn.click();
    }
});

uppercaseInput.addEventListener('change', () => {
    if (inputSQL.value.trim()) {
        formatBtn.click();
    }
});

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to format
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        formatBtn.click();
    }
});
