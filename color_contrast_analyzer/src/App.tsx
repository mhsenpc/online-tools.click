import React, { useState, useMemo } from 'react'
import { getContrastRatio, getContrastLevel } from './utils/contrast'

function App() {
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')

  const ratio = useMemo(() => getContrastRatio(fgColor, bgColor), [fgColor, bgColor])
  const level = useMemo(() => getContrastLevel(ratio), [ratio])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Color Contrast Analyzer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <label className="block mb-2 font-medium">Foreground Color</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-20 rounded cursor-pointer"
          />
          <input
            type="text"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <label className="block mb-2 font-medium">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-20 rounded cursor-pointer"
          />
          <input
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-8 p-8 rounded-lg shadow w-full max-w-4xl text-center" style={{ backgroundColor: bgColor, color: fgColor }}>
        <p className="text-4xl font-bold">Contrast Ratio: {ratio.toFixed(2)}:1</p>
        <p className="text-2xl mt-4">Level: {level}</p>
      </div>
    </div>
  )
}

export default App
