import { useState, useMemo } from 'react';
import './index.css';

type ConversionType = 'spaces-to-tabs' | 'tabs-to-spaces';

function App() {
  const [input, setInput] = useState('');
  const [conversionType, setConversionType] = useState<ConversionType>('spaces-to-tabs');
  const [spacesPerTab, setSpacesPerTab] = useState<number>(2);
  const [trimTrailing, setTrimTrailing] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const output = useMemo(() => {
    if (!input) return '';

    let result = input;

    if (conversionType === 'spaces-to-tabs') {
      // Convert spaces to tabs
      const spaces = ' '.repeat(spacesPerTab);
      const regex = new RegExp(spaces, 'g');
      result = result.replace(regex, '\t');
    } else {
      // Convert tabs to spaces
      result = result.replace(/\t/g, ' '.repeat(spacesPerTab));
    }

    if (trimTrailing) {
      result = result.split('\n').map(line => line.trimEnd()).join('\n');
    }

    return result;
  }, [input, conversionType, spacesPerTab, trimTrailing]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const stats = useMemo(() => {
    if (!input) return null;

    const inputLines = input.split('\n').length;
    const outputLines = output.split('\n').length;
    const inputTabs = (input.match(/\t/g) || []).length;
    const outputTabs = (output.match(/\t/g) || []).length;
    const inputSpaces = (input.match(/ /g) || []).length;
    const outputSpaces = (output.match(/ /g) || []).length;

    return {
      inputLines,
      outputLines,
      inputTabs,
      outputTabs,
      inputSpaces,
      outputSpaces,
    };
  }, [input, output]);

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Whitespace & Tab Converter</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
          Convert between space-based and tab-based indentation in code snippets
        </p>
      </header>

      {/* Config Toolbar */}
      <div style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div>
          <label style={{ marginRight: '0.5rem', fontWeight: 500 }}>Conversion:</label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value as ConversionType)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="spaces-to-tabs">Spaces → Tabs</option>
            <option value="tabs-to-spaces">Tabs → Spaces</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '0.5rem', fontWeight: 500 }}>Spaces per Tab:</label>
          <select
            value={spacesPerTab}
            onChange={(e) => setSpacesPerTab(Number(e.target.value))}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value={2}>2 spaces</option>
            <option value={3}>3 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="trim"
            checked={trimTrailing}
            onChange={(e) => setTrimTrailing(e.target.checked)}
            style={{ marginRight: '0.5rem' }}
          />
          <label htmlFor="trim" style={{ fontWeight: 500 }}>Trim trailing whitespace</label>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          <strong>Stats:</strong> Lines: {stats.inputLines} → {stats.outputLines} |
          Tabs: {stats.inputTabs} → {stats.outputTabs} |
          Spaces: {stats.inputSpaces} → {stats.outputSpaces}
        </div>
      )}

      {/* Input/Output Editors */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1,
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <label style={{ fontWeight: 500 }}>Input:</label>
            <button
              onClick={() => setInput('')}
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '12px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your code here..."
            style={{
              width: '100%',
              height: '500px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              border: '1px solid #ccc',
              borderRadius: '8px',
              resize: 'vertical',
              backgroundColor: 'white'
            }}
          />
        </div>

        <div style={{
          flex: 1,
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <label style={{ fontWeight: 500 }}>Output:</label>
            <button
              onClick={handleCopy}
              disabled={!output}
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '12px',
                backgroundColor: copySuccess ? '#4caf50' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: output ? 'pointer' : 'not-allowed',
                opacity: output ? 1 : 0.5
              }}
            >
              {copySuccess ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            style={{
              width: '100%',
              height: '500px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.5',
              border: '1px solid #ccc',
              borderRadius: '8px',
              resize: 'vertical',
              backgroundColor: '#f8f8f8'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
