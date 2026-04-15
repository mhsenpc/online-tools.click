const svgInput = document.getElementById('svg-input');
const fileInput = document.getElementById('file-input');
const convertBtn = document.getElementById('convert-btn');
const scaleInput = document.getElementById('scale-input');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const bgInput = document.getElementById('bg-input');
const preview = document.getElementById('preview');
const dropZone = document.getElementById('drop-zone');

const updatePreview = () => {
    const svgCode = svgInput.value;
    const blob = new Blob([svgCode], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    preview.onload = () => {
        widthInput.value = preview.naturalWidth;
        heightInput.value = preview.naturalHeight;
    };
    preview.src = url;
    preview.style.backgroundColor = bgInput.value === 'transparent' ? 'transparent' : bgInput.value;
};

svgInput.addEventListener('input', updatePreview);
bgInput.addEventListener('change', updatePreview);

const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        svgInput.value = event.target.result;
        updatePreview();
    };
    reader.readAsText(file);
};

fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

scaleInput.addEventListener('input', () => {
    const scale = parseFloat(scaleInput.value) || 1;
    if (preview.naturalWidth) {
        widthInput.value = Math.round(preview.naturalWidth * scale);
        heightInput.value = Math.round(preview.naturalHeight * scale);
    }
});

// Drag and Drop support
const dropHandler = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
};

const dragOverHandler = (e) => {
    e.preventDefault();
};

if (dropZone) {
    dropZone.addEventListener('drop', dropHandler);
    dropZone.addEventListener('dragover', dragOverHandler);
}

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
        
        if (bgInput.value !== 'transparent') {
            ctx.fillStyle = bgInput.value;
            ctx.fillRect(0, 0, width, height);
        }
        
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
