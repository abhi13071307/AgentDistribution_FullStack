import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Runs from './pages/Runs';
import RunDetails from './pages/RunDetails';
import Agents from './pages/Agents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />

        <Route
          path="/runs"
          element={
            <PrivateRoute>
              <Runs />
            </PrivateRoute>
          }
        />

        <Route
          path="/runs/:runId"
          element={
            <PrivateRoute>
              <RunDetails />
            </PrivateRoute>
          }
        />

        <Route path="/agents" element={<PrivateRoute><Agents /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
