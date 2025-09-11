import { createClient } from '@supabase/supabase-js';

// 使用您的Supabase URL和Anon Key（从环境变量中获取以提高安全性）
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
