import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardPage } from './pages/DashboardPage';
import { CrimeAnalyticsPage } from './pages/CrimeAnalyticsPage';
import { FirManagementPage } from './pages/FirManagementPage';
import { CrimeMapPage } from './pages/CrimeMapPage';
import { AiPredictionPage } from './pages/AiPredictionPage';
import { OfficersPage } from './pages/OfficersPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analytics" element={<CrimeAnalyticsPage />} />
            <Route path="firs" element={<FirManagementPage />} />
            <Route path="map" element={<CrimeMapPage />} />
            <Route path="prediction" element={<AiPredictionPage />} />
            <Route path="officers" element={<OfficersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
}

export default App;

