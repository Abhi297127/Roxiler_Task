import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getRole } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Store Rating</Link>
        <div className="d-flex">
          {role && (
            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
