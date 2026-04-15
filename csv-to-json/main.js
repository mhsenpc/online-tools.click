const csvInput = document.getElementById('csv-input');
const outputDisplay = document.getElementById('output-display');
const convertBtn = document.getElementById('convert-btn');

convertBtn.addEventListener('click', () => {
    const csv = csvInput.value.trim();
    if (!csv) return;
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim();
            return obj;
        }, {});
    });
    outputDisplay.textContent = JSON.stringify(result, null, 2);
});
