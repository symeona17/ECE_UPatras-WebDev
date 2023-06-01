const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.static('public'));
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('database.db');

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  surname TEXT,
  email TEXT,
  message TEXT
)`);

// Function to insert data into the database
function insertContactData(name, surname, email, message) {
  const query = `INSERT INTO Contact_Us (name, surname, email, message)
                 VALUES (?, ?, ?, ?)`;

  db.run(query, [name, surname, email, message], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return;
    }
    console.log('Data inserted successfully!');
  });
}

app.post('/submit_form', (req, res) => {
  const { name, surname, email, message } = req.body;

  insertContactData(name, surname, email, message);
  res.sendStatus(200);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
