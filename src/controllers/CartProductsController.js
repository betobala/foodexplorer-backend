const knex = require("../database/knex")

class CartProductsController{
  async create(request, response){
    const { meal_id, price, number_of_products } = request.body;
    const { cart_id } = request.params

    const cartProductQuantity = await knex("cart_products")
    .where("cart_id", cart_id)
    .where("meal_id", meal_id)
    .select("number_of_products")
    .first()


    if(cartProductQuantity){
      const newQuantity = (cartProductQuantity.number_of_products) + number_of_products

      await knex("cart_products")
      .where("meal_id", meal_id)
      .where("cart_id", cart_id)
      .update({
        number_of_products: newQuantity
      })

      return response.json()
    }

    await knex("cart_products").insert({
      meal_id,
      cart_id,
      price,
      number_of_products
    })

    return response.json()
  }

  async update(request, response){
    const { number_of_products } = request.body
    const { product_id } = request.params

    const prodcut = await knex("cart_products")
    .select()
    .where("id", product_id).first()
    

    await knex("cart_products")
    .where("id", product_id)
    .update({
      number_of_products
    })

    return response.json()
 }

 async delete(request, response){
    const { product_id } = request.params

    await knex("cart_products").where("id", product_id).delete()

    return response.json()
 }

}
  
module.exports = CartProductsController