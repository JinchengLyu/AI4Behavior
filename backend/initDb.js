const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

// Open database
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  // Create table
  db.run(`CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        "Parent Strategy" TEXT NOT NULL,
        Transcript TEXT NOT NULL,
        Video TEXT NOT NULL,
        "Fidelity Label" TEXT NOT NULL
    )`);

  // Read CSV file and insert data
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => {
      db.run(
        `INSERT INTO videos (id, "Parent Strategy", Transcript, Video, "Fidelity Label") VALUES (?, ?, ?, ?, ?)`,
        [
          row.Id,
          row["Parent Strategy"],
          row.Transcript,
          row.Video,
          row["Fidelity Label"],
        ]
      );
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      db.close(); // Close the database handle after all data is inserted
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error);
      db.close();
    });
});
