import React from 'react';
import Dashboard from '../components/Dashboard';
import StoreList from '../components/StoreList';

function UserDashboard() {
  return (
    <Dashboard title="User Dashboard">
      <StoreList />
    </Dashboard>
  );
}

export default UserDashboard;
