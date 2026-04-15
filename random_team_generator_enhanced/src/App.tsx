import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [pairs, setPairs] = useState('');
  const [teams, setTeams] = useState<string[][]>([]);

  const generateTeams = () => {
    let names = input.split(/[,\n]/).map(n => n.trim()).filter(n => n !== '');
    const mandatoryPairs = pairs.split('\n').filter(p => p.trim() !== '').map(p => p.split(',').map(n => n.trim()));

    const newTeams: string[][] = Array.from({ length: teamCount }, () => []);
    const used = new Set<string>();

    // Process pairs first
    mandatoryPairs.forEach((pair, index) => {
      newTeams[index % teamCount].push(...pair);
      pair.forEach(n => used.add(n));
    });

    // Process remaining names
    const remainingNames = names.filter(n => !used.has(n));
    // Shuffle remaining
    for (let i = remainingNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingNames[i], remainingNames[j]] = [remainingNames[j], remainingNames[i]];
    }

    remainingNames.forEach((name, index) => {
        newTeams[(mandatoryPairs.length + index) % teamCount].push(name);
    });

    setTeams(newTeams);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Random Team Generator (Enhanced)</h1>
      <textarea 
        style={{ width: '100%', height: '150px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter names separated by comma or newline..."
      />
      <label>
        Number of Teams:
        <input type="number" value={teamCount} onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))} />
      </label>
      <h3>Mandatory Pairs (comma separated, one pair per line)</h3>
      <textarea 
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        value={pairs}
        onChange={(e) => setPairs(e.target.value)}
        placeholder="e.g. John,Jane"
      />
      <button onClick={generateTeams}>Generate Teams</button>
      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {teams.map((team, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>Team {index + 1}</h3>
            <ul>
              {team.map((member, mIndex) => <li key={mIndex}>{member}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
