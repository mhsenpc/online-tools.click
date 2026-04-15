const patternInput = document.getElementById('regex-input');
const textInput = document.getElementById('text-input');
const flagsInput = document.getElementById('flags-input');
const outputDisplay = document.getElementById('output-display');
const errorDisplay = document.getElementById('error-display');

function testRegex() {
    try {
        const pattern = patternInput.value;
        const text = textInput.value;
        const flags = flagsInput.value;
        if (!pattern) {
            outputDisplay.innerHTML = '';
            return;
        }
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex);
        
        if (matches) {
            let highlightedText = text.replace(regex, (match) => `<span class="match">${match}</span>`);
            outputDisplay.innerHTML = highlightedText;
            errorDisplay.textContent = '';
        } else {
            outputDisplay.textContent = 'No matches found.';
            errorDisplay.textContent = '';
        }
    } catch (e) {
        errorDisplay.textContent = 'Invalid Regular Expression: ' + e.message;
        outputDisplay.innerHTML = '';
    }
}

[patternInput, textInput, flagsInput].forEach(el => el.addEventListener('input', testRegex));
