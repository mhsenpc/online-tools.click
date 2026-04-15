const hexInput = document.getElementById('hex-input');
const rgbInput = document.getElementById('rgb-input');
const preview = document.getElementById('preview');

hexInput.addEventListener('input', () => {
    const hex = hexInput.value.replace('#', '');
    if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        rgbInput.value = `rgb(${r}, ${g}, ${b})`;
        preview.style.backgroundColor = `#${hex}`;
    }
});

rgbInput.addEventListener('input', () => {
    const rgb = rgbInput.value.match(/\d+/g);
    if (rgb && rgb.length === 3) {
        const [r, g, b] = rgb.map(Number);
        const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        hexInput.value = '#' + hex;
        preview.style.backgroundColor = '#' + hex;
    }
});
