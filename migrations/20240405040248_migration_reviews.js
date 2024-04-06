exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.uuid('id').primary()
    table.string('contact_name').notNullable()
    table.string('contact_email').notNullable()
    table.integer('rating').notNullable()
    table.string('review').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now()) // Default to current timestamp
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('reviews')
}
