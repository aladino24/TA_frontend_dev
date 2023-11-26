import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import DashboardDataMaster from './pages/contents/datamaster/master-user/DashboardMasterUserMain';
import axios from 'axios';
import Config from './config';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async(userid, password) => {
    
    try {
      const response = await axios.post(Config.api.server1 + "login", {
        userid: userid,
        password: password
      });
      // console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        setLoggedIn(true);
      }else{
        //throw
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }


  return (
    <BrowserRouter>
      <Routes>
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
            element={isLoggedIn ? <DashboardDataMaster /> : <Navigate to="/login" />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
