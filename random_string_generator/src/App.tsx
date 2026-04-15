import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [result, setResult] = useState('');
  const [entropy, setEntropy] = useState(0);

  const calculateEntropy = (len: number, pool: number) => {
    if (pool === 0) return 0;
    return Math.floor(len * Math.log2(pool));
  };

  const generate = useCallback(() => {
    let charset = '';
    let pool = 0;
    if (useUpper) { charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; pool += 26; }
    if (useLower) { charset += 'abcdefghijklmnopqrstuvwxyz'; pool += 26; }
    if (useNumbers) { charset += '0123456789'; pool += 10; }
    if (useSymbols) { charset += '!@#$%^&*()_+~`|}{[]:;?><,./-='; pool += 32; }

    if (charset === '') {
      setResult('Select at least one character set');
      setEntropy(0);
      return;
    }

    const secureRandom = (max: number) => {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    };

    let retVal = '';
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(secureRandom(charset.length));
    }
    setResult(retVal);
    setEntropy(calculateEntropy(length, pool));
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <a href="https://online-tools.click" className="logo">Online Tools</a>
          <span className="logo-sep"> / </span>
          <span className="logo-sub">Random String Generator</span>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Secure Random String Generator</h1>
          <p>Generate cryptographically secure random strings or secrets in the browser. 100% client-side.</p>
        </section>

        <div className="result-container">
          <div className="main-result">
            <div className="password-display" onClick={() => navigator.clipboard.writeText(result)} title="Click to copy">
              {result || '...'}
            </div>
            <button className="btn-generate" onClick={generate} title="Generate New">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
            </button>
          </div>
          <div className="strength-text">
            <span className="strength-label">Entropy</span>
            <span className="strength-value">{entropy} bits</span>
          </div>
        </div>

        <div className="settings-grid">
          <div className="setting-group">
            <label className="setting-label">Length</label>
            <div className="length-control">
              <input type="range" className="length-slider" min="1" max="128" value={length} onChange={(e) => setLength(Number(e.target.value))} />
              <span className="length-number">{length}</span>
            </div>
          </div>

          <div className="setting-group">
            <label className="setting-label">Characters</label>
            <div className="checkbox-group">
              <label className={`checkbox-item ${useUpper ? 'active' : ''}`}>
                <span className="checkbox-text">Uppercase Letters</span>
                <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
              </label>
              <label className={`checkbox-item ${useLower ? 'active' : ''}`}>
                <span className="checkbox-text">Lowercase Letters</span>
                <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
              </label>
              <label className={`checkbox-item ${useNumbers ? 'active' : ''}`}>
                <span className="checkbox-text">Numbers</span>
                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
              </label>
              <label className={`checkbox-item ${useSymbols ? 'active' : ''}`}>
                <span className="checkbox-text">Symbols</span>
                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
