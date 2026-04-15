import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const NAMES = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const JOBS = ["Developer", "Designer", "Manager", "Analyst", "Engineer", "Scientist", "Teacher", "Doctor", "Artist", "Writer"];
const COUNTRIES = ["USA", "Canada", "UK", "Germany", "France", "Japan", "Australia", "Brazil", "India", "China"];

interface User {
  id: number;
  name: string;
  email: string;
  job: string;
  country: string;
}

const generateRandomUser = (id: number): User => {
  const firstName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const job = JOBS[Math.floor(Math.random() * JOBS.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  return { id, name: `${firstName} ${lastName}`, email, job, country };
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(1);

  const generateUsers = (n: number) => {
    const newUsers = Array.from({ length: n }, (_, i) => generateRandomUser(Date.now() + i));
    setUsers(newUsers);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(users, null, 2));
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Random User Generator</h1>
      <div className="flex justify-center gap-4 mb-6">
        {[1, 5, 10, 25].map((c) => (
          <button
            key={c}
            onClick={() => generateUsers(c)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {c} Users
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Generated Users</h2>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Copy size={16} /> Copy JSON
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Job</th>
              <th className="py-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.job}</td>
                <td className="py-2">{user.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
