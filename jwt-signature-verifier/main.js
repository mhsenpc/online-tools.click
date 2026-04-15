const jwtInput = document.getElementById('jwt-input');
const algorithmSelect = document.getElementById('algorithm');
const keyInput = document.getElementById('key-input');
const verifyBtn = document.getElementById('verify-btn');
const clearBtn = document.getElementById('clear-btn');
const resultDiv = document.getElementById('result');

// Base64URL decode helper
function base64UrlDecode(str) {
    // Add padding if needed
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return atob(str);
}

// Parse JWT into components
function parseJWT(jwt) {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have exactly 3 parts separated by dots.');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    return { header, payload, signature, raw: jwt };
}

// Convert Base64URL to ArrayBuffer
function base64UrlToArrayBuffer(base64Url) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

// Verify HMAC signature
async function verifyHMAC(jwt, key, algorithm) {
    const parts = jwt.split('.');
    const data = `${parts[0]}.${parts[1]}`;
    const signature = parts[2];

    const hashAlgorithm = {
        'HS256': 'SHA-256',
        'HS384': 'SHA-384',
        'HS512': 'SHA-512'
    }[algorithm];

    if (!hashAlgorithm) {
        throw new Error(`Unsupported HMAC algorithm: ${algorithm}`);
    }

    // Import key
    const encoder = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(key),
        { name: 'HMAC', hash: hashAlgorithm },
        false,
        ['verify']
    );

    // Verify signature
    const signatureBuffer = base64UrlToArrayBuffer(signature);
    const dataBuffer = encoder.encode(data);

    return await crypto.subtle.verify(
        'HMAC',
        cryptoKey,
        signatureBuffer,
        dataBuffer
    );
}

// Verify RSA/ECDSA signature
async function verifyAsymmetric(jwt, publicKeyPem, algorithm) {
    const parts = jwt.split('.');
    const data = `${parts[0]}.${parts[1]}`;
    const signature = parts[2];

    // Extract the base64-encoded key data from PEM format
    const pemContents = publicKeyPem
        .replace(/-----BEGIN PUBLIC KEY-----/g, '')
        .replace(/-----END PUBLIC KEY-----/g, '')
        .replace(/\s/g, '');

    const keyData = base64UrlToArrayBuffer(pemContents);

    let algorithmName;
    let namedCurve;
    let hash;

    if (algorithm === 'RS256') {
        algorithmName = 'RSASSA-PKCS1-v1_5';
        hash = 'SHA-256';
    } else if (algorithm === 'ES256') {
        algorithmName = 'ECDSA';
        namedCurve = 'P-256';
        hash = 'SHA-256';
    } else {
        throw new Error(`Unsupported asymmetric algorithm: ${algorithm}`);
    }

    // Import public key
    const cryptoKey = await crypto.subtle.importKey(
        'spki',
        keyData,
        {
            name: algorithmName,
            hash: hash,
            namedCurve: namedCurve
        },
        false,
        ['verify']
    );

    // Verify signature
    const signatureBuffer = base64UrlToArrayBuffer(signature);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    return await crypto.subtle.verify(
        {
            name: algorithmName,
            hash: hash
        },
        cryptoKey,
        signatureBuffer,
        dataBuffer
    );
}

// Display result
function showResult(type, message) {
    resultDiv.className = `result ${type}`;

    let icon = '';
    if (type === 'valid') {
        icon = '<div class="result-icon">✓</div>';
    } else if (type === 'invalid') {
        icon = '<div class="result-icon">✗</div>';
    } else {
        icon = '<div class="result-icon">⚠</div>';
    }

    resultDiv.innerHTML = `${icon}<div>${message}</div>`;
}

// Main verification function
async function verifySignature() {
    const jwt = jwtInput.value.trim();
    const algorithm = algorithmSelect.value;
    const key = keyInput.value.trim();

    // Validation
    if (!jwt) {
        showResult('error', 'Please enter a JWT token.');
        return;
    }

    if (!key) {
        showResult('error', 'Please enter a secret or public key.');
        return;
    }

    try {
        // Parse JWT
        const jwtData = parseJWT(jwt);

        // Verify algorithm matches header
        if (jwtData.header.alg !== algorithm) {
            showResult('error', `Algorithm mismatch. JWT header specifies "${jwtData.header.alg}" but you selected "${algorithm}".`);
            return;
        }

        let isValid;
        const algorithmType = algorithm.substring(0, 2);

        if (algorithmType === 'HS') {
            // HMAC algorithms
            isValid = await verifyHMAC(jwt, key, algorithm);
        } else if (algorithmType === 'RS' || algorithmType === 'ES') {
            // RSA/ECDSA algorithms
            isValid = await verifyAsymmetric(jwt, key, algorithm);
        } else {
            throw new Error(`Unsupported algorithm: ${algorithm}`);
        }

        if (isValid) {
            showResult('valid', '✓ Signature is valid! This token is authentic.');
        } else {
            showResult('invalid', '✗ Signature is invalid. This token may have been tampered with.');
        }

    } catch (error) {
        showResult('error', `Error: ${error.message}`);
    }
}

// Clear form
function clearForm() {
    jwtInput.value = '';
    keyInput.value = '';
    algorithmSelect.selectedIndex = 0;
    resultDiv.className = 'result';
    resultDiv.style.display = 'none';
}

// Event listeners
verifyBtn.addEventListener('click', verifySignature);
clearBtn.addEventListener('click', clearForm);

// Auto-detect algorithm from JWT header
jwtInput.addEventListener('input', () => {
    const jwt = jwtInput.value.trim();
    try {
        const jwtData = parseJWT(jwt);
        const alg = jwtData.header.alg;

        // Update algorithm select if the value exists
        const options = Array.from(algorithmSelect.options);
        const matchingOption = options.find(opt => opt.value === alg);

        if (matchingOption) {
            algorithmSelect.value = alg;
        }
    } catch (error) {
        // Ignore parsing errors while typing
    }
});