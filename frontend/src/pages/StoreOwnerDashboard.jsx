import React, { useEffect, useState } from 'react';
import { fetchStores, addStore } from '../api/store';
import Dashboard from '../components/Dashboard';

function StoreOwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [newStore, setNewStore] = useState({});

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const data = await fetchStores();
    setStores(data);
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    await addStore(newStore, true); // true = owned store
    loadStores();
  };

  return (
    <Dashboard title="Store Owner Dashboard">
      {/* Add Store Form */}
      <form onSubmit={handleAddStore} className="mb-4 p-3 border rounded">
        <h5>Add New Store</h5>
        <input className="form-control mb-2" placeholder="Name" onChange={(e) => setNewStore({...newStore, name: e.target.value})}/>
        <input className="form-control mb-2" placeholder="Address" onChange={(e) => setNewStore({...newStore, address: e.target.value})}/>
        <button className="btn btn-primary">Add Store</button>
      </form>

      {/* Store List */}
      <h5>My Stores</h5>
      <ul className="list-group">
        {stores.map(store => (
          <li key={store.id} className="list-group-item">
            {store.name} - {store.address}
          </li>
        ))}
      </ul>
    </Dashboard>
  );
}

export default StoreOwnerDashboard;
