const jsonInput = document.getElementById('json-input');
const outputDisplay = document.getElementById('output-display');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    try {
        const json = JSON.parse(jsonInput.value);
        const schema = generateSchema(json);
        outputDisplay.textContent = JSON.stringify(schema, null, 2);
    } catch (e) {
        outputDisplay.textContent = 'Invalid JSON: ' + e.message;
    }
});

function generateSchema(data) {
    const type = Array.isArray(data) ? 'array' : typeof data;
    const schema = { type };
    if (type === 'object' && data !== null) {
        schema.properties = {};
        for (const key in data) {
            schema.properties[key] = generateSchema(data[key]);
        }
    } else if (type === 'array') {
        if (data.length > 0) schema.items = generateSchema(data[0]);
    }
    return schema;
}
