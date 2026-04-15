const regexInput = document.getElementById('regex-input');
const explanationDisplay = document.getElementById('explanation-display');
const explainBtn = document.getElementById('explain-btn');

explainBtn.addEventListener('click', () => {
    const pattern = regexInput.value;
    explanationDisplay.textContent = explainRegex(pattern);
});

function explainRegex(pattern) {
    // Very basic regex explanation for demonstration purposes
    if (/\d+/.test(pattern)) return 'Matches one or more digits.';
    if (/[a-z]+/i.test(pattern)) return 'Matches one or more letters.';
    return 'Pattern contains special characters or other logic.';
}
