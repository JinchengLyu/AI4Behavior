const sqlite3 = require('sqlite3').verbose();

// Open database
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.all("SELECT * FROM videos", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(rows);
    });
});

// Close the database connection
db.close();
