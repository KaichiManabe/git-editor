import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    } else {
      console.log('User signed in:', data);
      await navigate('/home');
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}
