const container = document.getElementById('flex-container');
const directionSelect = document.getElementById('flex-direction');
const justifySelect = document.getElementById('justify-content');
const alignSelect = document.getElementById('align-items');
const cssOutput = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');

function updateStyles() {
    const direction = directionSelect.value;
    const justify = justifySelect.value;
    const align = alignSelect.value;

    container.style.flexDirection = direction;
    container.style.justifyContent = justify;
    container.style.alignItems = align;

    const css = `.flex-container {
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
}`;
    cssOutput.textContent = css;
}

[directionSelect, justifySelect, alignSelect].forEach(el => el.addEventListener('change', updateStyles));

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssOutput.textContent).then(() => {
        alert('Copied!');
    });
});

updateStyles();
