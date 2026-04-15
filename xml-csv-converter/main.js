const inputArea = document.getElementById('input-area');
const outputArea = document.getElementById('output-area');
const toCsvBtn = document.getElementById('to-csv-btn');
const toXmlBtn = document.getElementById('to-xml-btn');

toCsvBtn.addEventListener('click', () => {
    const xml = inputArea.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    // Simplistic XML to CSV converter
    const nodes = doc.documentElement.children;
    if (nodes.length === 0) return;
    
    const headers = Array.from(nodes[0].children).map(child => child.tagName);
    let csv = headers.join(',') + '\n';
    
    Array.from(nodes).forEach(node => {
        const values = Array.from(node.children).map(child => child.textContent);
        csv += values.join(',') + '\n';
    });
    
    outputArea.textContent = csv;
});

toXmlBtn.addEventListener('click', () => {
    const csv = inputArea.value;
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    let xml = '<root>\n';
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        xml += '  <item>\n';
        const values = lines[i].split(',');
        headers.forEach((header, j) => {
            xml += `    <${header}>${values[j]}</${header}>\n`;
        });
        xml += '  </item>\n';
    }
    xml += '</root>';
    outputArea.textContent = xml;
});
