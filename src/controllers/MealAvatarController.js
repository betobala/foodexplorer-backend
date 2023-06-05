const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage");

class MealAvatarController {
  async update(request, response){
    const { meal_id } = request.params
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const meal = await knex("meals")
    .where({ id: meal_id }).first()
    
    if(meal.avatar){
      await diskStorage.deleteFile(meal.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    meal.avatar = filename

    await knex("meals").update(meal).where({ id: meal_id })

    return response.json()
  }
}

module.exports = MealAvatarController