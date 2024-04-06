exports.up = function (knex) {
  return knex.schema
    .alterTable('reviews', (table) => {
      // Step 1: Add a new UUID column
      table.uuid('new_id')
    })
    .then(() => {
      // Step 2: Update the new UUID column with values from the existing integer id column
      return knex.raw('UPDATE reviews SET new_id = uuid_generate_v4()')
    })
    .then(() => {
      // Step 3: Drop the existing integer id column
      return knex.schema.alterTable('reviews', (table) => {
        table.dropColumn('id')
      })
    })
    .then(() => {
      // Step 4: Rename the new UUID column to id
      return knex.schema.alterTable('reviews', (table) => {
        table.renameColumn('new_id', 'id')
      })
    })
}

exports.down = function (knex) {
  // Define down migration if needed
}
