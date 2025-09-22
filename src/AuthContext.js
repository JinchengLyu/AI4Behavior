import React, { createContext, useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userLevel, setUserLevel] = useState(0); // 默认0
  const [loading, setLoading] = useState(true);
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
          const { data, error } = await supabase.rpc("manage_user_level", {
            target_user_id: session.user.id,
            action: "select",
          });
          if (error) {
            console.error("Error fetching user level:", error.message);
            setUserLevel(0);
          } else {
            setUserLevel(data?.level || 0); // 从返回的 JSON 中提取 level
          }

          console.debug("user level data:", data.level);
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
          const { data, error } = await supabase.rpc("manage_user_level", {
            target_user_id: session.user.id,
            action: "select",
          });
          if (error) {
            console.error("Error fetching user level:", error.message);
            setUserLevel(0);
          } else {
            setUserLevel(data?.level || 0); // 从返回的 JSON 中提取 level
          }
          console.debug("user level data:", data);
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
    <AuthContext.Provider
      value={{ session, setSession, userLevel, setUserLevel, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
