const svgInput = document.getElementById('svg-input');
const convertBtn = document.getElementById('convert-btn');
const scaleInput = document.getElementById('scale-input');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

convertBtn.addEventListener('click', () => {
    const svgCode = svgInput.value;
    const scale = parseInt(scaleInput.value) || 1;
    const blob = new Blob([svgCode], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        ctx.fillStyle = 'white'; // Fill background to avoid transparent artifacts in PNG
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'converted_' + scale + 'x.png';
        link.href = pngUrl;
        link.click();
        URL.revokeObjectURL(url);
    };
    img.src = url;
});
