import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  

  const handleSignup = (e) => {
    // e.preventDefault();
    if(password !== confirmPassword){
      setError('Passwords do not match');
    }
    else{
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80 border-2"
      >
        <h1 className="text-2xl mb-4">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          className="w-full border-2 p-2 mb-4 rounded "
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full relative mb-4">
        <input
          type={showPassword?'text': 'password'}
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border-2 p-2"
        />
    <button type="button" className="absolute right-0 px-2 py-2 inset-y-0 text-gray-600"
     onClick={()=> setShowPassword(!showPassword)}>
      {showPassword?'👁️':'👁️‍🗨️'}

     </button>
        </div>
        <div className="mb-4 relative w-full">
        <input type={showConfirmPassword?'text': 'password'} 
        required
        value={confirmPassword}
        placeholder="Confirm Password"
        className="w-full p-2 border-2 rounded"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <button className="absolute inset-y-0 right-0 px-2 py-2 text-gray-600"
        type="button"
        onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword? '👁️':'👁️‍🗨️'}
        </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all ease duration-100 text-white p-2 rounded"
        >
          Sign Up
        </button>{" "}
      </form>
    </div>
  );
};

export default Signup;
