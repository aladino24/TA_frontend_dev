import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import DashboardMasterUserMain from './pages/contents/datamaster/master-user/DashboardMasterUserMain';
import DashboardMasterStockMain from './pages/contents/datamaster/master-stock/DashboardMasterStockMain';
import DashboardMasterBrandMain from './pages/contents/datamaster/master-brand/DashboardMasterBrandMain';
import LandingPage from './pages/contents/landingpage/landingpage';
import DashboardMasterBankAccMain from './pages/contents/datamaster/master-bank-acc/DashboardMasterBankAccMain';
import DashboardMasterDistributorMain from './pages/contents/datamaster/master-distributor/DashboardMasterDistributorMain';
import CreateRequestBarangMain from './pages/contents/request/create/CreateRequestBarangMain';

const RoutesConfig = ({ isLoggedIn }) => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route
      path="/login"
      element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
    />
    <Route
      path="/dashboard"
      element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
    />
    <Route
      path="/master-user"
      element={isLoggedIn ? <DashboardMasterUserMain /> : <Navigate to="/login" />}
    />
    <Route
      path="/master-stock"
      element={isLoggedIn ? <DashboardMasterStockMain /> : <Navigate to="/login" />}
    />
    <Route
      path="/master-brand"
      element={isLoggedIn ? <DashboardMasterBrandMain /> : <Navigate to="/login" />}
    />
    <Route
      path="/master-bank-acc"
      element={isLoggedIn ? <DashboardMasterBankAccMain /> : <Navigate to="/login" />}
    />
    <Route
      path="/master-distributor"
      element={isLoggedIn ? <DashboardMasterDistributorMain /> : <Navigate to="/login" />}
    />
    <Route
     path='/request-barang/create'
        element={isLoggedIn ? <CreateRequestBarangMain /> : <Navigate to="/login" />}
    />
  </Routes>
);

export default RoutesConfig;
