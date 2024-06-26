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
import CreateRequestBarangDetailMain from './pages/contents/request/create/CreateRequestBarangDetailMain';
import DaftarRequestBarang from './pages/contents/request/daftar-request/DaftarRequestBarang';
import DaftarRequestBarangMain from './pages/contents/request/daftar-request/DaftarRequestBarangMain';
import PenerimaanBarangMain from './pages/contents/request/penerimaan-barang/PenerimaanBarangMain';
import PersediaanBarangMain from './pages/contents/persediaan-barang/PersediaanBarangMain';
import PemakaianBarangMain from './pages/contents/pemakaian-barang/PemakaianBarangMain';
import PemakaianBarangMaster from './pages/contents/pemakaian-barang/PemakaianBarangMaster';
import PemakaianBarangDetail from './pages/contents/pemakaian-barang/PemakaianBarangDetail';

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
    <Route 
        path='/request-barang/create/detail'
        element={isLoggedIn ? <CreateRequestBarangDetailMain /> : <Navigate to="/login" />}
    />
    <Route 
     path='/request-barang/list'
        element={isLoggedIn ? <DaftarRequestBarangMain /> : <Navigate to="/login" />}
    />
    <Route 
      path='/request-barang/accept'
      element={isLoggedIn ? <PenerimaanBarangMain /> : <Navigate to="/login" />}
    />
    <Route
       path='/persediaan-barang'
       element={isLoggedIn ? <PersediaanBarangMain /> : <Navigate to="/login" />}
    />
     <Route path="/pemakaian-barang/*" element={isLoggedIn ? <PemakaianBarangMain /> : <Navigate to="/login" />}>
        <Route path="detail" element={<PemakaianBarangDetail />} />
        <Route path="master" element={<PemakaianBarangMaster />} />
      </Route>
  </Routes>
);

export default RoutesConfig;
