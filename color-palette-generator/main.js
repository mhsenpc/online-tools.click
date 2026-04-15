const imageInput = document.getElementById('image-input');
const paletteDisplay = document.getElementById('palette-display');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const palette = extractPalette(imageData.data);
            displayPalette(palette);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function extractPalette(data) {
    // Very simple palette extraction: pick random pixels for simplicity
    const palette = [];
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * (data.length / 4)) * 4;
        palette.push(`rgb(${data[index]}, ${data[index+1]}, ${data[index+2]})`);
    }
    return palette;
}

function displayPalette(palette) {
    paletteDisplay.innerHTML = '';
    palette.forEach(color => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.style.width = '100px';
        div.style.height = '100px';
        div.textContent = color;
        paletteDisplay.appendChild(div);
    });
}
