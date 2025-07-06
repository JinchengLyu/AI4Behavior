const sqlite3 = require('sqlite3');
// Initialize SQLite database
const db = new sqlite3.Database('./first_round_data_50.sqlite');

// db.exec(`DROP TABLE passcodes`);

// Create passcode table if not exists
db.exec(`
  CREATE TABLE passcodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    userId TEXT NOT NULL,
    generateAt TEXT NOT NULL,
    numUsed INTEGER DEFAULT 0
  )
`);
