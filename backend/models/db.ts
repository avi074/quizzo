import mysql from "mysql2/promise"
import env from "../config/env"

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = env

// Function to create the database if it doesn't exist
async function initializeDatabase() {
  // Create a temporary connection (without specifying a database)
  const tempConnection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  })

  // Ensure the database exists
  await tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
  await tempConnection.end() // Close temp connection
}

// Create database first, then create the pool
function createPool() {
  initializeDatabase() // Ensure DB exists before creating pool
    .then((_) => {
      console.log("✅ Database ensured")
    })
    .catch((err) => {
      console.error("❌ Error ensuring database:", err)
      process.exit(1)
    })

  const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })

  console.log("✅ MySQL Pool connected")
  return pool
}

// Export the pool promise
const db = createPool()


db.query(
  `
    CREATE TABLE IF NOT EXISTS quizzes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL
      )
      `,
)
  .then(() => {
    console.log("✅ Tables ensured")
  })
  .catch((err) => {
    console.error("❌ Error creating tables:", err)
    process.exit(1)
  })

export default db
