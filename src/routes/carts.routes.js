const { Router } = require("express")
const multer = require("multer")

const CartProductsController = require("../controllers/CartProductsController");
const CartsController = require("../controllers/CartsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const cartsRoutes = Router();

const cartsController = new CartsController()
const cartProductsController = new CartProductsController()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post("/:cart_id", cartProductsController.create)
cartsRoutes.patch("/:cart_id", cartsController.update)
cartsRoutes.get("/", cartsController.index)
cartsRoutes.get("/:cart_id", cartsController.show)
cartsRoutes.delete("/:product_id", cartProductsController.delete)



module.exports = cartsRoutes;