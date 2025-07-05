import React from 'react';

function Dashboard({ title, children }) {
  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-center mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default Dashboard;
