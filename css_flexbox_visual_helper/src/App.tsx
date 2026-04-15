import { useState } from 'react'
import { Copy, Plus, Trash2 } from 'lucide-react'
import './App.css'

interface FlexConfig {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
  gap: string
}

const defaultFlexConfig: FlexConfig = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  alignContent: 'stretch',
  gap: '0px'
}

function App() {
  const [flexConfig, setFlexConfig] = useState<FlexConfig>(defaultFlexConfig)
  const [items, setItems] = useState([1, 2, 3, 4])
  const [copied, setCopied] = useState(false)

  const updateConfig = (key: keyof FlexConfig, value: string) => {
    setFlexConfig(prev => ({ ...prev, [key]: value }))
  }

  const addItem = () => {
    setItems(prev => [...prev, Math.max(...prev) + 1])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index))
    }
  }

  const generateCSS = () => {
    return `.flex-container {
  display: flex;
  flex-direction: ${flexConfig.flexDirection};
  justify-content: ${flexConfig.justifyContent};
  align-items: ${flexConfig.alignItems};
  flex-wrap: ${flexConfig.flexWrap};
  align-content: ${flexConfig.alignContent};
  gap: ${flexConfig.gap};
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>CSS Flexbox Visual Helper</h1>
        <p>Build and preview CSS Flexbox layouts interactively</p>
      </header>

      <div className="main-content">
        {/* Control Panel */}
        <div className="control-panel">
          <h2>Control Panel</h2>
          
          <div className="control-group">
            <label>flex-direction</label>
            <select 
              value={flexConfig.flexDirection} 
              onChange={(e) => updateConfig('flexDirection', e.target.value)}
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div className="control-group">
            <label>justify-content</label>
            <select 
              value={flexConfig.justifyContent} 
              onChange={(e) => updateConfig('justifyContent', e.target.value)}
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div className="control-group">
            <label>align-items</label>
            <select 
              value={flexConfig.alignItems} 
              onChange={(e) => updateConfig('alignItems', e.target.value)}
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div className="control-group">
            <label>flex-wrap</label>
            <select 
              value={flexConfig.flexWrap} 
              onChange={(e) => updateConfig('flexWrap', e.target.value)}
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          <div className="control-group">
            <label>align-content</label>
            <select 
              value={flexConfig.alignContent} 
              onChange={(e) => updateConfig('alignContent', e.target.value)}
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </div>

          <div className="control-group">
            <label>gap</label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={parseInt(flexConfig.gap)} 
              onChange={(e) => updateConfig('gap', `${e.target.value}px`)}
            />
            <span>{flexConfig.gap}</span>
          </div>

          <div className="item-controls">
            <button onClick={addItem} className="btn-add">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="preview-area">
          <h2>Live Preview</h2>
          <div 
            className="flex-container"
            style={{
              display: 'flex',
              flexDirection: flexConfig.flexDirection,
              justifyContent: flexConfig.justifyContent,
              alignItems: flexConfig.alignItems,
              flexWrap: flexConfig.flexWrap,
              alignContent: flexConfig.alignContent,
              gap: flexConfig.gap
            }}
          >
            {items.map((item, index) => (
              <div key={item} className="flex-item">
                <span className="item-number">{item}</span>
                <button 
                  className="btn-remove"
                  onClick={() => removeItem(index)}
                  title="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet */}
        <div className="code-panel">
          <div className="code-header">
            <h2>Generated CSS</h2>
            <button 
              onClick={copyToClipboard}
              className="btn-copy"
              title="Copy to clipboard"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="code-block"><code>{generateCSS()}</code></pre>
        </div>
      </div>
    </div>
  )
}

export default App
