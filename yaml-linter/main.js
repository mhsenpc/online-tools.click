import yaml from 'js-yaml';

const yamlInput = document.getElementById('yaml-input');
const outputDisplay = document.getElementById('output-display');
const validateBtn = document.getElementById('validate-btn');
const formatBtn = document.getElementById('format-btn');

const updateStatus = (message, isValid) => {
    outputDisplay.textContent = message;
    outputDisplay.className = isValid ? 'valid' : 'invalid';
};

validateBtn.addEventListener('click', () => {
    try {
        yaml.load(yamlInput.value);
        updateStatus('Valid YAML!', true);
    } catch (e) {
        updateStatus('Invalid YAML: ' + e.message, false);
    }
});

formatBtn.addEventListener('click', () => {
    try {
        const parsed = yaml.load(yamlInput.value);
        yamlInput.value = yaml.dump(parsed, { indent: 2 });
        updateStatus('YAML formatted!', true);
    } catch (e) {
        updateStatus('Cannot format invalid YAML: ' + e.message, false);
    }
});
