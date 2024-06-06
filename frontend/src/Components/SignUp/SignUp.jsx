import React from 'react';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="p-2 border rounded" />
        <input type="email" placeholder="Email" className="p-2 border rounded" />
        <input type="password" placeholder="Password" className="p-2 border rounded" />
        <button className="bg-sideMenuBg text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
