import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import DashboardMasterUserMain from './pages/contents/datamaster/master-user/DashboardMasterUserMain';
import axios from 'axios';
import Config from './config';
import DashboardMasterStock from './pages/contents/datamaster/master-stock/DashboardMasterStock';
import DashboardMasterStockMain from './pages/contents/datamaster/master-stock/DashboardMasterStockMain';
import DashboardMasterBrandMain from './pages/contents/datamaster/master-brand/DashboardMasterBrandMain';
import LandingPage from './pages/contents/landingpage/landingpage';
import DashboardMasterBankAcc from './pages/contents/datamaster/master-bank-acc/DashboardMasterBankAcc';
import DashboardMasterBankAccMain from './pages/contents/datamaster/master-bank-acc/DashboardMasterBankAccMain';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (userid, password) => {
    try {
      const response = await axios.post(Config.api.server1 + 'login', {
        userid: userid,
        password: password,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setLoggedIn(true);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  if (loading) {
    // Tambahkan indikator loading jika diperlukan
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login handleLogin={handleLogin} />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

