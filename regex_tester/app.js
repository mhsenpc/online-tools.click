// Main Application Logic
const regexInput = document.getElementById('regex-input');
const testString = document.getElementById('test-string');
const backdrop = document.getElementById('backdrop');
const matchDetails = document.getElementById('match-details');
const matchCount = document.getElementById('match-count');
const errorBar = document.getElementById('error-bar');
const regexBar = document.getElementById('regex-bar');
const replacementInput = document.getElementById('replacement-input');
const substitutionResult = document.getElementById('substitution-result');
const cheatToggle = document.getElementById('cheat-toggle');
const cheatContent = document.getElementById('cheat-content');
const copyResultBtn = document.getElementById('copy-result-btn');
const toast = document.getElementById('toast');

// New elements for pattern library
const patternToggle = document.getElementById('pattern-toggle');
const patternContent = document.getElementById('pattern-content');
const patternGrid = document.getElementById('pattern-grid');
const savePatternBtn = document.getElementById('save-pattern-btn');
const shareBtn = document.getElementById('share-btn');
const explainBtn = document.getElementById('explain-btn');
const importBtn = document.getElementById('import-btn');
const exportBtn = document.getElementById('export-btn');
const explanationPanel = document.getElementById('explanation-panel');
const explanationContent = document.getElementById('explanation-content');

// Modal elements
const saveModal = document.getElementById('save-modal');
const saveModalClose = document.getElementById('save-modal-close');
const cancelSaveBtn = document.getElementById('cancel-save-btn');
const confirmSaveBtn = document.getElementById('confirm-save-btn');
const patternNameInput = document.getElementById('pattern-name-input');
const patternDescriptionInput = document.getElementById('pattern-description-input');

// Test cases
const testCasesList = document.getElementById('test-cases-list');
const addTestBtn = document.getElementById('add-test-btn');

let testCases = [];

const flagBtns = document.querySelectorAll('.flag-btn');

function getFlags() {
    let flags = '';
    flagBtns.forEach(btn => {
        if (btn.classList.contains('active')) {
            flags += btn.dataset.flag;
        }
    });
    return flags;
}

function setFlags(flagString) {
    flagBtns.forEach(btn => {
        const flag = btn.dataset.flag;
        if (flagString.includes(flag)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

flagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        runMatch();
    });
});

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 1500);
}

function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = 'Copied';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = orig;
                btn.classList.remove('copied');
            }, 1200);
        } else {
            showToast('Copied to clipboard');
        }
    });
}

function findMatches(pattern, flags, testStr) {
    if (!pattern) return { matches: [], error: null };

    try {
        if (pattern.length > 50 && (pattern.includes('(.+)*') || pattern.includes('(.*)*'))) {
            throw new Error('Pattern contains potential catastrophic backtracking risks.');
        }

        const regex = new RegExp(pattern, flags);
        const matches = [];

        if (flags.includes('g')) {
            let match;
            const maxIterations = 50000;
            let iterations = 0;
            const startTime = performance.now();

            while ((match = regex.exec(testStr)) !== null) {
                iterations++;

                if (iterations > maxIterations) {
                    console.warn('Max regex iterations reached');
                    break;
                }
                if (performance.now() - startTime > 500) {
                    throw new Error('Regex matching took too long (potential catastrophic backtracking).');
                }

                matches.push({
                    full: match[0],
                    index: match.index,
                    endIndex: match.index + match[0].length,
                    groups: Array.from(match).slice(1),
                    namedGroups: match.groups || {}
                });

                if (match[0].length === 0) {
                    regex.lastIndex++;
                }
            }
        } else {
            const startTime = performance.now();
            const match = regex.exec(testStr);
            if (performance.now() - startTime > 500) {
                throw new Error('Regex matching took too long.');
            }

            if (match) {
                matches.push({
                    full: match[0],
                    index: match.index,
                    endIndex: match.index + match[0].length,
                    groups: Array.from(match).slice(1),
                    namedGroups: match.groups || {}
                });
            }
        }

        return { matches, error: null };
    } catch (e) {
        return { matches: [], error: e.message };
    }
}

function buildHighlightedHTML(testStr, matches) {
    if (!matches.length) {
        return escapeHTML(testStr) + '\n';
    }

    const sorted = [...matches].sort((a, b) => a.index - b.index);
    let html = '';
    let lastIndex = 0;

    for (let i = 0; i < sorted.length; i++) {
        const match = sorted[i];
        if (match.index >= lastIndex) {
            if (match.index > lastIndex) {
                html += escapeHTML(testStr.slice(lastIndex, match.index));
            }

            // Use different colors for different matches
            const colorClass = `group-${i % 5}`;
            html += '<mark class="' + colorClass + '">' + escapeHTML(match.full) + '</mark>';
            lastIndex = match.endIndex;
        }
    }

    if (lastIndex < testStr.length) {
        html += escapeHTML(testStr.slice(lastIndex));
    }

    html += '\n';
    return html;
}

