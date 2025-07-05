import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/user';
import { fetchStores } from '../api/store';
import { fetchRatings } from '../api/rating';
import Dashboard from '../components/Dashboard';
import { registerUser } from '../api/auth';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setUsers(await fetchUsers());
    setStores(await fetchStores());
    setRatings(await fetchRatings());
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await registerUser(newUser);
    loadAll();
  };

  return (
    <Dashboard title="Admin Dashboard">
      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="mb-4 p-3 border rounded">
        <h5>Add New User</h5>
        <input className="form-control mb-2" placeholder="Name" onChange={(e) => setNewUser({...newUser, name: e.target.value})}/>
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
        <input className="form-control mb-2" placeholder="Password" type="password" onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
        <input className="form-control mb-2" placeholder="Address" onChange={(e) => setNewUser({...newUser, address: e.target.value})}/>
        <select className="form-select mb-2" onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
          <option value="user">Normal User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success">Add User</button>
      </form>

      {/* Display Users */}
      <h5>Users List (Sorted by Name)</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>)}
        </tbody>
      </table>

      {/* Display Stores */}
      <h5>Stores List (Sorted by Name)</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Address</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => <tr key={store.id}><td>{store.name}</td><td>{store.address}</td></tr>)}
        </tbody>
      </table>
    </Dashboard>
  );
}

export default AdminDashboard;
