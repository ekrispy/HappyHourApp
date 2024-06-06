import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from './Components/Container';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';


function App() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Routes>
        
        <Route path="/" element={<Container />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;
