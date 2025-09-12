import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userLevel, setUserLevel] = useState(0); // 默认0
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        // 获取用户级别
        const { data, error } = await supabase
          .from('user_levels')
          .select('level')
          .eq('user_id', session.user.id)
          .single();
        if (data) setUserLevel(data.level);
      }
      setLoading(false);
    };
    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from('user_levels')
          .select('level')
          .eq('user_id', session.user.id)
          .single();
        setUserLevel(data ? data.level : 0);
      } else {
        setUserLevel(0);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, userLevel, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
