const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class IngredientsController{
  async index(request, response){
    const { meal_id } = request.params

    const ingredients = await knex("ingredients")
    .where({ meal_id })

    if(ingredients.length <= 0){
      throw new AppError("Prato não encontrado")
    }
    
    return response.json(ingredients)
  }

  async delete(request, response){
    const { meal_id } = request.params

    await knex("ingredients").where({ meal_id }).delete()

    return response.json()
  }
}

module.exports = IngredientsController