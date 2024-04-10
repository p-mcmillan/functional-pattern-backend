const knex = require('knex')(require('./knexfile'))

knex
  .raw('SELECT 1+1 as result')
  .then((result) => {
    console.log('Connection successful:', result.rows[0].result)
  })
  .catch((error) => {
    console.error('Error connecting to database:', error)
  })
