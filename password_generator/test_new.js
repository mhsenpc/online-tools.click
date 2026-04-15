
const words = []; // not used in random mode

function secureRandom(max) {
    return Math.floor(Math.random() * max);
}

function generatePassword(mode, options) {
    if (mode === 'random') {
        const length = options.length;
        const charset = {
            upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
            lower: 'abcdefghijkmnopqrstuvwxyz',
            numbers: '23456789',
            symbols: '!@#$%^&*'
        };
        
        if (!options.excludeAmbiguous) {
            charset.upper += 'IO';
            charset.lower += 'l';
            charset.numbers += '01';
        }

        let pool = '';
        let mandatoryChars = [];
        if (options.upper) {
            pool += charset.upper;
            mandatoryChars.push(charset.upper[secureRandom(charset.upper.length)]);
        }
        if (options.lower) {
            pool += charset.lower;
            mandatoryChars.push(charset.lower[secureRandom(charset.lower.length)]);
        }
        if (options.numbers) {
            pool += charset.numbers;
            mandatoryChars.push(charset.numbers[secureRandom(charset.numbers.length)]);
        }
        if (options.symbols) {
            pool += charset.symbols;
            mandatoryChars.push(charset.symbols[secureRandom(charset.symbols.length)]);
        }

        if (pool === '') return 'Select Options';

        let result = [...mandatoryChars];
        for (let i = mandatoryChars.length; i < length; i++) {
            result.push(pool[secureRandom(pool.length)]);
        }
        
        // Shuffle
        for (let i = result.length - 1; i > 0; i--) {
            const j = secureRandom(i + 1);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result.join('');
    }
    return '';
}

// Test case 1: Ensure at least one of each
const options = {length: 8, upper: true, lower: true, numbers: true, symbols: true, excludeAmbiguous: false};
const pw = generatePassword('random', options);
console.log('Generated:', pw);

let hasUpper = /[A-Z]/.test(pw);
let hasLower = /[a-z]/.test(pw);
let hasNumbers = /[0-9]/.test(pw);
let hasSymbols = /[^A-Za-z0-9]/.test(pw);

if (hasUpper && hasLower && hasNumbers && hasSymbols) {
    console.log('PASSED: All character types included.');
} else {
    console.error('FAILED: Missing character types:', {hasUpper, hasLower, hasNumbers, hasSymbols});
}
