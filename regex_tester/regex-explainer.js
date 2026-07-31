// Regex Pattern Explainer - Convert regex to plain English
function explainRegex(pattern) {
    if (!pattern) return '';

    const explanations = [];

    // Character classes
    const charClassExplanations = {
        '\\d': 'any digit (0-9)',
        '\\D': 'any non-digit',
        '\\w': 'any word character (a-z, A-Z, 0-9, _)',
        '\\W': 'any non-word character',
        '\\s': 'any whitespace (space, tab, newline)',
        '\\S': 'any non-whitespace',
        '\\b': 'word boundary',
        '\\B': 'non-word boundary',
        '.': 'any character (except newline)',
        '\\n': 'newline',
        '\\t': 'tab',
        '\\r': 'carriage return'
    };

    // Quantifiers
    const quantifierExplanations = {
        '*': 'zero or more times',
        '+': 'one or more times',
        '?': 'zero or one time (optional)',
        '*?': 'zero or more times (lazy)',
        '+?': 'one or more times (lazy)',
        '??': 'zero or one time (lazy)'
    };

    // Anchors
    const anchorExplanations = {
        '^': 'start of string/line',
        '$': 'end of string/line',
        '\\A': 'start of string only',
        '\\Z': 'end of string only'
    };

    // Break down the pattern
    let i = 0;
    let depth = 0;
    let currentExplanation = '';

    while (i < pattern.length) {
        const char = pattern[i];
        const twoChar = pattern.slice(i, i + 2);
        const threeChar = pattern.slice(i, i + 3);

        // Check for character classes
        if (charClassExplanations[twoChar]) {
            currentExplanation = `Match ${charClassExplanations[twoChar]}`;
            explanations.push(currentExplanation);
            i += 2;
            continue;
        }

        if (charClassExplanations[char]) {
            currentExplanation = `Match ${charClassExplanations[char]}`;
            explanations.push(currentExplanation);
            i++;
            continue;
        }

        // Check for quantifiers
        if (quantifierExplanations[twoChar]) {
            explanations[explanations.length - 1] += ` (${quantifierExplanations[twoChar]})`;
            i += 2;
            continue;
        }

        if (quantifierExplanations[char]) {
            explanations[explanations.length - 1] += ` (${quantifierExplanations[char]})`;
            i++;
            continue;
        }

        // Check for anchors
        if (anchorExplanations[twoChar]) {
            explanations.push(`At ${anchorExplanations[twoChar]}`);
            i += 2;
            continue;
        }

        if (anchorExplanations[char]) {
            explanations.push(`At ${anchorExplanations[char]}`);
            i++;
            continue;
        }

        // Check for character sets
        if (char === '[') {
            const closeIndex = pattern.indexOf(']', i);
            if (closeIndex !== -1) {
                const charSet = pattern.slice(i + 1, closeIndex);
                if (charSet.startsWith('^')) {
                    explanations.push(`Match any character NOT in [${charSet.slice(1)}]`);
                } else {
                    explanations.push(`Match any character in [${charSet}]`);
                }
                i = closeIndex + 1;
                continue;
            }
        }

        // Check for groups
        if (char === '(') {
            const lookahead = pattern.slice(i, i + 3);
            const lookbehind = pattern.slice(i, i + 4);
            const nonCapturing = pattern.slice(i, i + 3);

            if (lookahead === '(?=') {
                explanations.push('Positive lookahead: assert that the following matches');
                depth++;
            } else if (lookahead === '(?!') {
                explanations.push('Negative lookahead: assert that the following does NOT match');
                depth++;
            } else if (lookbehind === '(?<=') {
                explanations.push('Positive lookbehind: assert that the preceding matches');
                depth++;
            } else if (lookbehind === '(?<!') {
                explanations.push('Negative lookbehind: assert that the preceding does NOT match');
                depth++;
            } else if (nonCapturing === '(?:') {
                explanations.push('Non-capturing group');
                depth++;
            } else if (pattern.slice(i, i + 3).match(/\(\?<[a-zA-Z_][a-zA-Z0-9_]*>/)) {
                const nameMatch = pattern.slice(i).match(/\(\?<([a-zA-Z_][a-zA-Z0-9_]*)>/);
                if (nameMatch) {
                    explanations.push(`Named capture group "${nameMatch[1]}"`);
                    depth++;
                }
            } else {
                depth++;
                explanations.push(`Capture group ${depth}`);
            }
            i++;
            continue;
        }

        if (char === ')') {
            explanations.push('End of group');
            i++;
            continue;
        }

        // Check for specific counts
        if (char === '{') {
            const closeIndex = pattern.indexOf('}', i);
            if (closeIndex !== -1) {
                const count = pattern.slice(i + 1, closeIndex);
                if (count.includes(',')) {
                    const [min, max] = count.split(',');
                    if (max) {
                        explanations[explanations.length - 1] += ` (between ${min} and ${max} times)`;
                    } else {
                        explanations[explanations.length - 1] += ` (${min} or more times)`;
                    }
                } else {
                    explanations[explanations.length - 1] += ` (exactly ${count} times)`;
                }
                i = closeIndex + 1;
                continue;
            }
        }

        // Check for alternation
        if (char === '|') {
            explanations.push('OR');
            i++;
            continue;
        }

        // Check for backreferences
        if (char === '\\' && i + 1 < pattern.length && /\d/.test(pattern[i + 1])) {
            explanations.push(`Match the same text as capture group ${pattern[i + 1]}`);
            i += 2;
            continue;
        }

        // Literal character
        if (char !== '\\' && /[a-zA-Z0-9]/.test(char)) {
            let literal = char;
            let j = i + 1;
            while (j < pattern.length && /[a-zA-Z0-9]/.test(pattern[j]) &&
                   pattern[j] !== '\\' && !'*+?{[('.includes(pattern[j])) {
                literal += pattern[j];
                j++;
            }
            if (literal.length > 1) {
                explanations.push(`Match the literal text "${literal}"`);
                i = j;
            } else {
                explanations.push(`Match the literal character "${char}"`);
                i++;
            }
            continue;
        }

        // Escaped special character
        if (char === '\\' && i + 1 < pattern.length) {
            const escapedChar = pattern[i + 1];
            if (!'dDwWsSbBntrAZ'.includes(escapedChar)) {
                explanations.push(`Match the literal character "${escapedChar}"`);
                i += 2;
                continue;
            }
        }

        i++;
    }

    // Format the explanation
    if (explanations.length === 0) {
        return 'No pattern to explain.';
    }

    return explanations.map((exp, idx) => {
        return `<div class="explanation-item">${idx + 1}. ${exp}</div>`;
    }).join('');
}

// Common pitfalls and warnings
function getRegexWarnings(pattern) {
    const warnings = [];

    // Catastrophic backtracking
    if (pattern.includes('(.+)*') || pattern.includes('(.*)*')) {
        warnings.push('⚠️ Warning: Potential catastrophic backtracking with nested quantifiers');
    }

    // Unescaped special characters
    const specialChars = '.^$*+?{}[]()|\\/';
    for (const char of specialChars) {
        if (pattern.includes(char) && !pattern.includes('\\' + char)) {
            // Check if it's actually being used as special character
            const regex = /[.^$*+?{}[\]()|\\/]/;
            if (regex.test(char)) {
                // This is okay, it's being used as a special character
                continue;
            }
        }
    }

    // Greedy quantifiers that might be better as lazy
    if (pattern.includes('.*') && !pattern.includes('.*?')) {
        warnings.push('💡 Tip: Consider using .*? (lazy) instead of .* (greedy) for better performance');
    }

    // Missing anchors for exact matches
    if (!pattern.startsWith('^') && !pattern.endsWith('$') && pattern.length > 5) {
        warnings.push('💡 Tip: Consider adding ^ and $ anchors for exact matching');
    }

    return warnings;
}
