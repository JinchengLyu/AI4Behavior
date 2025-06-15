const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'file_sessions.db');

// 创建数据库连接
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
  
  // 将数据库操作移到连接回调内
  db.serialize(() => {
    // 1. 创建表
    db.run(`CREATE TABLE IF NOT EXISTS file_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      family TEXT NOT NULL,
      type TEXT NOT NULL,
      session TEXT NOT NULL,
      UNIQUE(family, type, session)
    )`, (err) => {
      if (err) {
        return console.error('Error creating table:', err.message);
      }
      console.log('Table "file_sessions" created successfully');
      
      // 2. 清空表
      db.run('DELETE FROM file_sessions', (err) => {
        if (err) {
          return console.error('Error deleting old data:', err.message);
        }
        
        // 3. 插入数据
        const data = [
          // AL家族数据
          ['AL', 'Baseline', '1'],
          ['AL', 'Baseline', '2'],
          ['AL', 'Baseline', '3'],
          ['AL', 'Baseline', '4'],
          ['AL', 'MM', '1'],
          ['AL', 'MM', '2'],
          ['AL', 'MM', '3'],
          ['AL', 'MM', '4'],
          ['AL', 'RP', '1'],
          ['AL', 'RP', '2'],
          ['AL', 'RP', '3'],
          ['AL', 'RP', '4'],
          ['AL', 'TD', '1'],
          ['AL', 'TD', '2'],
          ['AL', 'TD', '3'],
          ['AL', 'TD', '4'],
          
          // HB家族数据
          ['HB', 'Baseline', '1'],
          ['HB', 'Baseline', '2'],
          ['HB', 'Baseline', '3'],
          ['HB', 'Baseline', '4'],
          ['HB', 'MM', '1'],
          ['HB', 'MM', '2'],
          ['HB', 'MM', '3'],
          ['HB', 'MM', '4'],
          ['HB', 'RP', '1'],
          ['HB', 'RP', '2'],
          ['HB', 'RP', '3'],
          ['HB', 'RP', '4'],
          ['HB', 'RP', '5'],
          ['HB', 'RP', '6'],
          
          // MC家族数据 (1a/1b作为独立项)
          ['MC', 'Baseline', '1a'],
          ['MC', 'Baseline', '1b'],
          ['MC', 'Baseline', '2'],
          ['MC', 'MM', '2a'],
          ['MC', 'MM', '2b'],
          ['MC', 'MM', '3a'],
          ['MC', 'MM', '3b'],
          ['MC', 'MM', '4a'],
          ['MC', 'MM', '4b'],
          ['MC', 'RP', '1a'],
          ['MC', 'RP', '1b'],
          ['MC', 'RP', '2a'],
          ['MC', 'RP', '2b'],
          ['MC', 'RP', '3a'],
          ['MC', 'RP', '3b'],
          ['MC', 'TD', '1a'],
          ['MC', 'TD', '1b'],
          ['MC', 'TD', '2a']
        ];
        
        // 使用事务提高性能
        db.run('BEGIN TRANSACTION');
        
        const stmt = db.prepare(`
          INSERT INTO file_sessions (family, type, session) 
          VALUES (?, ?, ?)
        `);
        
        let insertedCount = 0;
        const totalCount = data.length;
        
        data.forEach(row => {
          stmt.run(row, (err) => {
            if (err) {
              console.error(`Error inserting row [${row.join(', ')}]:`, err.message);
            }
            insertedCount++;
            
            // 检查是否所有数据都已插入
            if (insertedCount === totalCount) {
              stmt.finalize(() => {
                db.run('COMMIT', (err) => {
                  if (err) {
                    return console.error('Error committing transaction:', err.message);
                  }
                  console.log(`Inserted ${totalCount} records successfully`);
                  
                  // 验证数据
                  db.get("SELECT COUNT(*) AS total FROM file_sessions", (err, row) => {
                    if (err) {
                      return console.error('Error counting records:', err.message);
                    }
                    console.log(`Total records in database: ${row.total}`);
                    
                    // 关闭数据库连接
                    db.close((err) => {
                      if (err) {
                        return console.error(err.message);
                      }
                      console.log('Closed the database connection.');
                    });
                  });
                });
              });
            }
          });
        });
      });
    });
  });
});
