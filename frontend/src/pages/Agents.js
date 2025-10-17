import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/agents');
      setAgents(data.agents || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const createAgent = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        password: form.password
      };
      await api.post('/agents', payload);
      setForm({ name: '', email: '', mobile: '', password: '' });
      await loadAgents();
    } catch (err) {
      setError(err.response?.data?.message || 'Create agent failed');
    } finally {
      setCreating(false);
    }
  };

  const deleteAgent = async (id) => {
    if (!window.confirm('Delete this agent? This cannot be undone.')) return;
    try {
      await api.delete(`/agents/${id}`);
      setAgents(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Agents</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Add Agent</h3>
          <form onSubmit={createAgent}>
            <div>
              <label>Name</label><br />
              <input name="name" value={form.name} onChange={handleChange} required style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:8 }}>
              <label>Email</label><br />
              <input name="email" value={form.email} onChange={handleChange} required type="email" style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:8 }}>
              <label>Mobile (with country code)</label><br />
              <input name="mobile" value={form.mobile} onChange={handleChange} required placeholder="+911234567890" style={{ width:'100%', padding:8 }} />
            </div>
            <div style={{ marginTop:8 }}>
              <label>Password</label><br />
              <input name="password" value={form.password} onChange={handleChange} required type="password" style={{ width:'100%', padding:8 }} />
            </div>

            {error && <div style={{ color:'red', marginTop:8 }}>{error}</div>}

            <div style={{ marginTop:12 }}>
              <button type="submit" disabled={creating}>{creating ? 'Creating...' : 'Add Agent'}</button>
            </div>
          </form>
        </div>

        <div style={{ flex: 2 }}>
          <h3>Existing Agents</h3>
          {loading ? <div>Loading…</div> : (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border:'1px solid #ddd', padding:8 }}>Name</th>
                  <th style={{ border:'1px solid #ddd', padding:8 }}>Email</th>
                  <th style={{ border:'1px solid #ddd', padding:8 }}>Mobile</th>
                  <th style={{ border:'1px solid #ddd', padding:8 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(a => (
                  <tr key={a._id}>
                    <td style={{ border:'1px solid #eee', padding:8 }}>{a.name}</td>
                    <td style={{ border:'1px solid #eee', padding:8 }}>{a.email}</td>
                    <td style={{ border:'1px solid #eee', padding:8 }}>{a.mobile}</td>
                    <td style={{ border:'1px solid #eee', padding:8 }}>
                      <button onClick={() => deleteAgent(a._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
