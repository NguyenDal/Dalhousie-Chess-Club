const mysql = require('mysql2/promise');

let pool;

// Function to create a new connection pool
const createPool = () => {
    // Setting up a new pool with all the required DB details
    pool = mysql.createPool({
        host: process.env.DB_HOST, // DB host from environment variables
        user: process.env.DB_USER, // DB user from environment variables
        password: process.env.DB_PASS, // DB password from environment variables
        database: process.env.DB_NAME, // DB name from environment variables
        waitForConnections: true, // Makes sure requests wait if all connections are busy
        connectionLimit: 10, // Max number of connections at once
        queueLimit: 0, // No limit on queued requests
        connectTimeout: 10000, // Timeout after 10 seconds if no connection is made
    });
    return pool; // Return the newly created pool
};

// Create the pool as soon as this file is loaded
createPool();

// Export the pool and the function to create a new pool
module.exports = {
    pool, // Current pool instance
    initializePool: createPool, // Function to re-create the pool
};
