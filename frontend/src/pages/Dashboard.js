import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem('admin') || 'null');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 20 }}>
        <h2>Dashboard</h2>
        <div>
          <span style={{ marginRight: 12 }}>{admin?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/upload">Upload CSV</Link> | <Link to="/runs">Runs</Link> | <Link to="/agents">Agents</Link>
      </nav>

      <main>
        <p>Welcome to the admin dashboard. Use the nav to upload CSVs and view runs.</p>
      </main>
    </div>
  );
}
