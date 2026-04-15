import yaml from 'js-yaml';

const jsonInput = document.getElementById('json-input');
const outputDisplay = document.getElementById('output-display');
const convertBtn = document.getElementById('convert-btn');

convertBtn.addEventListener('click', () => {
    try {
        const json = JSON.parse(jsonInput.value);
        const yamlOutput = yaml.dump(json);
        outputDisplay.textContent = yamlOutput;
    } catch (e) {
        outputDisplay.textContent = 'Invalid JSON: ' + e.message;
    }
});
