const sqlite3 = require("sqlite3");
// Initialize SQLite database
const db = new sqlite3.Database("./first_round_data_50.sqlite");

db.exec(`DROP TABLE applications`); // Uncomment to drop the table if needed

// Create passcode table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            purpose TEXT NOT NULL,
            disclaimerAgreed BOOLEAN NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)
`);
