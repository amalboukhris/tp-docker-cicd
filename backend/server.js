const express = require("express");          // Framework web
const cors = require("cors");                // Gestion CORS
const { Pool } = require("pg");              // Client PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;       // Port configurable

// ------------------------------
// DATABASE CONFIGURATION
// ------------------------------
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "mydb",
});

// ------------------------------
// MIDDLEWARE CORS
// ------------------------------
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:*",     // Dev only
    "http://backend",
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ------------------------------
// ROUTE API PRINCIPALE
// ------------------------------
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true,
  });
});

// ------------------------------
// ROUTE POUR TEST DATABASE
// ------------------------------
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    
    res.json({
      message: "Data from Database",
      data: result.rows,
      timestamp: new Date().toISOString(),
      success: true,
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Database error",
      error: err.message,
      success: false,
    });
  }
});

// ------------------------------
// DÉMARRAGE SERVEUR
// ------------------------------
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint:  http://localhost:${PORT}/api`);
  console.log(`DB endpoint:   http://localhost:${PORT}/db`);
});

