const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class CartsController {
  async update(request, response) {
    const { cart_id } = request.params
    let total_price = 0

    const cart_products = await knex("cart_products").select().where("cart_id", cart_id)
    cart_products.map((product) => (
      total_price += ((product.price) * (product.number_of_products))
    ))

    await knex("carts").where("id", cart_id).update({
      total_price: total_price
    })
    return response.json(total_price)
  }

  async index(request, response) {
   const  user_id  = request.user.id

    const userCart = await knex("carts").where("user_id", user_id).first()

    return response.json(userCart)
  }

  async show(request, response){
    const { cart_id } = request.params

    const cart_products = await knex("cart_products")
      .select([
        "meals.name",
        "meals.avatar",
        "cart_products.price",
        "cart_products.number_of_products",
        "cart_products.id"
      ])
      .where("cart_products.cart_id", cart_id)
      .innerJoin("meals", "meals.id", "cart_products.meal_id")
      //.orderBy("meals.name")


    return response.json(cart_products)
  }
}

module.exports = CartsController