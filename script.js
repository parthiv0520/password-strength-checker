const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strength-text');
const strengthBar = document.getElementById('strength-bar');
const crackTimeText = document.getElementById('crack-time');
const feedback = document.getElementById('feedback').getElementsByTagName('p');
const togglePassword = document.getElementById('togglePassword');

const requirements = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
};

function checkPasswordStrength(password) {
    let strength = 0;
    let crackTime = "Unknown";

    if (requirements.length.test(password)) strength++;
    if (requirements.uppercase.test(password)) strength++;
    if (requirements.lowercase.test(password)) strength++;
    if (requirements.number.test(password)) strength++;
    if (requirements.special.test(password)) strength++;

    updateStrengthBar(strength);
    updateCrackTime(strength);

    return strength;
}

function updateStrengthBar(strength) {
    const strengthLevels = ['#ff0000', '#ff9800', '#ffeb3b', '#4caf50'];
    strengthText.textContent = `Strength: ${strength === 1 ? "Weak" : strength === 2 ? "Moderate" : strength === 3 ? "Strong" : strength === 4 ? "Very Strong" : "Excellent"}`;
    strengthBar.style.width = `${(strength / 5) * 100}%`;
    strengthBar.style.background = strengthLevels[strength - 1] || '#4caf50';
}

function updateCrackTime(strength) {
    const crackTimes = ["More than 1 hour", "Less than 1 hour", "Less than 10 minutes", "Less than 1 minute", "Instantly cracked"];
    crackTimeText.textContent = `Crack Time: ${crackTimes[strength - 1] || "More than 1 hour"}`;
}

function validateRequirements(password) {
    Array.from(feedback).forEach((item, index) => {
        const requirement = Object.values(requirements)[index];
        if (requirement.test(password)) {
            item.classList.add('valid');
        } else {
            item.classList.remove('valid');
        }
    });
}

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    validateRequirements(password);
});

togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'Show';
    }
});