function renderMatchDetails(matches) {
    if (!matches.length) {
        matchDetails.innerHTML = '<div class="match-details-empty">No matches found</div>';
        return;
    }

    let html = '';
    matches.forEach((match, i) => {
        const colorClass = `group-${i % 5}`;
        html += '<div class="match-item">';
        html += '<div class="match-header">';
        html += '<span class="match-index">#' + (i + 1) + '</span>';
        html += '<span class="match-value">' + escapeHTML(match.full) + '</span>';
        html += '<span class="match-pos">' + match.index + ':' + match.endIndex + '</span>';
        html += '</div>';

        const hasGroups = match.groups.length > 0 || Object.keys(match.namedGroups).length > 0;
        if (hasGroups) {
            html += '<div class="match-groups">';
            match.groups.forEach((g, gi) => {
                const val = g !== undefined ? escapeHTML(g) : 'undefined';
                const cls = g !== undefined ? 'group-value' : 'group-value undefined';
                html += '<div class="group-item">';
                html += '<span class="group-label">Group ' + (gi + 1) + ':</span>';
                html += '<span class="' + cls + '">' + val + '</span>';
                html += '</div>';
            });
            for (const [name, val] of Object.entries(match.namedGroups)) {
                html += '<div class="group-item">';
                html += '<span class="group-label">' + escapeHTML(name) + ':</span>';
                html += '<span class="group-value">' + (val !== undefined ? escapeHTML(val) : 'undefined') + '</span>';
                html += '</div>';
            }
            html += '</div>';
        }

        html += '</div>';
    });

    matchDetails.innerHTML = html;

    matchDetails.querySelectorAll('.match-value').forEach(el => {
        el.addEventListener('click', () => {
            copyText(el.textContent);
        });
    });
}

function runMatch() {
    const pattern = regexInput.value;
    const flags = getFlags();
    const testStr = testString.value;
    const replacement = replacementInput.value;

    const result = findMatches(pattern, flags, testStr);

    if (result.error) {
        errorBar.textContent = result.error;
        errorBar.classList.add('visible');
        regexBar.classList.add('has-error');
    } else {
        errorBar.classList.remove('visible');
        regexBar.classList.remove('has-error');
    }

    backdrop.innerHTML = buildHighlightedHTML(testStr, result.matches);

    if (result.matches.length > 0) {
        matchCount.textContent = result.matches.length + ' match' + (result.matches.length !== 1 ? 'es' : '');
    } else if (pattern && !result.error) {
        matchCount.textContent = '0 matches';
    } else {
        matchCount.textContent = '';
    }

    if (pattern) {
        renderMatchDetails(result.matches);
    } else {
        matchDetails.innerHTML = '<div class="match-details-empty">Enter a pattern to see matches</div>';
    }

    if (pattern && !result.error) {
        try {
            const regex = new RegExp(pattern, flags);
            if (flags.includes('g')) {
                substitutionResult.textContent = testStr.replace(regex, replacement);
            } else {
                substitutionResult.textContent = testStr.replace(regex, replacement);
            }
        } catch {
            substitutionResult.textContent = '';
        }
    } else {
        substitutionResult.textContent = testStr || '';
    }

    // Update test cases
    updateTestCases();
}

regexInput.addEventListener('input', runMatch);
testString.addEventListener('input', runMatch);
replacementInput.addEventListener('input', runMatch);

testString.addEventListener('scroll', () => {
    backdrop.scrollTop = testString.scrollTop;
    backdrop.scrollLeft = testString.scrollLeft;
});

// Pattern library functionality
function renderPatternLibrary() {
    const patterns = getPatterns();
    patternGrid.innerHTML = '';

    patterns.forEach((pattern, index) => {
        const card = document.createElement('div');
        card.className = 'pattern-card';

        card.innerHTML = `
            <div class="pattern-name">${escapeHTML(pattern.name)}</div>
            <div class="pattern-regex">${escapeHTML(pattern.pattern)}</div>
            <div class="pattern-description">${escapeHTML(pattern.description)}</div>
        `;

        card.addEventListener('click', () => {
            regexInput.value = pattern.pattern;
            setFlags(pattern.flags || 'g');
            if (pattern.example) {
                testString.value = pattern.example;
            }
            runMatch();
            showToast(`Loaded: ${pattern.name}`);
        });

        patternGrid.appendChild(card);
    });
}

patternToggle.addEventListener('click', () => {
    patternToggle.classList.toggle('open');
    patternContent.classList.toggle('open');
    if (patternContent.classList.contains('open')) {
        renderPatternLibrary();
    }
});

