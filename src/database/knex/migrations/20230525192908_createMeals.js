
exports.up = knex => knex.schema.createTable("meals", table =>{
  table.increments("id")
  table.text("name").notNullable()
  table.text("description").notNullable()
  table.float("price").notNullable()
  table.text("avatar")
  table.text("category").notNullable()
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())


})

exports.down = knex => knex.schema.dropTable("meals", table =>{

})