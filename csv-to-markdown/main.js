const csvInput = document.getElementById('csv-input');
const outputDisplay = document.getElementById('output-display');
const convertBtn = document.getElementById('convert-btn');

convertBtn.addEventListener('click', () => {
    const csv = csvInput.value;
    const lines = csv.split('\n');
    if (lines.length === 0) return;

    let markdown = '| ' + lines[0].split(',').join(' | ') + ' |\n';
    markdown += '| ' + lines[0].split(',').map(() => '---').join(' | ') + ' |\n';

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        markdown += '| ' + lines[i].split(',').join(' | ') + ' |\n';
    }

    outputDisplay.textContent = markdown;
});
