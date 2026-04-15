import React, { useState, useEffect } from 'react';
import './index.css';

interface SyntaxHighlightProps {
  json: string;
}

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isMinified, setIsMinified] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const detectFormat = (jsonString: string): boolean => {
    return jsonString.includes('\n') && jsonString.includes(' ');
  };

  const process = (beautify: boolean) => {
    try {
      const data = JSON.parse(input);
      const result = JSON.stringify(data, null, beautify ? 2 : undefined);
      setOutput(result);
      setIsMinified(!beautify);
      setError('');
    } catch (e) {
      setError('Error: Invalid JSON - Please check your input');
      setOutput('');
    }
  };

  const autoProcess = () => {
    const shouldBeautify = !detectFormat(input);
    process(shouldBeautify);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsMinified(false);
  };

  // Auto-detect format when input changes
  useEffect(() => {
    if (input.trim()) {
      try {
        JSON.parse(input);
        setIsMinified(!detectFormat(input));
        setError('');
      } catch (e) {
        setError('Invalid JSON');
      }
    }
  }, [input]);

  const SyntaxHighlight: React.FC<SyntaxHighlightProps> = ({ json }) => {
    if (!json) return <div className="placeholder">Output will appear here...</div>;

    try {
      const obj = JSON.parse(json);
      const formatted = JSON.stringify(obj, null, 2);

      const highlighted = formatted.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });

      return <pre className="json-output" dangerouslySetInnerHTML={{ __html: highlighted }} />;
    } catch (e) {
      return <pre className="json-output">{json}</pre>;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>JSON Minifier & Beautifier</h1>
        <p className="subtitle">Auto-format, syntax highlight, and copy your JSON instantly</p>
      </div>

      <div className="workspace">
        <div className="panel input-panel">
          <div className="panel-header">
            <h2>Input</h2>
            <button className="clear-btn" onClick={clearAll} disabled={!input}>
              Clear
            </button>
          </div>
          <textarea
            className="input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type your JSON here..."
            spellCheck={false}
          />
          {error && <div className="error">{error}</div>}
        </div>

        <div className="controls">
          <button
            className="action-btn auto-btn"
            onClick={autoProcess}
            disabled={!input || !!error}
            title="Automatically detect and apply the opposite format"
          >
            Auto-Format
          </button>
          <button
            className="action-btn"
            onClick={() => process(true)}
            disabled={!input || !!error}
          >
            Beautify
          </button>
          <button
            className="action-btn"
            onClick={() => process(false)}
            disabled={!input || !!error}
          >
            Minify
          </button>
        </div>

        <div className="panel output-panel">
          <div className="panel-header">
            <h2>Output</h2>
            <div className="output-actions">
              {isMinified !== undefined && (
                <span className={`format-indicator ${isMinified ? 'minified' : 'beautified'}`}>
                  {isMinified ? 'Minified' : 'Beautified'}
                </span>
              )}
              <button
                className="copy-btn"
                onClick={copyToClipboard}
                disabled={!output}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="output-container">
            {output ? <SyntaxHighlight json={output} /> : <div className="placeholder">Output will appear here...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
