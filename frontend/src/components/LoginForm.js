import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '40px 35px',
          width: '380px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#4e54c8', marginBottom: '1rem' }}>Login</h2>
        <form onSubmit={submit}>
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '6px',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <label style={{ fontWeight: 500 }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '6px',
                fontSize: '14px',
              }}
            />
          </div>

          {err && (
            <div
              style={{
                backgroundColor: '#ffe5e5',
                color: '#d8000c',
                padding: '8px',
                borderRadius: '6px',
                fontSize: '13px',
                marginBottom: '10px',
              }}
            >
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#4e54c8',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 500,
              transition: 'background 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.background = '#3c41b3')}
            onMouseOut={(e) => (e.target.style.background = '#4e54c8')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
