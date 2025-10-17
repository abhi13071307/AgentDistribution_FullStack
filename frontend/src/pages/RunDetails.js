import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router-dom';

export default function RunDetails() {
  const { runId } = useParams();
  const [run, setRun] = useState(null);
  const [selectedAgentLeads, setSelectedAgentLeads] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRuns = async () => {
      try {
        const { data } = await api.get('/runs');
        const found = data.runs.find(r => r._id === runId);
        setRun(found || null);
      } catch (e) {
        setErr(e.response?.data?.message || 'Could not load run');
      } finally {
        setLoading(false);
      }
    };
    loadRuns();
  }, [runId]);

  const viewLeads = async (agentId) => {
    setErr('');
    setSelectedAgentLeads(null);
    try {
      const { data } = await api.get(`/runs/${runId}/agents/${agentId}/leads`);
      setSelectedAgentLeads(data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to fetch leads');
    }
  };

  if (loading) return <div style={{ padding:20 }}>Loading run…</div>;
  if (!run) return <div style={{ padding:20 }}>Run not found.</div>;

  return (
    <div style={{ padding:20 }}>
      <h2>Run: {run.fileName}</h2>
      <div>Total leads: {run.total}</div>

      <div style={{ marginTop:12 }}>
        <h4>Agents</h4>
        <ul>
          {run.distributedTo.map(d => (
            <li key={d._id} style={{ marginBottom:8 }}>
              <strong>{d.agent?.name}</strong> — {d.count} leads
              <button style={{ marginLeft:8 }} onClick={() => viewLeads(d.agent._id)}>View leads</button>
            </li>
          ))}
        </ul>
      </div>

      {err && <div style={{ color:'red' }}>{err}</div>}

      {selectedAgentLeads && (
        <div style={{ marginTop: 16 }}>
          <h4>Leads for {selectedAgentLeads.agent.name} ({selectedAgentLeads.count})</h4>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding:6 }}>FirstName</th>
                <th style={{ border: '1px solid #ddd', padding:6 }}>Phone</th>
                <th style={{ border: '1px solid #ddd', padding:6 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {selectedAgentLeads.leads.map(l => (
                <tr key={l._id}>
                  <td style={{ border: '1px solid #eee', padding:6 }}>{l.firstName}</td>
                  <td style={{ border: '1px solid #eee', padding:6 }}>{l.phone}</td>
                  <td style={{ border: '1px solid #eee', padding:6 }}>{l.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
