const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FavoritesController{
  async index(request, response){
    const { user_id } = request.params

    const favorites = await knex("favorites")
    .select([
      "meals.id",
      "meals.name",
      "meals.avatar"
    ])
    .where("favorites.user_id", user_id)
    .innerJoin("meals", "meals.id", "favorites.meal_id")
    .orderBy("meals.name")
    
    return response.json(favorites)
  }

  async create(request, response){
    const { meal_id, user_id } = request.query

    await knex("favorites").insert({
      meal_id,
      user_id
    })

    return response.json()
  }

  async delete(request, response){
    const { meal_id, user_id } = request.query

    await knex("favorites").where({meal_id:meal_id, user_id: user_id}).delete()

    return response.json()
  }

  async show(request, response){
    const { meal_id, user_id } = request.query

    const userFavorites = await knex("favorites")
    .where({ user_id, meal_id })

    return response.json({userFavorites})
  }
}

module.exports = FavoritesController