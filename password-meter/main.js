const passwordInput = document.getElementById('password-input');
const strengthBar = document.getElementById('strength-bar');
const feedback = document.getElementById('feedback');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = calculateStrength(password);
    updateUI(strength);
});

function calculateStrength(password) {
    let score = 0;
    if (password.length > 8) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    return score;
}

function updateUI(score) {
    strengthBar.style.width = score + '%';
    if (score < 40) {
        strengthBar.style.backgroundColor = 'red';
        feedback.textContent = 'Weak';
    } else if (score < 80) {
        strengthBar.style.backgroundColor = 'orange';
        feedback.textContent = 'Moderate';
    } else {
        strengthBar.style.backgroundColor = 'green';
        feedback.textContent = 'Strong';
    }
}
