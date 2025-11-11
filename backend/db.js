const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Vérification de la connexion
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('DB connected, time:', res.rows[0]);
  }
});

// Fonction pour créer les tables si elles n'existent pas
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )
    `);

    // Insérer quelques données de test
    await pool.query(`
      INSERT INTO test_users (name)
      VALUES ('amal')
      ON CONFLICT DO NOTHING
    `);

    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Database initialization error:', err);
  }
}

// Appeler l'initialisation
initializeDatabase();

module.exports = pool;

