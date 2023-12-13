const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 80;

// RDS connection details
const dbConfig = {
  host: 'database-1.chiqz525uwfm.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Reddyrakesh11',
  database: 'esne_database',
  port: 3306, // Default MySQL port
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// API endpoint to fetch data from RDS
app.get('/', (req, res) => {
  // Display the Hello message
  let responseMessage = 'Hello, Jenkins Pipeline! ESNE Project with Jenkins WebHook and Rolling Update 50 and 100<br><br>';

  // Fetch data from RDS
  pool.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from RDS:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Display fetched data
    if (results && results.length > 0) {
      responseMessage += '<strong>User Data from RDS:</strong><br>';
      results.forEach((user) => {
        responseMessage += `Username: ${user.username}, Email: ${user.email}<br>`;
      });
    } else {
      responseMessage += 'No user data found in RDS.';
    }

    res.send(responseMessage);
  });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
