
const words = ["apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "harbor", "island", "jungle", "knight", "lemon", "mountain", "nebula", "ocean", "planet", "quartz", "river", "shadow", "tiger", "umbra", "valley", "wizard", "xenon", "yacht", "zebra", "atlas", "beacon", "castle", "desert", "echo", "frost", "glacier", "horizon", "iron", "jade", "kite", "lunar", "mist", "night", "opal", "pulse", "quiver", "radar", "solar", "tundra", "vortex", "willow", "yarn", "zenith", "alpha", "bravo", "clock", "drift", "ember", "flame", "grape", "haste", "ink", "joy", "karma", "leaf", "maze", "node", "olive", "petal", "quark", "rust", "stone", "tide", "unit", "valve", "wave", "xray", "yoga", "zone", "amber", "blade", "cloud", "dusk", "earth", "field", "gold", "house", "ice", "jump", "key", "lake", "moon", "nest", "oak", "pearl", "quest", "rain", "star", "tree", "vibe", "wind", "zinc"];

function secureRandom(max) {
    // simplified for node
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
        if (options.upper) pool += charset.upper;
        if (options.lower) pool += charset.lower;
        if (options.numbers) pool += charset.numbers;
        if (options.symbols) pool += charset.symbols;

        if (pool === '') return 'Select Options';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += pool[secureRandom(pool.length)];
        }
        return result;
    }
    return '';
}

// Test case 1: Basic password
console.log('Basic:', generatePassword('random', {length: 16, upper: true, lower: true, numbers: true, symbols: true, excludeAmbiguous: false}));

// Test case 2: Exclude ambiguous
const pw = generatePassword('random', {length: 16, upper: true, lower: true, numbers: true, symbols: true, excludeAmbiguous: true});
console.log('No Ambiguous:', pw);
if (/[IOl01]/.test(pw)) {
    console.error('FAILED: Ambiguous characters found!');
} else {
    console.log('PASSED: No ambiguous characters found.');
}
