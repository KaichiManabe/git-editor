import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        setError(error.message);
      } else if (data) {
        console.log('User signed in with Google:', data);
        navigate('/home');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Sign Up with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}
