const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage");

class mealsController {
  async create(request, response) {
    const { name, description, price, ingredients, category } = request.body

    const [meal_id] = await knex("meals").insert({
      name,
      description,
      price,
      category,
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        meal_id,
        name
      }
    })
    await knex("ingredients").insert(ingredientsInsert)

    return response.json({ meal_id })
  }

  async show(request, response) {
    const { id } = request.params
    const meal = await knex("meals").where({ id }).first()

    if (meal && meal.id == id) {
      const ingredients = await knex("ingredients").where({ meal_id: id }).orderBy("name")
      return response.json({
        ...meal,
        ingredients
      })
    } else {
      throw new AppError("Prato não encontrado.")
    }
  }

  async delete(request, response) {
    const { meal_id } = request.params
    const diskStorage = new DiskStorage()

    const [meal] = await knex("meals").where({ id: meal_id })
    console.log(meal.avatar)

    if (meal.avatar) {
      await diskStorage.deleteFile(meal.avatar)
    }

    await knex("meals").where({ id: meal_id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { name } = request.query

    const meals = await knex("meals")
      .select("meals.*")
      .distinct()
      .join("ingredients", "ingredients.meal_id", "meals.id")
      .whereLike("meals.name", `%${name}%`)
      .orWhereLike("ingredients.name", `%${name}%`)
      .orderBy("name")

    return response.json(meals)

  }

  async update(request, response) {
    const { name, description, price, category, ingredients } = request.body
    const { meal_id } = request.params

    const meal = await knex("meals")
      .select()
      .where("id", meal_id).first()

    if (!meal) {
      throw new AppError("Prato não encontrado")
    }

    await knex("meals")
      .where("id", meal_id)
      .update({
        name: name,
        description: description,
        price: price,
        category: category,
        updated_at: knex.fn.now()
      })

    await knex("ingredients").where({ meal_id }).delete()

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        meal_id: meal_id,
        name: ingredient
      }
    })
    await knex("ingredients").insert(ingredientsInsert)

    return response.json()

  }
}

module.exports = mealsController