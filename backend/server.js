const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://frontend" // Nom du service Docker si utilisé dans Compose
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Route de test général
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true
  });
});

// Route test DB
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, server_time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM test_users');
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

