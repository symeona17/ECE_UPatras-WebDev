const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('database.db');

// Create a table to store form responses
db.run(`CREATE TABLE IF NOT EXISTS Contact_Us (
    timestamp DATETIME DEFAULT (datetime('now', 'localtime')),
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    email TEXT,
    message TEXT
)`);

// Function to insert form data into the database
function insertFormData(name, surname, email, message, callback) {
    const now = new Date();
    
    const formattedTimestamp = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    db.run(`INSERT INTO Contact_Us (name, surname, email, message, timestamp)
            VALUES (?, ?, ?, ?, ?)`, [name, surname, email, message, formattedTimestamp], callback);
}

// Export the insertFormData function
module.exports = {
    insertFormData
};
