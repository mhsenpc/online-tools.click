const domainInput = document.getElementById('domain-input');
const typeInput = document.getElementById('type-input');
const lookupBtn = document.getElementById('lookup-btn');
const outputDisplay = document.getElementById('output-display');

lookupBtn.addEventListener('click', async () => {
    const domain = domainInput.value;
    const type = typeInput.value;
    outputDisplay.textContent = 'Looking up...';
    
    try {
        const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
            headers: { 'Accept': 'application/dns-json' }
        });
        const data = await response.json();
        
        if (data.Answer) {
            outputDisplay.textContent = JSON.stringify(data.Answer, null, 2);
        } else {
            outputDisplay.textContent = 'No records found.';
        }
    } catch (error) {
        outputDisplay.textContent = 'Error: ' + error.message;
    }
});
