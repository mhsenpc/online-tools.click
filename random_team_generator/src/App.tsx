import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const shuffleTeams = () => {
    const names = input.split(/[,\n]/).map(n => n.trim()).filter(n => n !== '');
    if (names.length === 0) return;

    // Shuffle names
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }

    const newTeams: string[][] = Array.from({ length: teamCount }, () => []);
    names.forEach((name, index) => {
      newTeams[index % teamCount].push(name);
    });

    setTeams(newTeams);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Random Team Generator</h1>
      <textarea 
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter names separated by comma or newline..."
      />
      <label>
        Number of Teams:
        <input type="number" value={teamCount} onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))} min="1" max="50" />
      </label>
      <button onClick={shuffleTeams}>Shuffle Teams</button>
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
