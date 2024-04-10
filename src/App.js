import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Config from './config';
import RoutesConfig from './routes';
import Login from './Login';
import LandingPage from './pages/contents/landingpage/landingpage';

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

      try {
        const token = localStorage.getItem('token');
          const axiosConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
          const response = await axios.get(Config.api.server1 + 'check-token', axiosConfig);
          if (response.status === 200) {
            setLoggedIn(true);
          }else{
            // remove token from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setLoggedIn(false);
          }
      } catch (error) {
        // console.log(error);
        setLoading(false);
        setLoggedIn(false);
      }
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
         {isLoggedIn ? (
        <RoutesConfig isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      ) : 
      // apakah mengakses route "/"
      window.location.pathname === "/" ? (
        <LandingPage/>
      ) :
      (
        <Login handleLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;

