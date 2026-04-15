import yaml from 'js-yaml';

const yamlInput = document.getElementById('yaml-input');
const outputDisplay = document.getElementById('output-display');
const validateBtn = document.getElementById('validate-btn');

validateBtn.addEventListener('click', () => {
    try {
        yaml.load(yamlInput.value);
        outputDisplay.textContent = 'Valid YAML!';
        outputDisplay.style.color = 'green';
    } catch (e) {
        outputDisplay.textContent = 'Invalid YAML: ' + e.message;
        outputDisplay.style.color = 'red';
    }
});
