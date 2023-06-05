
exports.up = knex => knex.schema.createTable("order_products", table =>{
  table.increments("id")
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE")
  table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE")
  table.float("price").notNullable()
  table.integer("number_of_products").notNullable()

})

exports.down = knex => knex.schema.dropTable("order_products", table =>{

})