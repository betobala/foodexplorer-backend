const { Router } = require("express")

const IngredientsController = require("../controllers/IngredientsController")

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController()

ingredientsRoutes.get("/:meal_id", ingredientsController.index)


module.exports = ingredientsRoutes;