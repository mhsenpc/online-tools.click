const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');

encodeBtn.addEventListener('click', () => {
    outputArea.textContent = encodeURIComponent(inputArea.value);
});

decodeBtn.addEventListener('click', () => {
    try {
        outputArea.textContent = decodeURIComponent(inputArea.value);
    } catch (e) {
        outputArea.textContent = 'Invalid encoding.';
    }
});
