import mysql from "mysql2"
import env from "../config/env"

const pool = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  connectionLimit: 10,
})

const db = pool.promise()

// Create tables if they don't exist
async function initializeDatabase() {
  try {
    await db.query(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`)
    await db.query(`USE ${env.DB_NAME}`)

    await db.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        user_id INT NOT NULL,
      )
    `)
    console.log("Database initialized ✅")
  } catch (err) {
    console.error("Database initialization failed ❌", err)
  }
}

// Initialize the database
initializeDatabase()

export default db
