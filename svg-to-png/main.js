const svgInput = document.getElementById('svg-input');
const fileInput = document.getElementById('file-input');
const convertBtn = document.getElementById('convert-btn');
const scaleInput = document.getElementById('scale-input');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const preview = document.getElementById('preview');

const updatePreview = () => {
    const svgCode = svgInput.value;
    const blob = new Blob([svgCode], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    preview.src = url;
};

svgInput.addEventListener('input', updatePreview);

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        svgInput.value = event.target.result;
        updatePreview();
    };
    reader.readAsText(file);
});

convertBtn.addEventListener('click', () => {
    const svgCode = svgInput.value;
    const blob = new Blob([svgCode], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    
    img.onload = () => {
        const scale = parseFloat(scaleInput.value) || 1;
        const width = parseInt(widthInput.value) || (img.width * scale);
        const height = parseInt(heightInput.value) || (img.height * scale);
        
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'converted.png';
        link.href = pngUrl;
        link.click();
        URL.revokeObjectURL(url);
    };
    img.src = url;
});
