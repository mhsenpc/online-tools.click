const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');
const generateBtn = document.getElementById('generate-btn');
const outputDisplay = document.getElementById('output-display');

generateBtn.addEventListener('click', () => {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomNum = min + (array[0] % (max - min + 1));
    outputDisplay.textContent = randomNum;
});
