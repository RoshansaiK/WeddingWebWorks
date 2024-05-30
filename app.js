const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naaistam@94",
  database: "Wedding",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle form submission
app.post("/submit-feedback", (req, res) => {
  const { feedbackType, description, rating } = req.body;
  const sql = `INSERT INTO feedback (type, description, rating) VALUES (?, ?, ?)`;
  connection.query(
    sql,
    [feedbackType, description, rating],
    (error, results, fields) => {
      if (error) {
        console.error("Error executing query: " + error.stack);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.status(200).json({ message: "Feedback submitted successfully" });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
