import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      console.log('User signed in:', data.user);
      navigate('/home');
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignIn}>Log In</button>
      {error && <p>{error}</p>}
    </div>
  );
}
