const express = require('express');
const mysql = require('mysql');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// RDS connection details
const dbConfig = {
  host: 'database-1.cv9kz3hi8ocz.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Reddyrakesh11',
  database: 'esne_database',
  port: 3306, // Default MySQL port
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to get package information
const getPackageInfo = (callback) => {
  exec('npm list --depth=0', (error, stdout, stderr) => {
    if (error) {
      console.error('Error getting package information:', error);
      callback('Error getting package information');
      return;
    }
    callback(null, stdout);
  });
};

// API endpoint to fetch data from RDS
app.get('/', (req, res) => {
  // Display the Hello message
  let responseMessage = 'Hello, Jenkins Pipeline! ESNE Project with Jenkins WebHook and Rolling Update 18th and RDS on<br><br>';

  // Display Node.js version
  responseMessage += `<strong>Node.js Version:</strong> ${process.version}<br><br>`;

  // Fetch package information
  getPackageInfo((error, packageInfo) => {
    if (error) {
      responseMessage += `<strong>Package Information:</strong> ${error}<br><br>`;
    } else {
      responseMessage += `<strong>Package Information:</strong><br>${packageInfo}<br><br>`;
    }

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
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));