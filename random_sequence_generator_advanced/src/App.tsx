import React, { useState } from 'react'

function App() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)
  const [result, setResult] = useState<number[]>([])

  const generate = () => {
    const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min)
    const shuffled = pool.sort(() => 0.5 - Math.random())
    setResult(shuffled.slice(0, count))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Random Sequence Generator</h1>
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Min</label>
          <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Max</label>
          <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Count</label>
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <button onClick={generate} className="w-full bg-blue-500 text-white p-2 rounded">Generate</button>
        <div className="mt-4 p-2 bg-gray-100 rounded">
          {result.join(', ')}
        </div>
      </div>
    </div>
  )
}

export default App
