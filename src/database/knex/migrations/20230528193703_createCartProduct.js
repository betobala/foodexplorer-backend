
exports.up = knex => knex.schema.createTable("cart_products", table =>{
  table.increments("id")
  table.integer("cart_id").references("id").inTable("carts").onDelete("CASCADE")
  table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE")
  table.float("price").notNullable()
  table.integer("number_of_products").notNullable()

})

exports.down = knex => knex.schema.dropTable("cart_products", table =>{

})