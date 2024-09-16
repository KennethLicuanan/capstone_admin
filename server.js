import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'capstonedb'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Route to add a study
app.post('/add-study', (req, res) => {
  const { title, author, abstract, keywords, year, identifier } = req.body;

  // Validate that all fields are provided
  if (!title || !author || !abstract || !keywords || !year || !identifier) {
    return res.status(400).send('All fields are required.');
  }

  // SQL query to insert the study
  const sql = 'INSERT INTO studiestbl (title, author, abstract, keywords, year, identifier) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [title, author, abstract, keywords, year, identifier];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error adding study: ${err.message}`);
    }
    res.status(200).send('Study added successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
