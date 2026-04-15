import { useState, useMemo } from 'react'
import statusCodes from './data/statusCodes.json'
import './App.css'

interface StatusCode {
  code: number;
  name: string;
  description: string;
}

function App() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return (statusCodes as StatusCode[]).filter(sc => 
      sc.code.toString().includes(query) || 
      sc.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <div className="container">
      <h1>HTTP Status Code Reference</h1>
      <input 
        type="text" 
        placeholder="Search by code or name..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="grid">
        {filtered.map(sc => (
          <div key={sc.code} className="card">
            <h3>{sc.code} {sc.name}</h3>
            <p>{sc.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
