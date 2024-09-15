const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8100;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'capstonedb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Route to add a study
app.post('/add-study', (req, res) => {
  const { title, authors, abstract, tags, year, identifier } = req.body;

  if (!title || !authors || !abstract || !tags || !year || !identifier) {
    return res.status(400).send('All fields are required.');
  }

  const sql = 'INSERT INTO studiestbl (title, author, abstract, keywords, year, identifier) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [title, authors, abstract, tags, year, identifier];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error adding study: ${err.message}`);
    }
    res.status(200).send('Study added successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
