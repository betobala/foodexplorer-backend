const { Router } = require("express")

const usersRouter = require("./users.routes")
const ingredientsRouter = require("./ingredients.routes")
const mealsRouter = require("./meals.routes")
const sessionsRouter = require("./sessions.routes")
const favoritesRouter = require("./favorites.routes")
const cartsRouter = require("./carts.routes")
const ordersRouter = require("./orders.routes")

const routes = Router();

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/ingredients", ingredientsRouter)
routes.use("/meals", mealsRouter)
routes.use("/favorites", favoritesRouter)
routes.use("/carts", cartsRouter)
routes.use("/orders", ordersRouter)

module.exports = routes;