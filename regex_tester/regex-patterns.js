// Regex Pattern Library - Common validated patterns
const REGEX_PATTERNS = [
    {
        name: 'Email (RFC 5322)',
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        description: 'Matches standard email addresses',
        example: 'user@example.com',
        flags: 'g'
    },
    {
        name: 'URL (HTTP/HTTPS)',
        pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
        description: 'Matches HTTP and HTTPS URLs',
        example: 'https://www.example.com/path?query=value',
        flags: 'gi'
    },
    {
        name: 'IPv4 Address',
        pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
        description: 'Matches valid IPv4 addresses',
        example: '192.168.1.1',
        flags: 'g'
    },
    {
        name: 'IPv6 Address',
        pattern: '(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))',
        description: 'Matches valid IPv6 addresses',
        example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        flags: 'gi'
    },
    {
        name: 'Phone (International)',
        pattern: '\\+?[1-9]\\d{1,14}',
        description: 'Matches international phone numbers (E.164)',
        example: '+14155552671',
        flags: 'g'
    },
    {
        name: 'Phone (US)',
        pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
        description: 'Matches US phone numbers in various formats',
        example: '(415) 555-2671 or 415-555-2671',
        flags: 'g'
    },
    {
        name: 'Credit Card (Generic)',
        pattern: '\\b(?:\\d{4}[- ]?){3}\\d{4}\\b',
        description: 'Matches credit card numbers (use Luhn validation separately)',
        example: '4111-1111-1111-1111 or 4111111111111111',
        flags: 'g'
    },
    {
        name: 'Date (YYYY-MM-DD)',
        pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])\\b',
        description: 'Matches ISO 8601 date format',
        example: '2024-01-15',
        flags: 'g'
    },
    {
        name: 'Date (MM/DD/YYYY)',
        pattern: '\\b(?:0[1-9]|1[0-2])\\/(?:0[1-9]|[12][0-9]|3[01])\\/\\d{4}\\b',
        description: 'Matches US date format',
        example: '01/15/2024',
        flags: 'g'
    },
    {
        name: 'Date (DD/MM/YYYY)',
        pattern: '\\b(?:0[1-9]|[12][0-9]|3[01])\\/(?:0[1-9]|1[0-2])\\/\\d{4}\\b',
        description: 'Matches European date format',
        example: '15/01/2024',
        flags: 'g'
    },
    {
        name: 'Time (24-hour)',
        pattern: '\\b(?:[01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\\b',
        description: 'Matches 24-hour time format',
        example: '14:30 or 14:30:45',
        flags: 'g'
    },
    {
        name: 'Hex Color',
        pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
        description: 'Matches hex color codes',
        example: '#FF5733 or #F57',
        flags: 'gi'
    },
    {
        name: 'UUID',
        pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
        description: 'Matches UUID/GUID',
        example: '550e8400-e29b-41d4-a716-446655440000',
        flags: 'gi'
    },
    {
        name: 'SSN (US)',
        pattern: '\\b\\d{3}-\\d{2}-\\d{4}\\b',
        description: 'Matches US Social Security Numbers',
        example: '123-45-6789',
        flags: 'g'
    },
    {
        name: 'Postal Code (US ZIP)',
        pattern: '\\b\\d{5}(?:-\\d{4})?\\b',
        description: 'Matches US ZIP codes',
        example: '94102 or 94102-1234',
        flags: 'g'
    },
    {
        name: 'Postal Code (UK)',
        pattern: '([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})',
        description: 'Matches UK postal codes',
        example: 'SW1A 1AA',
        flags: 'g'
    },
    {
        name: 'Postal Code (Canada)',
        pattern: '[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d',
        description: 'Matches Canadian postal codes',
        example: 'K1A 0B1',
        flags: 'gi'
    },
    {
        name: 'Username',
        pattern: '^[a-zA-Z0-9_-]{3,16}$',
        description: 'Matches username (3-16 chars, alphanumeric, underscore, hyphen)',
        example: 'user_name-123',
        flags: ''
    },
    {
        name: 'Password (Strong)',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        description: 'Requires min 8 chars, uppercase, lowercase, digit, special char',
        example: 'P@ssw0rd',
        flags: ''
    },
    {
        name: 'HTML Tag',
        pattern: '<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)',
        description: 'Matches HTML tags',
        example: '<div>content</div> or <br />',
        flags: 'gi'
    },
    {
        name: 'Markdown Link',
        pattern: '\\[([^\\]]+)\\]\\(([^\\)]+)\\)',
        description: 'Matches markdown links',
        example: '[Link Text](https://example.com)',
        flags: 'g'
    },
    {
        name: 'Bitcoin Address',
        pattern: '\\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\\b',
        description: 'Matches Bitcoin addresses',
        example: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        flags: 'g'
    },
    {
        name: 'MAC Address',
        pattern: '([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})',
        description: 'Matches MAC addresses',
        example: '00:1B:44:11:3A:B7',
        flags: 'gi'
    },
    {
        name: 'Semantic Version',
        pattern: '\\bv?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?\\b',
        description: 'Matches semantic versioning',
        example: 'v1.2.3 or 2.0.0-beta.1',
        flags: 'g'
    },
    {
        name: 'File Path (Unix)',
        pattern: '^\\/(?:[^\\/\\0]+\\/?)+$',
        description: 'Matches Unix-style file paths',
        example: '/home/user/documents/file.txt',
        flags: ''
    },
    {
        name: 'File Path (Windows)',
        pattern: '^[a-zA-Z]:\\\\(?:[^\\\\\\/:*?"<>|\\r\\n]+\\\\)*[^\\\\\\/:*?"<>|\\r\\n]*$',
        description: 'Matches Windows-style file paths',
        example: 'C:\\Users\\Documents\\file.txt',
        flags: ''
    },
    {
        name: 'Twitter Handle',
        pattern: '@[A-Za-z0-9_]{1,15}\\b',
        description: 'Matches Twitter/X handles',
        example: '@username',
        flags: 'g'
    },
    {
        name: 'Hashtag',
        pattern: '#[A-Za-z0-9_]+\\b',
        description: 'Matches hashtags',
        example: '#example',
        flags: 'g'
    },
    {
        name: 'JSON String',
        pattern: '"([^"\\\\]|\\\\.)*"',
        description: 'Matches JSON strings',
        example: '"hello world" or "escaped\\"quote"',
        flags: 'g'
    }
];

