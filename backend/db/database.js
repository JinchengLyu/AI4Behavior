const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

// Initialize SQLite database
const db = new sqlite3.Database('./first_round_data_50.sqlite');

// Function to get all videos
const getAllVideos = (callback) => {
  db.all('SELECT * FROM videos', [], callback);
};

// Function to query videos with filters
const queryVideos = (filters, callback) => {
  const filterKeys = Object.keys(filters).filter(
    (key) => filters[key] !== null && filters[key] !== undefined && filters[key] !== ''
  );
  const filterValues = filterKeys.map((key) => {
    if (key === 'matched_transcript') {
      return `%${filters[key]}%`; // Use wildcards for partial match
    }
    return filters[key];
  });

  const query = `SELECT * FROM videos WHERE ${filterKeys
    .map((key) => (key === 'matched_transcript' ? `${key} LIKE ?` : `"${key}" = ?`))
    .join(' AND ')}`;

  console.log('filters', filterKeys, filterValues);
  db.all(query, filterValues, callback);
};

// Function to query file sessions with deduplication
const queryFileSessions = (filters, groupBy, callback) => {
  const filterKeys = Object.keys(filters).filter(
    (key) =>
      filters[key] !== null &&
      filters[key] !== undefined &&
      filters[key] !== '' &&
      key !== 'GroupBy'
  );
  const filterValues = filterKeys.map((key) => {
    if (key === 'matched_transcript') {
      return `%${filters[key]}%`; // Use wildcards for partial match
    }
    return filters[key];
  });

  const query = `SELECT * FROM file_sessions WHERE ${filterKeys
    .map((key) => `"${key}" = ?`)
    .join(' AND ')} GROUP BY ${groupBy}`;

  console.log('filters', filterKeys, filterValues);
  console.log(query);
  db.all(query, filterValues, callback);
};

// Function to get distinct column values
const getDistinctValues = (column, callback) => {
  console.log(`Received request to fetch distinct values for column: ${column}`);
  if (!column) {
    console.error('No column specified');
    callback(new Error('No column specified'), null);
    return;
  }

  const query = `SELECT DISTINCT "${column}" FROM videos`;
  console.log(`Executing query: ${query}`);
  db.all(query, [], callback);
};

// Function to update transcript
const updateTranscript = (annotation, id, callback) => {
  const query = `UPDATE videos SET matched_transcript = ? WHERE Id = ?`;
  db.run(query, [annotation, id], function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log(`updated ${id} transcript to "${annotation}"`);
    callback(null, { message: 'Transcript updated successfully', changes: this.changes });
  });
};

// Function to count records based on fields
const countRecords = (field1, value1, field2, value2, callback) => {
  let query = `SELECT COUNT(*) AS count FROM videos`;
  let params = [];
  if (value1 !== '') {
    query += ` WHERE ${field1} = ?`;
    params.push(value1);
    if (value2 !== '') {
      query += ` AND ${field2} = ?`;
      params.push(value2);
    }
  } else if (value2 !== '') {
    query += ` WHERE ${field2} = ?`;
    params.push(value2);
  }

  db.get(query, params, (err, row) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null);
      return;
    }
    callback(null, { count: row.count });
  });
};

// Function to generate and save a new passcode
const generatePasscode = async (userId) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
  const hashedCode = await bcrypt.hash(code, 6); // Hash the passcode for security
  const generateAt = new Date(Date.now()).toISOString(); // Use ISO format for consistency

  const insert = db.prepare('INSERT INTO passcodes (code, userId, generateAt) VALUES (?, ?, ?)');
  insert.run(hashedCode, userId, generateAt);

  return code;
};

// Function to validate a passcode
const validatePasscode = (code, userId) => {
  return new Promise((resolve, reject) => {
    console.log(`Validating passcode for userId: ${userId}, code: ${code}`);

    if (!userId || !code) {
      console.error('Missing userId or code');
      return reject(new Error('userId and code are required'));
    }

    // Use db.all() to get all unused passcodes for the user, ordered by id descending
    const query = 'SELECT * FROM passcodes WHERE userId = ? ORDER BY id DESC';
    db.all(query, [userId], (err, rows) => {
      if (err) {
        console.error(`Database query error: ${err.message}`);
        return reject(new Error('Database error during passcode validation'));
      }

      if (!rows || rows.length === 0) {
        console.error(`No unused passcode found for userId: ${userId}`);
        return reject(new Error('Passcode not found or already used'));
      }

      // Take the latest passcode (first in the sorted result due to DESC order)
      const passcode = rows[0];
      console.log(`Found passcode record: ${JSON.stringify(passcode)}`);

      // // Check if passcode is expired
      // const currentTime = new Date();
      // const expirationTime = new Date(passcode.expiresAt);
      // console.log(`Current time: ${currentTime}, Expires at: ${expirationTime}`);
      // if (currentTime > expirationTime) {
      //   console.error('Passcode expired');
      //   return reject(new Error('Passcode expired'));
      // }

      // Compare hashed passcode
      bcrypt.compare(code, passcode.code, (err, isValid) => {
        if (err) {
          console.error(`Bcrypt error: ${err.message}`);
          return reject(new Error('Error validating passcode'));
        }
        if (isValid) {
          const update = db.prepare('UPDATE passcodes SET numUsed = ? WHERE id = ?');
          update.run(passcode.numUsed+1, passcode.id);
          console.log(`Passcode validated and marked as used for id: ${passcode.id}`);
          resolve(true);
        } else {
          console.error('Invalid passcode entered');
          reject(new Error('Invalid passcode'));
        }
      });
    });
  });
};

// Helper: Run query (INSERT/UPDATE/DELETE)
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

// Helper: Get all rows (SELECT)
const getAllQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
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
  getAllQuery
};
