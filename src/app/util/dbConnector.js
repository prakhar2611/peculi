const { Pool } = require('pg');

// Configuration for the PostgreSQL connection pool
const poolConfig = {
  user: 'postgres',      // Your database username
  host: 'localhost',          // Your database server host
  database: 'xpns',  // Your database name
  password: 'DedSec@2611',  // Your database password
  port: 5432,                 // Your database port
  // Additional options:
  // max: 10,                 // Maximum number of clients in the pool
  // idleTimeoutMillis: 30000 // How long a client is allowed to remain idle before being closed
};

// Create a new pool instance with the configuration
const pool = new Pool(poolConfig);

// Export the pool to use it elsewhere in your application
module.exports = pool;

