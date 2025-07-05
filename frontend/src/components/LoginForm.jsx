import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../utils/auth';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });
    saveAuth(data.access_token, data.role);
    if (data.role === 'admin') navigate('/admin');
    else if (data.role === 'owner') navigate('/store-owner');
    else navigate('/user');
  };

  return (
    <form onSubmit={handleLogin} className="card p-4 shadow">
      <h2 className="text-center mb-3">Login</h2>
      <input className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
}

export default LoginForm;
