import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [sessionId, setSessionId] = useState('');
  const [username, setUsername] = useState('');
  const [session, setSession] = useState<any>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on('update', (data) => {
      setSession(data);
    });
    return () => {
      socket.off('update');
    };
  }, []);

  const join = () => {
    socket.emit('join', { sessionId, username });
    setJoined(true);
  };

  const vote = (val: number) => {
    socket.emit('vote', { sessionId, vote: val });
  };

  const reveal = () => {
    socket.emit('reveal', { sessionId });
  };

  const reset = () => {
    socket.emit('reset', { sessionId });
  };

  if (!joined) {
    return (
      <div className="p-10 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Scrum Poker</h1>
        <input className="border p-2" placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
        <input className="border p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className="bg-blue-500 text-white p-2" onClick={join}>Join</button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Session: {sessionId}</h1>
      <div className="flex gap-4 mb-4">
        {[1, 2, 3, 5, 8, 13, 21].map((val) => (
          <button key={val} className="border p-4 hover:bg-gray-100" onClick={() => vote(val)}>{val}</button>
        ))}
      </div>
      <div className="mb-4">
        {Object.entries(session?.votes || {}).map(([id, data]: any) => (
          <div key={id}>{data.username}: {session.revealed ? data.vote : (data.vote ? 'Voted' : 'Not voted')}</div>
        ))}
      </div>
      {session?.moderator === socket.id && (
        <div className="flex gap-4">
          <button className="bg-green-500 text-white p-2" onClick={reveal}>Reveal</button>
          <button className="bg-red-500 text-white p-2" onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
