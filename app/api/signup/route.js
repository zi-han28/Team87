const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5030;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

// signUp endpoint
app.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
    db.run(query, [email, username, password], function(err) {
        if (err) {
            if(err.code == 'SQLITE_CONSTRAINT'){
                return res.status(400).json({ message: 'Account already exist. Try logging in' });
            }
            // Handle other types of errors
            return res.status(500).json({ message: 'An error occurred. Please try again.' });
        }
        res.json({ message: 'User created successfully', id: this.lastID });
    });
});

//logIn endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
  
    db.get(query, [email], (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred. Please try again.' });
      }
      if (!row) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
      if (row.password !== password) { // In a real app, use bcrypt to compare hashed passwords
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
      res.json({ message: 'Login successful', user: row });
    });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});