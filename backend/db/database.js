// database.js
// Requires: npm i @supabase/supabase-js bcryptjs
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
}

// Admin client (server-side only)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Helper to build filters
function applyFilters(query, filters) {
  const keys = Object.keys(filters || {}).filter(
    (k) => filters[k] !== null && filters[k] !== undefined && filters[k] !== ""
  );
  for (const k of keys) {
    const v = filters[k];
    if (k === "matched_transcript") {
      query = query.ilike("matched_transcript", `%${v}%`);
    } else {
      query = query.eq(k, v);
    }
  }
  return query;
}

// Function to get all videos
const getAllVideos = async (callback) => {
  const { data, error } = await supabase.from("videos").select("*");
  if (callback) return callback(error || null, data || null);
  return { data, error };
};

// Function to query videos with filters
const queryVideos = async (filters, callback) => {
  let q = supabase.from("videos").select("*");
  q = applyFilters(q, filters);
  const { data, error } = await q;
  if (callback) return callback(error || null, data || null);
  return { data, error };
};

// Function to query file sessions with deduplication (Node-side distinct by groupBy)
// queryFileSessionsRpc.js
const queryFileSessions = async (filters, groupBy, callback, options = {}) => {
  try {
    console.debug("queryFileSessions called with filters:", filters, "groupBy:", groupBy);
    const params = {
      p_group_by: groupBy,
      p_order_by: options.orderBy || 'id',
      p_desc: options.orderAsc === undefined ? true : !options.orderAsc,
      p_filters: filters || {}
    };

    const { data, error } = await supabase.rpc('file_sessions_distinct', params);
    if (error) {
      if (callback) return callback(error, null);
      return { data: null, error };
    }
    if (callback) return callback(null, data);
    return { data, error: null };
  } catch (e) {
    if (callback) return callback(e, null);
    return { data: null, error: e };
  }
};


// Function to get distinct column values
const getDistinctValues = async (column, callback) => {
  if (!column) {
    const err = new Error("No column specified");
    if (callback) return callback(err, null);
    throw err;
  }
  const { data, error } = await supabase.from("videos").select(`${column}`);

  const distinctValues = data.map((i) => i[column]);

  let result = [];
  if (distinctValues && distinctValues.length > 0) {
    result = Array.from(new Set(distinctValues)); // Deduplicate values
  }

  if (callback) return callback(error || null, result || null);
  return { result, error };
};

// Function to update transcript
const updateTranscript = async (annotation, id, callback) => {
  // NOTE: Ensure your column name matches exactly. If your column is "Id" with capital I, keep it.
  const { data, error } = await supabase
    .from("videos")
    .update({ matched_transcript: annotation })
    .eq("Id", id)
    .select();

  if (callback) {
    if (error) return callback(error, null);
    return callback(null, {
      message: "Transcript updated successfully",
      changes: data?.length || 0,
    });
  }
  return { data, error };
};

// Function to count records based on fields
const countRecords = async (field1, value1, field2, value2, callback) => {
  let q = supabase.from("videos").select("*", { count: "exact", head: true });

  if (value1 !== "") q = q.eq(field1, value1);
  if (value2 !== "") q = q.eq(field2, value2);

  const { error, count } = await q;
  if (callback) {
    if (error) return callback(error, null);
    return callback(null, { count: count || 0 });
  }
  return { count: count || 0, error };
};

// Function to generate and save a new passcode
const generatePasscode = async (userId) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedCode = await bcrypt.hash(code, 6);
  const generateAt = new Date(Date.now()).toISOString();

  const { error } = await supabase
    .from("passcodes")
    .insert({ code: hashedCode, userId, generateAt });

  if (error) throw error;
  return code;
};

// Function to validate a passcode
const validatePasscode = (code, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !code)
        return reject(new Error("userId and code are required"));

      const { data, error } = await supabase
        .from("passcodes")
        .select("*")
        .eq("userId", userId)
        .order("id", { ascending: false })
        .limit(1);

      if (error)
        return reject(
          new Error(
            `Database error during passcode validation: ${error.message}`
          )
        );
      if (!data || data.length === 0)
        return reject(new Error("Passcode not found or already used"));

      const passcode = data[0];
      const isValid = await bcrypt.compare(code, passcode.code);
      if (!isValid) return reject(new Error("Invalid passcode"));

      const nextNumUsed = (passcode.numUsed || 0) + 1;
      const { error: updErr } = await supabase
        .from("passcodes")
        .update({ numUsed: nextNumUsed })
        .eq("id", passcode.id);

      if (updErr)
        return reject(
          new Error(`Failed to mark passcode as used: ${updErr.message}`)
        );
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

// Helpers below cannot run arbitrary SQL via Supabase REST.
// Keep stubs for compatibility or replace with direct SQL (pg/postgres) if needed.
const runQuery = async (_sql, _params = []) => {
  throw new Error(
    "runQuery is not supported with Supabase REST. Use a direct SQL client or RPC."
  );
};

const getAllQuery = async (_sql, _params = []) => {
  throw new Error(
    "getAllQuery is not supported with Supabase REST. Use a direct SQL client or RPC."
  );
};

module.exports = {
  getAllVideos,
  queryVideos,
  queryFileSessions,
  getDistinctValues,
  updateTranscript,
  countRecords,
  generatePasscode,
  validatePasscode,
  runQuery,
  getAllQuery,
};
