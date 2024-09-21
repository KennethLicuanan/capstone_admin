import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connection to the database
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

// Route to fetch studies count by type
app.get('/studies-by-type', (req, res) => {
  const sql = `
    SELECT type, COUNT(*) AS count 
    FROM studiestbl 
    GROUP BY type
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error fetching studies by type: ${err.message}`);
    }
    res.status(200).json(result);
  });
});

// Route to fetch the total number of studies
app.get('/total-studies', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM studiestbl';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error fetching total studies: ${err.message}`);
    }
    console.log('Total studies count:', result[0].total); // Logging the result
    res.status(200).json({ total: result[0].total });
  });
});

// Route to add a study (already exists)
app.post('/add-study', (req, res) => {
  const { title, author, abstract, keywords, year, identifier, type } = req.body;

  if (!title || !author || !abstract || !keywords || !year || !identifier || !type) {
    return res.status(400).send('All fields are required.');
  }

  const sql = 'INSERT INTO studiestbl (title, author, abstract, keywords, year, identifier, type) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, author, abstract, keywords, year, identifier, type];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error adding study: ${err.message}`);
    }
    res.status(200).send('Study added successfully!');
  });
});

// Route to fetch user activity logs
app.get('/user-logs', (req, res) => {
  const sql = `
    SELECT u.credentials, a.activity, a.date
    FROM usertbl u
    JOIN activitylog_tbl a ON u.user_id = a.user_id
    ORDER BY a.date DESC
  `;

  console.log('Executing SQL:', sql); // Log the SQL query
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send(`Error fetching user logs: ${err.message}`);
    }
    console.log('Fetched logs:', result); // Log the result
    res.status(200).json(result);
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
