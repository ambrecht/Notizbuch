'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../../supabase/supabase-provider';
import LoginPopup from '@/components/loginPopUp';
const LoginPage = () => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [email, setEmail] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await supabase.auth.signIn({ email });
    if (error) {
      console.error('An error occurred while logging in:', error);
    } else {
      router.push('/');
    }
  };

  return (
    <div>
      <LoginPopup></LoginPopup>
    </div>
  );
};

export default LoginPage;
