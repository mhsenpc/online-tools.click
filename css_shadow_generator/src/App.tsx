import React, { useState, useMemo } from 'react';

interface ShadowParams {
  xOffset: number;
  yOffset: number;
  blur: number;
  spread: number;
  opacity: number;
  color: string;
  inset: boolean;
}

interface ShadowLayer extends ShadowParams {
  id: string;
}

const defaultShadow: ShadowParams = {
  xOffset: 10,
  yOffset: 10,
  blur: 20,
  spread: 0,
  opacity: 0.5,
  color: '#000000',
  inset: false,
};

const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const generateBoxShadowCSS = (layers: ShadowLayer[]): string => {
  return layers
    .map(layer => {
      const color = hexToRgba(layer.color, layer.opacity);
      const inset = layer.inset ? 'inset ' : '';
      return `${inset}${layer.xOffset}px ${layer.yOffset}px ${layer.blur}px ${layer.spread}px ${color}`;
    })
    .join(', ');
};

const generateTextShadowCSS = (layers: ShadowLayer[]): string => {
  return layers
    .map(layer => {
      const color = hexToRgba(layer.color, layer.opacity);
      return `${layer.xOffset}px ${layer.yOffset}px ${layer.blur}px ${color}`;
    })
    .join(', ');
};

function App() {
  const [mode, setMode] = useState<'box' | 'text'>('box');
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { ...defaultShadow, id: '1' },
  ]);
  const [copied, setCopied] = useState(false);

  const updateLayer = (id: string, updates: Partial<ShadowParams>) => {
    setLayers(layers.map(layer => (layer.id === id ? { ...layer, ...updates } : layer)));
  };

  const addLayer = () => {
    setLayers([...layers, { ...defaultShadow, id: Date.now().toString() }]);
  };

  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter(layer => layer.id !== id));
    }
  };

  const boxShadowCSS = useMemo(() => generateBoxShadowCSS(layers), [layers]);
  const textShadowCSS = useMemo(() => generateTextShadowCSS(layers), [layers]);

  const currentCSS = mode === 'box' ? `box-shadow: ${boxShadowCSS};` : `text-shadow: ${textShadowCSS};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Slider = ({ label, value, onChange, min, max, unit = '', step = 1 }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min: number;
    max: number;
    unit?: string;
    step?: number;
  }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <label style={{ color: '#e0e0e0', fontWeight: '500', fontSize: '0.9rem' }}>{label}</label>
        <span style={{ color: '#a0aec0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          background: '#2d2d2d',
          outline: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
        }}
      />
    </div>
  );

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      color: '#ffffff',
    }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          CSS Shadow Generator
        </h1>
        <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
          Visual tool to generate CSS box-shadow and text-shadow code
        </p>
      </div>

      {/* Mode Toggle */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
      }}>
        <button
          onClick={() => setMode('box')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: mode === 'box' ? '#667eea' : '#2d2d2d',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
        >
          Box Shadow
        </button>
        <button
          onClick={() => setMode('text')}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: mode === 'text' ? '#667eea' : '#2d2d2d',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
        >
          Text Shadow
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Preview Section */}
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#e0e0e0' }}>Preview</h2>
          <div style={{
            padding: '3rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {mode === 'box' ? (
              <div style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#667eea',
                borderRadius: '8px',
                boxShadow: boxShadowCSS,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}>
                Box Shadow
              </div>
            ) : (
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ffffff',
                textShadow: textShadowCSS,
                textAlign: 'center',
              }}>
                Text Shadow
              </div>
            )}
          </div>

          {/* CSS Output */}
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ color: '#e0e0e0', margin: 0 }}>CSS Code</h3>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: copied ? '#48bb78' : '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy CSS'}
              </button>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#a0aec0',
              wordBreak: 'break-all',
            }}>
              {currentCSS}
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#e0e0e0', margin: 0 }}>Controls</h2>
            <button
              onClick={addLayer}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#48bb78',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
              }}
            >
              + Add Layer
            </button>
          </div>

          <div style={{
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '0.5rem',
          }}>
            {layers.map((layer, index) => (
              <div
                key={layer.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1.5rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  border: '1px solid #333',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#e0e0e0', margin: 0 }}>Layer {index + 1}</h3>
                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(layer.id)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#c53030',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <Slider
                  label="X Offset"
                  value={layer.xOffset}
                  onChange={(val) => updateLayer(layer.id, { xOffset: val })}
                  min={-50}
                  max={50}
                  unit="px"
                />

                <Slider
                  label="Y Offset"
                  value={layer.yOffset}
                  onChange={(val) => updateLayer(layer.id, { yOffset: val })}
                  min={-50}
                  max={50}
                  unit="px"
                />

                <Slider
                  label="Blur Radius"
                  value={layer.blur}
                  onChange={(val) => updateLayer(layer.id, { blur: val })}
                  min={0}
                  max={100}
                  unit="px"
                />

                {mode === 'box' && (
                  <Slider
                    label="Spread Radius"
                    value={layer.spread}
                    onChange={(val) => updateLayer(layer.id, { spread: val })}
                    min={-50}
                    max={50}
                    unit="px"
                  />
                )}

                <Slider
                  label="Opacity"
                  value={layer.opacity}
                  onChange={(val) => updateLayer(layer.id, { opacity: val })}
                  min={0}
                  max={1}
                  step={0.01}
                />

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e0e0e0', fontWeight: '500', fontSize: '0.9rem' }}>
                    Color
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={layer.color}
                      onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                      style={{
                        width: '50px',
                        height: '40px',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                      }}
                    />
                    <input
                      type="text"
                      value={layer.color}
                      onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#2d2d2d',
                        color: '#e0e0e0',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                </div>

                {mode === 'box' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={layer.inset}
                      onChange={(e) => updateLayer(layer.id, { inset: e.target.checked })}
                      style={{ cursor: 'pointer' }}
                    />
                    <label style={{ color: '#e0e0e0', fontSize: '0.9rem', cursor: 'pointer' }}>
                      Inset Shadow
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        border: '1px solid #333',
      }}>
        <h3 style={{ marginTop: 0, color: '#e0e0e0' }}>Features:</h3>
        <ul style={{ color: '#a0aec0', lineHeight: '1.8' }}>
          <li><strong>Box Shadow & Text Shadow:</strong> Switch between box-shadow and text-shadow generation</li>
          <li><strong>Multiple Layers:</strong> Add multiple shadow layers for complex effects</li>
          <li><strong>Real-time Preview:</strong> See changes instantly as you adjust the sliders</li>
          <li><strong>Full Control:</strong> Adjust X/Y offset, blur radius, spread radius, opacity, and color</li>
          <li><strong>Inset Support:</strong> Create inner shadows with the inset toggle (box-shadow only)</li>
          <li><strong>One-Click Copy:</strong> Copy the generated CSS code to your clipboard</li>
          <li><strong>100% Client-Side:</strong> All processing happens in your browser</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
