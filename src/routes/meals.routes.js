const { Router } = require("express")
const multer = require("multer")

const MealsController = require("../controllers/MealsController");
const MealAvatarController = require("../controllers/MealAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const uploadConfig = require("../configs/upload")

const mealsRoutes = Router();

const upload = multer(uploadConfig.MULTER)

const mealsController = new MealsController()
const mealAvatarController = new MealAvatarController()


mealsRoutes.use(ensureAuthenticated)


mealsRoutes.get("/", mealsController.index)
mealsRoutes.post("/", mealsController.create)
mealsRoutes.get("/:id", mealsController.show)
mealsRoutes.delete("/:meal_id", mealsController.delete)
mealsRoutes.put("/:meal_id", mealsController.update)
mealsRoutes.patch("/avatar/:meal_id", upload.single("avatar"), mealAvatarController.update)


module.exports = mealsRoutes;