cheatToggle.addEventListener('click', () => {
    cheatToggle.classList.toggle('open');
    cheatContent.classList.toggle('open');
});

// Save pattern
savePatternBtn.addEventListener('click', () => {
    const pattern = regexInput.value;
    if (!pattern) {
        showToast('Enter a pattern first');
        return;
    }

    patternNameInput.value = '';
    patternDescriptionInput.value = '';
    saveModal.classList.add('visible');
});

saveModalClose.addEventListener('click', () => {
    saveModal.classList.remove('visible');
});

cancelSaveBtn.addEventListener('click', () => {
    saveModal.classList.remove('visible');
});

confirmSaveBtn.addEventListener('click', () => {
    const name = patternNameInput.value.trim();
    const description = patternDescriptionInput.value.trim();
    const pattern = regexInput.value;
    const flags = getFlags();

    if (!name) {
        showToast('Please enter a name');
        return;
    }

    savePattern(name, pattern, description, flags);
    saveModal.classList.remove('visible');
    showToast('Pattern saved!');
    renderPatternLibrary();
});

// Close modal when clicking outside
saveModal.addEventListener('click', (e) => {
    if (e.target === saveModal) {
        saveModal.classList.remove('visible');
    }
});

// Share pattern
shareBtn.addEventListener('click', () => {
    const pattern = regexInput.value;
    if (!pattern) {
        showToast('Enter a pattern first');
        return;
    }

    const flags = getFlags();
    const url = sharePattern(pattern, flags);

    copyText(url);
    showToast('Share link copied!');
});

// Explain pattern
explainBtn.addEventListener('click', () => {
    const pattern = regexInput.value;
    if (!pattern) {
        showToast('Enter a pattern first');
        return;
    }

    const explanation = explainRegex(pattern);
    const warnings = getRegexWarnings(pattern);

    let html = explanation;
    if (warnings.length > 0) {
        html += '<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">';
        warnings.forEach(warning => {
            html += `<div class="explanation-item">${warning}</div>`;
        });
        html += '</div>';
    }

    explanationContent.innerHTML = html;
    explanationPanel.classList.toggle('visible');
});

// Export patterns
exportBtn.addEventListener('click', () => {
    exportPatterns();
    showToast('Patterns exported!');
});

// Import patterns
importBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        importPatterns(file)
            .then(count => {
                showToast(`Imported ${count} pattern(s)!`);
                renderPatternLibrary();
            })
            .catch(err => {
                showToast('Import failed: ' + err.message);
            });
    });

    input.click();
});

// Test cases functionality
function addTestCase(text = '', expected = true) {
    const testCase = { text, expected };
    testCases.push(testCase);
    renderTestCases();
}

function removeTestCase(index) {
    testCases.splice(index, 1);
    renderTestCases();
}

function renderTestCases() {
    if (testCases.length === 0) {
        testCasesList.innerHTML = '<div class="match-details-empty" style="padding: 24px;">No test cases. Click "+ Add Test" to create one.</div>';
        return;
    }

    let html = '';
    testCases.forEach((testCase, index) => {
        const pattern = regexInput.value;
        const flags = getFlags();
        const result = findMatches(pattern, flags, testCase.text);

        const passes = result.matches.length > 0 === testCase.expected;
        const indicatorClass = passes ? 'pass' : 'fail';

        html += `
            <div class="test-case-item">
                <div class="test-indicator ${indicatorClass}"></div>
                <input type="text" class="test-case-input" data-index="${index}" value="${escapeHTML(testCase.text)}" placeholder="Test string...">
                <button class="remove-test-btn" data-index="${index}">&times;</button>
            </div>
        `;
    });

    testCasesList.innerHTML = html;

    // Add event listeners
    testCasesList.querySelectorAll('.test-case-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            testCases[index].text = e.target.value;
            runMatch();
        });
    });

    testCasesList.querySelectorAll('.remove-test-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeTestCase(index);
        });
    });
}

function updateTestCases() {
    renderTestCases();
}

addTestBtn.addEventListener('click', () => {
    addTestCase('', true);
});

copyResultBtn.addEventListener('click', () => {
    const text = substitutionResult.textContent;
    if (text) {
        copyText(text, copyResultBtn);
    }
});

// Load pattern from URL on page load
window.addEventListener('DOMContentLoaded', () => {
    const urlPattern = loadPatternFromUrl();
    if (urlPattern) {
        regexInput.value = urlPattern.pattern;
        setFlags(urlPattern.flags);
    } else {
        // Default example
        testString.value = 'Hello World 123\nThe quick brown fox jumps over the lazy dog\nemail@example.com\n2024-01-15\nhttps://www.example.com/path?query=value';
        regexInput.value = '\\d+';
    }

    // Add some default test cases
    addTestCase('test123', true);
    addTestCase('nodigits', false);

    runMatch();
});
