const urlInput = document.getElementById('url-input');
const testBtn = document.getElementById('test-btn');
const resultsDiv = document.getElementById('results');
const followRedirectsCheckbox = document.getElementById('follow-redirects');
const showHeadersCheckbox = document.getElementById('show-headers');

const MAX_REDIRECTS = 10;
const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
];

let abortController = null;

// Test URL button click handler
testBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();

    if (!url) {
        showError('Please enter a URL to test');
        return;
    }

    if (!isValidUrl(url)) {
        showError('Please enter a valid URL (include http:// or https://)');
        return;
    }

    // Cancel any existing request
    if (abortController) {
        abortController.abort();
    }

    abortController = new AbortController();
    const followRedirects = followRedirectsCheckbox.checked;
    const showHeaders = showHeadersCheckbox.checked;

    testBtn.disabled = true;
    testBtn.textContent = 'Testing...';
    resultsDiv.innerHTML = '<div class="loading">Tracing redirects</div>';

    try {
        const chain = await traceRedirectChain(url, followRedirects, abortController.signal);
        displayResults(chain, showHeaders);
    } catch (error) {
        if (error.name === 'AbortError') {
            resultsDiv.innerHTML = '';
        } else {
            showError(error.message);
        }
    } finally {
        testBtn.disabled = false;
        testBtn.textContent = 'Test URL';
        abortController = null;
    }
});

// Allow Enter key to trigger test
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        testBtn.click();
    }
});

// Validate URL format
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Trace redirect chain
async function traceRedirectChain(initialUrl, followRedirects, signal) {
    const chain = [];
    let currentUrl = initialUrl;
    let redirectCount = 0;
    let visitedUrls = new Set();

    while (redirectCount < MAX_REDIRECTS) {
        if (signal.aborted) {
            throw new DOMException('Aborted', 'AbortError');
        }

        // Check for circular redirects
        if (visitedUrls.has(currentUrl)) {
            chain.push({
                url: currentUrl,
                status: 0,
                error: 'Circular redirect detected',
                isCircular: true
            });
            break;
        }
        visitedUrls.add(currentUrl);

        try {
            const result = await fetchWithRedirect(currentUrl, signal);

            chain.push({
                url: currentUrl,
                status: result.status,
                statusText: result.statusText,
                headers: result.headers,
                contentType: result.headers['content-type'] || '',
                finalUrl: result.finalUrl || currentUrl
            });

            // Check if we're done (no redirect or not following redirects)
            if (!result.redirectUrl || !followRedirects) {
                break;
            }

            currentUrl = result.redirectUrl;
            redirectCount++;

        } catch (error) {
            chain.push({
                url: currentUrl,
                status: 0,
                error: error.message,
                isError: true
            });
            break;
        }
    }

    // Check if we hit the max redirect limit
    if (redirectCount >= MAX_REDIRECTS) {
        chain.push({
            url: currentUrl,
            status: 0,
            error: `Too many redirects (max: ${MAX_REDIRECTS})`,
            isMaxRedirects: true
        });
    }

    return chain;
}

// Fetch with redirect detection using CORS proxy
async function fetchWithRedirect(url, signal) {
    let lastError = null;

    // Try each CORS proxy until one works
    for (const proxy of CORS_PROXIES) {
        try {
            const proxyUrl = proxy + encodeURIComponent(url);

            const response = await fetch(proxyUrl, {
                method: 'GET',
                signal: signal,
                redirect: 'manual' // Don't auto-follow redirects
            });

            const status = response.status;
            const statusText = response.statusText;
            const headers = {};

            // Extract headers from response
            response.headers.forEach((value, key) => {
                headers[key] = value;
            });

            // Check for redirect status codes
            if ([301, 302, 303, 307, 308].includes(status)) {
                const locationHeader = response.headers.get('location');
                if (locationHeader) {
                    // Resolve relative URLs
                    const redirectUrl = new URL(locationHeader, url).toString();
                    return {
                        status,
                        statusText,
                        headers,
                        redirectUrl: redirectUrl
                    };
                }
            }

            // Not a redirect or no location header
            return {
                status,
                statusText,
                headers,
                finalUrl: url
            };

        } catch (error) {
            lastError = error;
            // Try next proxy
            continue;
        }
    }

    // All proxies failed
    throw lastError || new Error('Failed to fetch URL (CORS proxy unavailable)');
}

// Display results
function displayResults(chain, showHeaders) {
    if (chain.length === 0) {
        showError('No results returned');
        return;
    }

    let html = '';

    // Check for warnings
    const lastStep = chain[chain.length - 1];
    if (lastStep.isCircular) {
        html += '<div class="warning">⚠️ Circular redirect detected - the URL chain loops back to a previously visited URL</div>';
    } else if (lastStep.isMaxRedirects) {
        html += `<div class="warning">⚠️ Exceeded maximum redirect limit (${MAX_REDIRECTS} hops)</div>`;
    }

    // Show stats
    const redirectHops = chain.filter(step =>
        [301, 302, 303, 307, 308].includes(step.status)
    ).length;

    const successStep = chain.find(step => step.status === 200);
    const errorStep = chain.find(step => step.isError);

    html += '<div class="stats">';
    html += `<div class="stat-card"><div class="stat-label">Total Hops</div><div class="stat-value">${chain.length}</div></div>`;
    html += `<div class="stat-card"><div class="stat-label">Redirects</div><div class="stat-value">${redirectHops}</div></div>`;
    html += `<div class="stat-card"><div class="stat-label">Status</div><div class="stat-value">${successStep ? '✓' : '✗'}</div></div>`;
    html += '</div>';

    // Show redirect chain
    html += '<div class="redirect-chain">';

    chain.forEach((step, index) => {
        html += '<div class="redirect-step">';
        html += `<div class="step-number">Step ${index + 1}</div>`;

        if (step.isError || step.isCircular || step.isMaxRedirects) {
            html += `<div class="url">${escapeHtml(step.url)}</div>`;
            html += `<div class="status-code status-error">${step.error || 'Error'}</div>`;
        } else {
            const statusClass = `status-${step.status}`;
            html += `<div class="url">${escapeHtml(step.url)}</div>`;
            html += `<div class="status-code ${statusClass}">${step.status} ${step.statusText}</div>`;

            if (step.contentType) {
                html += `<div class="meta-info">Content-Type: ${escapeHtml(step.contentType)}</div>`;
            }

            if (showHeaders && Object.keys(step.headers).length > 0) {
                html += '<div class="meta-info" style="margin-top: 12px;"><strong>Response Headers:</strong></div>';
                Object.entries(step.headers).forEach(([key, value]) => {
                    html += `<div class="meta-info">${escapeHtml(key)}: ${escapeHtml(value)}</div>`;
                });
            }
        }

        html += '</div>';
    });

    html += '</div>';

    // Show final destination if successful
    if (successStep) {
        html += '<div class="final-destination">';
        html += '<h3>🎯 Final Destination</h3>';
        html += `<div class="final-url">${escapeHtml(successStep.finalUrl || successStep.url)}</div>`;
        html += '<div class="page-title">Successfully reached destination</div>';
        html += '</div>';
    } else if (errorStep) {
        html += '<div class="error">❌ Failed to reach final destination</div>';
    }

    resultsDiv.innerHTML = html;
}

// Show error message
function showError(message) {
    resultsDiv.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
