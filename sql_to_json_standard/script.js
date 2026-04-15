document.getElementById('convertBtn').addEventListener('click', () => {
    const input = document.getElementById('sqlInput').value.trim();
    if (!input) return;
    const lines = input.split('\n');
    if (lines.length < 2) return;
    
    // Heuristic: Split by multiple spaces or tab
    const headers = lines[0].split(/\s{2,}|\t/).filter(h => h.trim()).map(h => h.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(/\s{2,}|\t/).filter(v => v.trim()).map(v => v.trim());
        if (values.length === 0) continue;
        const obj = {};
        headers.forEach((h, index) => {
            obj[h] = values[index] || null;
        });
        result.push(obj);
    }
    
    document.getElementById('jsonOutput').textContent = JSON.stringify(result, null, 2);
});
