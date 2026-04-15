const controls = ['x', 'y', 'blur', 'spread', 'color', 'opacity'];
const previewBox = document.getElementById('preview-box');
const cssOutput = document.getElementById('css-output');
const copyBtn = document.getElementById('copy-btn');

controls.forEach(id => {
    document.getElementById(id).addEventListener('input', updateShadow);
});

function updateShadow() {
    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;
    const blur = document.getElementById('blur').value;
    const spread = document.getElementById('spread').value;
    const color = document.getElementById('color').value;
    const opacity = document.getElementById('opacity').value;

    const shadow = `${x}px ${y}px ${blur}px ${spread}px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    const fullRule = `box-shadow: ${shadow};`;
    
    previewBox.style.boxShadow = shadow;
    cssOutput.value = fullRule;
}

copyBtn.addEventListener('click', () => {
    cssOutput.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
});

updateShadow();
