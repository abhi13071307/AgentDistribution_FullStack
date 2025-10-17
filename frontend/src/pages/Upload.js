import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Please select a file (.csv/.xls/.xlsx).');

    const form = new FormData();
    form.append('file', file);

    try {
      setLoading(true);
      const { data } = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResp(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div style={{ maxWidth:700, margin:'2rem auto', padding:20 }}>
      <h2>Upload CSV / XLSX</h2>
      <form onSubmit={submit}>
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
          <button type="button" style={{ marginLeft: 8 }} onClick={() => navigate('/runs')}>Go to Runs</button>
        </div>
      </form>

      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}

      {resp && (
        <div style={{ marginTop: 18, padding: 12, border: '1px solid #ddd' }}>
          <h4>Upload result</h4>
          <div>Total: {resp.total || resp.validCount}</div>
          <div>Run ID: {resp.runId || resp.runId}</div>
          <div style={{ marginTop: 8 }}>
            <h5>Distributed</h5>
            <ul>
              {(resp.distributedTo || []).map((d) => (
                <li key={d.agent}>{d.agent} — {d.count} leads</li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => navigate('/runs')}>Open Runs</button>
          </div>
        </div>
      )}
    </div>
  );
}
