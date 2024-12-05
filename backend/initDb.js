const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./first_round_data_50.sqlite");
const csv = require("csv-parser");
const fs = require("fs");

const createTableQuery = `
CREATE TABLE IF NOT EXISTS videos (
  Id TEXT,
  Family TEXT,
  Type TEXT,
  Session INTEGER,
  Video TEXT,
  Timestamp TEXT,
  Parent_Strategy TEXT,
  Fidelity INTEGER,
  Child_Communication TEXT,
  Reading_Technique TEXT,
  Child_response_to_RT TEXT,
  Comments TEXT,
  if_second INTEGER,
  transcript TEXT,
  ASR TEXT,
  start_time TEXT,
  end_time TEXT,
  matched_transcript TEXT,
  Clip_Name TEXT,
  Gesture_label TEXT,
  PRIMARY KEY (Id)
);
`;

db.serialize(() => {
  db.run(createTableQuery);

  const insertData = db.prepare(`
    INSERT INTO videos (
      Id, Family, Type, Session, Video, Timestamp, Parent_Strategy, Fidelity, Child_Communication, Reading_Technique, Child_response_to_RT, Comments, if_second, transcript, ASR, start_time, end_time, matched_transcript, Clip_Name, Gesture_label
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const data = [];

  fs.createReadStream("./first_round_data_50.csv")
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      db.serialize(() => {
        for (const row of data) {
          insertData.run(
            [
              row.Id,
              row.Family,
              row.Type,
              row.Session,
              row.Video,
              row.Timestamp,
              row["Parent Strategy"],
              row.Fidelity,
              row["Child's Communication"],
              row["Reading Technique"],
              row["Child's response to RT"],
              row.Comments,
              row.if_second,
              row.transcript,
              row.ASR,
              row.start_time,
              row.end_time,
              row.matched_transcript,
              row["Clip Name"],
              row["Gesture label"],
            ],
            (err) => {
              if (err) {
                if (err.code === "SQLITE_CONSTRAINT") {
                  console.log(
                    `Skipping duplicate entry: ${row.Id}`
                  );
                } else {
                  console.error("Error inserting data:", err);
                }
              }
            }
          );
        }
      });

      insertData.finalize((err) => {
        if (err) {
          console.error("Error finalizing the insert statement:", err);
        } else {
          console.log("Data successfully loaded into SPL.");
        }
        db.close();
      });
    });
});
