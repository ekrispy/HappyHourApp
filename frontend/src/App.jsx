import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/Context';
import Home from './Components/Home/Home';
import Container from './Components/Container';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <main className="flex items-center justify-center h-screen">
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Container />} />
        <PrivateRoute path="/home" element={<Container />} />
      </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;