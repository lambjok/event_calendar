import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

import './App.css';
import 'antd/dist/antd';
import { Layout } from 'antd';

import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  const { setUser, setIsAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({ username: localStorage.getItem('username' || '')} as IUser);
      setIsAuth(true);
    }
  }, [])

  return (
    <Layout>
      <Navbar />
      <Layout>
        <AppRouter />
      </Layout>
    </Layout>
  );
}

export default App;