// Get all patterns
function getPatterns() {
    const savedPatterns = localStorage.getItem('regexCustomPatterns');
    const customPatterns = savedPatterns ? JSON.parse(savedPatterns) : [];
    return [...REGEX_PATTERNS, ...customPatterns];
}

// Save a custom pattern
function savePattern(name, pattern, description, flags) {
    const savedPatterns = localStorage.getItem('regexCustomPatterns');
    const customPatterns = savedPatterns ? JSON.parse(savedPatterns) : [];

    customPatterns.push({
        name,
        pattern,
        description,
        flags: flags || 'g',
        custom: true
    });

    localStorage.setItem('regexCustomPatterns', JSON.stringify(customPatterns));
}

// Delete a custom pattern
function deletePattern(index) {
    const savedPatterns = localStorage.getItem('regexCustomPatterns');
    const customPatterns = savedPatterns ? JSON.parse(savedPatterns) : [];

    customPatterns.splice(index, 1);
    localStorage.setItem('regexCustomPatterns', JSON.stringify(customPatterns));
}

// Export patterns
function exportPatterns() {
    const savedPatterns = localStorage.getItem('regexCustomPatterns');
    const customPatterns = savedPatterns ? JSON.parse(savedPatterns) : [];

    const dataStr = JSON.stringify(customPatterns, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'regex-patterns.json';
    link.click();

    URL.revokeObjectURL(url);
}

// Import patterns
function importPatterns(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const patterns = JSON.parse(e.target.result);

                if (!Array.isArray(patterns)) {
                    reject(new Error('Invalid format: expected an array'));
                    return;
                }

                const savedPatterns = localStorage.getItem('regexCustomPatterns');
                const customPatterns = savedPatterns ? JSON.parse(savedPatterns) : [];

                patterns.forEach(p => {
                    if (p.name && p.pattern) {
                        customPatterns.push({
                            name: p.name,
                            pattern: p.pattern,
                            description: p.description || '',
                            flags: p.flags || 'g',
                            custom: true
                        });
                    }
                });

                localStorage.setItem('regexCustomPatterns', JSON.stringify(customPatterns));
                resolve(patterns.length);
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

// Share pattern via URL
function sharePattern(pattern, flags) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('pattern', pattern);
    if (flags) params.set('flags', flags);

    return baseUrl + '?' + params.toString();
}

// Load pattern from URL
function loadPatternFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const pattern = params.get('pattern');
    const flags = params.get('flags');

    if (pattern) {
        return { pattern, flags: flags || 'g' };
    }

    return null;
}
