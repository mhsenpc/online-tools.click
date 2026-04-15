import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [mustPair, setMustPair] = useState<string[][]>([]); // Array of [name1, name2]
  const [neverPair, setNeverPair] = useState<string[][]>([]); // Array of [name1, name2]
  const [teams, setTeams] = useState<string[][]>([]);

  const shuffleTeams = () => {
    let names = input.split(/[,\n]/).map(n => n.trim()).filter(n => n !== '');
    if (names.length === 0) return;

    // Handle must-pair logic
    const pairMap = new Map<string, string>();
    mustPair.forEach(([n1, n2]) => {
      pairMap.set(n1, n2);
      pairMap.set(n2, n1);
    });

    // Handle never-pair logic
    const neverMap = new Map<string, Set<string>>();
    neverPair.forEach(([n1, n2]) => {
      if (!neverMap.has(n1)) neverMap.set(n1, new Set());
      if (!neverMap.has(n2)) neverMap.set(n2, new Set());
      neverMap.get(n1)!.add(n2);
      neverMap.get(n2)!.add(n1);
    });

    // Validation function
    const isValid = (currentTeams: string[][]) => {
      for (const team of currentTeams) {
        for (let i = 0; i < team.length; i++) {
          for (let j = i + 1; j < team.length; j++) {
            if (neverMap.get(team[i])?.has(team[j])) return false;
          }
        }
      }
      return true;
    };

    let attempts = 0;
    while (attempts < 1000) {
      const groups: (string | string[])[] = [];
      const used = new Set<string>();

      // Group mandatory pairs
      names.forEach(name => {
        if (used.has(name)) return;
        if (pairMap.has(name)) {
          const partner = pairMap.get(name)!;
          groups.push([name, partner]);
          used.add(name);
          used.add(partner);
        } else {
          groups.push(name);
          used.add(name);
        }
      });

      // Shuffle groups
      for (let i = groups.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [groups[i], groups[j]] = [groups[j], groups[i]];
      }

      // Distribute to teams (balanced size)
      const newTeams: string[][] = Array.from({ length: teamCount }, () => []);
      groups.forEach((group, index) => {
        const members = Array.isArray(group) ? group : [group];
        // Distribute groups to keep team sizes balanced as much as possible
        const teamIndex = index % teamCount;
        newTeams[teamIndex].push(...members);
      });

      if (isValid(newTeams)) {
        setTeams(newTeams);
        return;
      }
      attempts++;
    }
    alert("Could not satisfy constraints. Try reducing constraints or increasing team count.");
  };

  const copyToClipboard = () => {
    const text = teams.map((t, i) => `Team ${i + 1}:\n${t.join('\n')}`).join('\n\n');
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Random Team Generator (Advanced)</h1>
      <textarea 
        style={{ width: '100%', height: '150px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter names separated by comma or newline..."
      />
      <label>
        Number of Teams:
        <input type="number" value={teamCount} onChange={(e) => setTeamCount(Math.max(1, Number(e.target.value)))} min="1" max="50" />
      </label>
      <div style={{ margin: '1rem 0' }}>
        <h3>Mandatory Pairs (comma separated, e.g. John,Jane)</h3>
        <input type="text" placeholder="John,Jane" onBlur={(e) => {
            const parts = e.target.value.split(',');
            if (parts.length === 2) setMustPair(prev => [...prev, [parts[0].trim(), parts[1].trim()]]);
        }} />
        <ul>{mustPair.map((pair, i) => <li key={i}>{pair[0]} + {pair[1]}</li>)}</ul>
      </div>
      <div style={{ margin: '1rem 0' }}>
        <h3>Never Together (comma separated, e.g. John,Jane)</h3>
        <input type="text" placeholder="John,Jane" onBlur={(e) => {
            const parts = e.target.value.split(',');
            if (parts.length === 2) setNeverPair(prev => [...prev, [parts[0].trim(), parts[1].trim()]]);
        }} />
        <ul>{neverPair.map((pair, i) => <li key={i}>{pair[0]} vs {pair[1]}</li>)}</ul>
      </div>
      <button onClick={shuffleTeams}>Shuffle Teams</button>
      <button onClick={copyToClipboard} style={{ marginLeft: '1rem' }}>Copy to Clipboard</button>
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
