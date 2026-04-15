import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

const yamlInput = document.getElementById('yaml-input');
const schemaInput = document.getElementById('schema-input');
const outputDisplay = document.getElementById('output-display');
const validateBtn = document.getElementById('validate-btn');
const formatBtn = document.getElementById('format-btn');

const updateStatus = (message, isValid) => {
    outputDisplay.textContent = message;
    outputDisplay.className = isValid ? 'valid' : 'invalid';
};

validateBtn.addEventListener('click', () => {
    try {
        const doc = yaml.load(yamlInput.value);
        let message = 'Valid YAML!';
        let valid = true;

        if (schemaInput.value.trim()) {
            const schema = JSON.parse(schemaInput.value);
            const validate = ajv.compile(schema);
            const isValidSchema = validate(doc);
            if (!isValidSchema) {
                message = 'YAML is valid but does not match schema: ' + ajv.errorsText(validate.errors);
                valid = false;
            }
        }
        updateStatus(message, valid);
    } catch (e) {
        updateStatus('Error: ' + e.message, false);
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
