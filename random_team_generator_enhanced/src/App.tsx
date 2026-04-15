import React, { useState } from 'react';

function App() {
  const [names, setNames] = useState('');
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const generateTeams = () => {
    const nameList = names.split(/[\n,]+/).map(n => n.trim()).filter(n => n !== '');
    if (nameList.length === 0 || teamCount <= 0) return;

    const shuffled = [...nameList].sort(() => Math.random() - 0.5);
    const newTeams: string[][] = Array.from({ length: teamCount }, () => []);
    
    shuffled.forEach((name, index) => {
      newTeams[index % teamCount].push(name);
    });

    setTeams(newTeams);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Random Team Generator</h1>
      <textarea
        className="w-full p-2 border mb-4"
        placeholder="Enter names (separated by newlines or commas)"
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />
      <input
        type="number"
        className="w-full p-2 border mb-4"
        value={teamCount}
        onChange={(e) => setTeamCount(Number(e.target.value))}
        min={1}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={generateTeams}>
        Generate
      </button>
      <div className="mt-4">
        {teams.map((team, i) => (
          <div key={i} className="mb-2 p-2 border">
            <h2 className="font-bold">Team {i + 1}</h2>
            <ul>{team.map((name, j) => <li key={j}>{name}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
