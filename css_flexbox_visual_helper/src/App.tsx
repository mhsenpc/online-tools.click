import { useState, useMemo } from 'react';

interface FlexProps {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  gap: string;
  itemCount: number;
}

function App() {
  const [flexProps, setFlexProps] = useState<FlexProps>({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
    gap: '0',
    itemCount: 4
  });

  const [copied, setCopied] = useState(false);

  const containerStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: flexProps.flexDirection,
    justifyContent: flexProps.justifyContent,
    alignItems: flexProps.alignItems,
    flexWrap: flexProps.flexWrap,
    alignContent: flexProps.alignContent,
    gap: `${flexProps.gap}px`,
    minHeight: '300px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #333',
    borderRadius: '8px',
    margin: '20px 0',
    transition: 'all 0.3s ease'
  }), [flexProps]);

  const itemStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: '#ff6b6b',
    border: '2px solid #c92a2a',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '18px',
    flexShrink: 0
  };

  const cssCode = useMemo(() => {
    return `.container {
  display: flex;
  flex-direction: ${flexProps.flexDirection};
  justify-content: ${flexProps.justifyContent};
  align-items: ${flexProps.alignItems};
  flex-wrap: ${flexProps.flexWrap};
  align-content: ${flexProps.alignContent};
  gap: ${flexProps.gap}px;
}`;
  }, [flexProps]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateFlexProp = <K extends keyof FlexProps>(key: K, value: FlexProps[K]) => {
    setFlexProps(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#333',
        textAlign: 'center'
      }}>
        CSS Flexbox Visual Helper
      </h1>
      <p style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#666'
      }}>
        Adjust the controls below to see how flexbox properties affect layout
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Control Panel */}
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Control Panel</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              flex-direction:
            </label>
            <select
              value={flexProps.flexDirection}
              onChange={(e) => updateFlexProp('flexDirection', e.target.value as FlexProps['flexDirection'])}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              justify-content:
            </label>
            <select
              value={flexProps.justifyContent}
              onChange={(e) => updateFlexProp('justifyContent', e.target.value as FlexProps['justifyContent'])}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              align-items:
            </label>
            <select
              value={flexProps.alignItems}
              onChange={(e) => updateFlexProp('alignItems', e.target.value as FlexProps['alignItems'])}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              flex-wrap:
            </label>
            <select
              value={flexProps.flexWrap}
              onChange={(e) => updateFlexProp('flexWrap', e.target.value as FlexProps['flexWrap'])}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              align-content:
            </label>
            <select
              value={flexProps.alignContent}
              onChange={(e) => updateFlexProp('alignContent', e.target.value as FlexProps['alignContent'])}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="stretch">stretch</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              gap (px):
            </label>
            <input
              type="number"
              value={flexProps.gap}
              onChange={(e) => updateFlexProp('gap', e.target.value)}
              min="0"
              max="100"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Number of Items:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={() => updateFlexProp('itemCount', Math.max(1, flexProps.itemCount - 1))}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{flexProps.itemCount}</span>
              <button
                onClick={() => updateFlexProp('itemCount', Math.min(12, flexProps.itemCount + 1))}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Preview and Code */}
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>Live Preview</h2>
          <div style={containerStyle}>
            {Array.from({ length: flexProps.itemCount }, (_, i) => (
              <div key={i} style={itemStyle}>
                {i + 1}
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#333' }}>CSS Code</h2>
          <div style={{
            position: 'relative',
            backgroundColor: '#2d2d2d',
            borderRadius: '8px',
            padding: '1rem',
            overflow: 'auto'
          }}>
            <pre style={{
              margin: 0,
              color: '#f8f8f2',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              whiteSpace: 'pre-wrap'
            }}>
              {cssCode}
            </pre>
            <button
              onClick={copyToClipboard}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: copied ? '#51cf66' : '#339af0',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
            >
              {copied ? '✓ Copied!' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
