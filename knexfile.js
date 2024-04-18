require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ssl: {
    //   // Set SSL options as needed
    //   rejectUnauthorized: false, // Change this to true in production
    // },
  },
  catch(error) {
    console.error('Error initializing Knex:', error);
  },
};
