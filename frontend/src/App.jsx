import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/Context';
import Home from './Components/Home/Home';
import Container from './Components/Container';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import LateNightDeals from './Components/Pages/LateNightDeals';
import NewHappyHours from './Components/Pages/NewHappyHours';
import WeeklyDeals from './Components/Pages/WeeklyDeals';
import WeeklySpecials from './Components/Pages/WeeklySpecials';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoutes';

function App() {
  return (
    <main className="flex items-center justify-center h-screen">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/late-night-deals" element={<LateNightDeals />} />
          <Route path="/new-happy-hours" element={<NewHappyHours />} />
          <Route path="/weekly-deals" element={<WeeklyDeals />} />
          <Route path="/weekly-specials" element={<WeeklySpecials />} />
          {/* Wrap protected routes within PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Container />} />
          </Route>
        </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
