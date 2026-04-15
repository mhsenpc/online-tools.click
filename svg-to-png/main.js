const svgInput = document.getElementById('svg-input');
const convertBtn = document.getElementById('convert-btn');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

convertBtn.addEventListener('click', () => {
    const svgCode = svgInput.value;
    const blob = new Blob([svgCode], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'converted.png';
        link.href = pngUrl;
        link.click();
        URL.revokeObjectURL(url);
    };
    img.src = url;
});
