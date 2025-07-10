import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(password)) {
      navigate('/');
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow">
        <input
          type="password"
          className="w-full border rounded p-2 mb-2"
          placeholder="Admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full">Login</button>
      </form>
    </div>
  );
};

export default LoginPage; 