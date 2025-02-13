const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 5030;

// Set up SQLite database

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies/session
}));
app.use(bodyParser.json());


// Connect to SQLite database
let db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Create users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

// signUp endpoint
app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
  db.run(query, [email, username, password], function (err) {
    if (err) {
      if (err.code == "SQLITE_CONSTRAINT") {
        return res
          .status(400)
          .json({ message: "Account already exist. Try logging in" });
      }
      // Handle other types of errors
      return res
        .status(500)
        .json({ message: "An error occurred. Please try again." });
    }
    res.json({ message: "User created successfully", id: this.lastID });
  });
});

//logIn endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  console.log('Login attempt:', { email, password }); // Log the input

  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Database error:', err); // Log database errors
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
    if (!row) {
      console.log('Invalid email or password'); // Log invalid credentials
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Store user data in the session
    req.session.user = {
      id: row.id,
      email: row.email,
      username: row.username,
    };

    console.log('Login successful:', req.session.user); // Log successful login

    // Return user data to the frontend
    res.json({
      message: 'Login successful',
      user: {
        id: row.id,
        email: row.email,
        username: row.username,
      },
    });
  });
});

// Profile endpoint
app.get('/profile', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  // Fetch user data from the session
  const user = req.session.user;

  // Return user data to the frontend
  res.json({
    id: user.id,
    email: user.email,
    username: user.username,
  });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed. Please try again.' });
    }
    res.json({ message: 'Logout successful' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
