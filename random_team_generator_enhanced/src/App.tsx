import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [pairs, setPairs] = useState('');
  const [teams, setTeams] = useState<string[][]>([]);
  const [balanced, setBalanced] = useState(true);

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
        if (balanced) {
            // Find smallest team
            const smallestTeamIndex = newTeams.reduce((minIndex, team, currentIndex) => 
                team.length < newTeams[minIndex].length ? currentIndex : minIndex, 0);
            newTeams[smallestTeamIndex].push(name);
        } else {
            // Round-robin
            newTeams[(mandatoryPairs.length + index) % teamCount].push(name);
        }
    });
    
    setTeams(newTeams);
  };

  const copyToClipboard = () => {
      const text = teams.map((t, i) => `Team ${i+1}:\n${t.join('\n')}`).join('\n\n');
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Random Team Generator (Enhanced)</h1>
      <textarea 
        style={{ width: '100%', height: '100px', marginBottom: '1rem', padding: '0.5rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter names separated by comma or newline..."
      />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <label>
          Number of Teams:
          <input type="number" value={teamCount} onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))} style={{ marginLeft: '0.5rem' }} />
        </label>
        <label>
          <input type="checkbox" checked={balanced} onChange={(e) => setBalanced(e.target.checked)} />
          Balanced Distribution
        </label>
      </div>
      <h3>Mandatory Pairs (comma separated, one pair per line)</h3>
      <textarea 
        style={{ width: '100%', height: '80px', marginBottom: '1rem', padding: '0.5rem' }}
        value={pairs}
        onChange={(e) => setPairs(e.target.value)}
        placeholder="e.g. John,Jane"
      />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={generateTeams} style={{ padding: '0.5rem 1rem' }}>Generate Teams</button>
          <button onClick={copyToClipboard} style={{ padding: '0.5rem 1rem' }}>Export Result</button>
      </div>
      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {teams.map((team, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h3>Team {index + 1} ({team.length})</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {team.map((member, mIndex) => <li key={mIndex}>{member}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
