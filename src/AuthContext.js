import React, { createContext, useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userLevel, setUserLevel] = useState(0); // 默认0
  const [loading, setLoading] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }
    hasRun.current = true;

    const getInitialSession = async () => {
      try {
        console.debug("Fetching initial session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.debug("Initial session fetched:", session);
        setSession(session);
        if (session) {
          // 获取用户级别
          const { data, error } = await supabase
            .from("user_levels")
            .select("level")
            .eq("user_id", session.user.id)
            .single();
          console.debug("user level data:", data.level);
          if (data) {
            setUserLevel(data.level);
          }
        }
        setLoading(false);
        console.debug(
          "Loading finished, session:",
          session,
          "userLevel:",
          userLevel
        );
      } catch (error) {
        console.error("Error fetching initial session:", error);
        setLoading(false);
      }
    };
    console.debug("AuthProvider mounted, fetching initial session...");
    getInitialSession();
    console.debug("Setting up auth state change listener...");

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          const { data } = await supabase
            .from("user_levels")
            .select("level")
            .eq("user_id", session.user.id)
            .single();
          console.debug("user level data:", data);
          setUserLevel(data ? data.level : 0);
        } else {
          setUserLevel(0);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession, userLevel, setUserLevel, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
