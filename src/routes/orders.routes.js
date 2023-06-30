const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersRoutes = Router();

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post("/", ordersController.create)
ordersRoutes.get("/", ordersController.show)
ordersRoutes.get("/admin", ordersController.index)
ordersRoutes.patch("/:order_id", ordersController.update)

module.exports = ordersRoutes;