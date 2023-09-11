import { createClient } from '@supabase/supabase-js'
import React from 'react'
import { Auth, } from '@supabase/auth-ui-react'
import { ThemeSupa, } from '@supabase/auth-ui-shared'
import { UseContextValue } from './UseContextValues'

export const supabase = createClient(
  'https://zjdfaryxscxnwekokdvt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZGZhcnl4c2N4bndla29rZHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Nzc0MzEsImV4cCI6MjAwNjQ1MzQzMX0.7MozAjSXjjmd2ugEcaDt7Ea5ScMlreJpA5yVKuaO-oA'
)

export default function Sign() {
  const { setPhase, setUserLogIn } = UseContextValue()

  //If the signIn is correct then the Phase will change to loading page for preview
  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        //  console.log("User signed in successfully:", session.user.email);
        setUserLogIn(session.user.email)
        setPhase('startPhase')
      }
    });
    return () => {
      authListener.unsubscribe;
    };
  }, []);

  return (
    <div className='signUpdiv'>
      <div className='signUp'>
        <h1>PodCast & Chill</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google', 'github']}
        />
      </div>
    </div>

  );
}
