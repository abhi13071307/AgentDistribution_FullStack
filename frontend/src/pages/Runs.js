import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Runs() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/runs');
        setRuns(data.runs || []);
      } catch (e) {
        setErr(e.response?.data?.message || 'Failed to fetch runs');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div style={{ padding:20 }}>Loading runs…</div>;
  if (err) return <div style={{ padding:20, color:'red' }}>{err}</div>;

  return (
    <div style={{ padding:20 }}>
      <h2>Runs</h2>
      {runs.length === 0 ? <p>No runs yet.</p> : (
        <div>
          {runs.map((r) => (
            <div key={r._id} style={{ border:'1px solid #eee', padding:12, marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div>
                  <strong>{r.fileName}</strong> — {r.total} leads
                  <div style={{ fontSize:12, color:'#666' }}>Uploaded: {new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <button onClick={() => navigate(`/runs/${r._id}`)}>View details</button>
                </div>
              </div>

              <div style={{ marginTop:10 }}>
                <strong>Distribution:</strong>
                <ul>
                  {r.distributedTo.map((d) => (
                    <li key={d._id}>{d.agent?.name || d.agent} — {d.count} leads</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
