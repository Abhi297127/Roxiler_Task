import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow">
      <h2 className="text-center mb-3">Register</h2>
      <input className="form-control mb-3" placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input className="form-control mb-3" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input className="form-control mb-3" placeholder="Address" onChange={(e) => setForm({...form, address: e.target.value})} />
      <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />
      <button className="btn btn-success w-100">Register</button>
    </form>
  );
}

export default RegisterForm;
