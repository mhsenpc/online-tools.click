const textInput = document.getElementById('text-input');
const outputDisplay = document.getElementById('output-display');

textInput.addEventListener('input', () => {
    const text = textInput.value;
    outputDisplay.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        const div = document.createElement('div');
        div.textContent = `${char} (Dec: ${code}, Hex: ${code.toString(16)})`;
        outputDisplay.appendChild(div);
    }
});
