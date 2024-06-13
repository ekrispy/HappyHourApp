import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate(); // Navigation hook
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form default behavior
    try {
      await login(email, password); // Call login function
      navigate('/', { replace: true }); // Navigate to home
    } catch (error) {
      console.error(error); // Log error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-sideMenuBg text-white p-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
