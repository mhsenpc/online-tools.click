import { useState } from 'react';
import './index.css';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';
type GridType = 'css-grid' | 'flexbox';

interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
  align: 'start' | 'center' | 'end' | 'stretch';
  justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
}

interface BreakpointConfig extends GridConfig {
  width: string;
}

function App() {
  const [gridType, setGridType] = useState<GridType>('css-grid');
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop');
  const [copied, setCopied] = useState(false);

  const [breakpoints, setBreakpoints] = useState<Record<Breakpoint, BreakpointConfig>>({
    mobile: { columns: 1, rows: 2, gap: 16, align: 'stretch', justify: 'start', width: '375px' },
    tablet: { columns: 2, rows: 2, gap: 16, align: 'stretch', justify: 'start', width: '768px' },
    desktop: { columns: 3, rows: 2, gap: 24, align: 'stretch', justify: 'start', width: '1200px' },
  });

  const currentConfig = breakpoints[activeBreakpoint];

  const updateConfig = (key: keyof GridConfig, value: any) => {
    setBreakpoints(prev => ({
      ...prev,
      [activeBreakpoint]: { ...prev[activeBreakpoint], [key]: value }
    }));
  };

  const generateCSS = () => {
    if (gridType === 'css-grid') {
      let css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${currentConfig.columns}, 1fr);
  grid-template-rows: repeat(${currentConfig.rows}, 1fr);
  gap: ${currentConfig.gap}px;
  align-items: ${currentConfig.align};
  justify-items: ${currentConfig.justify};
}

`;

      // Add responsive breakpoints
      Object.entries(breakpoints).forEach(([bp, config]) => {
        if (bp === activeBreakpoint) return;
        const bpWidth = bp === 'mobile' ? '375px' : bp === 'tablet' ? '768px' : '1200px';
        css += `@media (min-width: ${bpWidth}) {
  .grid-container {
    grid-template-columns: repeat(${config.columns}, 1fr);
    grid-template-rows: repeat(${config.rows}, 1fr);
    gap: ${config.gap}px;
  }
}
`;
      });

      return css;
    } else {
      let css = `.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: ${currentConfig.gap}px;
  align-items: ${currentConfig.align};
  justify-content: ${currentConfig.justify};
}

.grid-item {
  flex: 0 1 calc(${100 / currentConfig.columns}% - ${currentConfig.gap * (currentConfig.columns - 1) / currentConfig.columns}px);
}
`;

      return css;
    }
  };

  const generateHTML = () => {
    const totalItems = currentConfig.columns * currentConfig.rows;
    let html = '<div class="grid-container">\n';
    for (let i = 0; i < totalItems; i++) {
      html += '  <div class="grid-item">Item ' + (i + 1) + '</div>\n';
    }
    html += '</div>';
    return html;
  };

  const copyCode = () => {
    const code = generateCSS() + '\n' + generateHTML();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#111111',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>Responsive Grid Helper</h1>
        <button
          onClick={copyCode}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: copied ? '#22c55e' : '#ff3e00',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar Controls */}
        <aside style={{
          width: '320px',
          backgroundColor: '#111111',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Grid Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#888' }}>
              GRID TYPE
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['css-grid', 'flexbox'] as GridType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setGridType(type)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: gridType === type ? '#ff3e00' : '#1a1a1a',
                    color: 'white',
                    border: gridType === type ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {type === 'css-grid' ? 'CSS Grid' : 'Flexbox'}
                </button>
              ))}
            </div>
          </div>

          {/* Breakpoint Toggles */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#888' }}>
              BREAKPOINT
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['mobile', 'tablet', 'desktop'] as Breakpoint[]).map(bp => (
                <button
                  key={bp}
                  onClick={() => setActiveBreakpoint(bp)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: activeBreakpoint === bp ? '#ff3e00' : '#1a1a1a',
                    color: 'white',
                    border: activeBreakpoint === bp ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {bp === 'mobile' ? '📱' : bp === 'tablet' ? '📱' : '🖥️'} {bp}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Columns */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888' }}>COLUMNS</label>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{currentConfig.columns}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={currentConfig.columns}
                onChange={(e) => updateConfig('columns', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Rows */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888' }}>ROWS</label>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{currentConfig.rows}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={currentConfig.rows}
                onChange={(e) => updateConfig('rows', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Gap */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888' }}>GAP (PX)</label>
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{currentConfig.gap}</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                step="4"
                value={currentConfig.gap}
                onChange={(e) => updateConfig('gap', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            {/* Align Items */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#888' }}>
                ALIGN ITEMS
              </label>
              <select
                value={currentConfig.align}
                onChange={(e) => updateConfig('align', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}
              >
                <option value="stretch">Stretch</option>
                <option value="start">Start</option>
                <option value="center">Center</option>
                <option value="end">End</option>
              </select>
            </div>

            {/* Justify Items */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#888' }}>
                JUSTIFY ITEMS
              </label>
              <select
                value={currentConfig.justify}
                onChange={(e) => updateConfig('justify', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}
              >
                <option value="start">Start</option>
                <option value="center">Center</option>
                <option value="end">End</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Canvas Preview */}
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Live Preview</h2>
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '2rem',
              maxWidth: currentConfig.width,
              margin: '0 auto'
            }}>
              <div style={{
                display: gridType === 'css-grid' ? 'grid' : 'flex',
                gridTemplateColumns: gridType === 'css-grid' ? `repeat(${currentConfig.columns}, 1fr)` : undefined,
                gridTemplateRows: gridType === 'css-grid' ? `repeat(${currentConfig.rows}, 1fr)` : undefined,
                gap: `${currentConfig.gap}px`,
                alignItems: currentConfig.align,
                justifyItems: currentConfig.justify,
                flexWrap: gridType === 'flexbox' ? 'wrap' : undefined,
                justifyContent: gridType === 'flexbox' ? currentConfig.justify : undefined,
              }}>
                {Array.from({ length: currentConfig.columns * currentConfig.rows }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#ff3e00',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px',
                      ...(gridType === 'flexbox' && {
                        flex: `0 1 calc(${100 / currentConfig.columns}% - ${currentConfig.gap * (currentConfig.columns - 1) / currentConfig.columns}px)`
                      })
                    }}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Generated CSS</h2>
            <pre style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              color: '#a0aec0'
            }}>
              <code>{generateCSS()}</code>
            </pre>
          </div>

          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Generated HTML</h2>
            <pre style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              color: '#a0aec0'
            }}>
              <code>{generateHTML()}</code>
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
