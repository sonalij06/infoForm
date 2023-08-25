const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL connection details

try {
  // MySQL connection code here
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: 'root',
    password: 'Sonali@123',
    database: 'web_page'
  });
  connection.on('error', (error) => {
    console.error('Connection error:', error);
  });

// Replace 'your_mysql_host', 'your_mysql_user', 'your_mysql_password', and 'your_mysql_database'
// with your actual MySQL connection details.

// Set a static folder for serving the HTML file
app.use(express.static(__dirname));

// Define a route for the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a route to handle form submission and insert data into MySQL
app.post('/addData', (req, res) => {
  const name = req.body.username;
  const First = req.body.first;
  const last = req.body.last
  const email = req.body.email;
  const passwd = req.body.password;

  // Assuming you have a table named 'users' with columns 'name' and 'email'
  const sql = 'INSERT INTO accounts (UserName, FirstName, LastName, Email, UserPassword) VALUES (?, ?, ?, ?, ?)';

  connection.query(sql, [name, email,First,last ,passwd], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully!');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

// Start the server
const port = 3000; // Choose any available port you prefer
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
} catch (error) {
  console.error('Error in MySQL connection:', error);
}