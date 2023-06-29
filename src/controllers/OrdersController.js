const knex = require("../database/knex");
const CartProductsController = require("./CartProductsController");

class OrdersController {
    async create(request, response) {
        const user_id = request.user.id
        const { cartProducts, totalPrice, cartId } = request.body;

        const [order_id] = await knex("orders").insert({
            user_id,
            total_price: totalPrice,
            status: "Pendente",
        })

        const filteredCartProducts = cartProducts.map((product) => ({
            order_id: order_id,
            meal_id: product.meal_id,
            price: product.price,
            number_of_products: product.number_of_products
        }))

        await knex("order_products").insert(filteredCartProducts)

        await knex("cart_products").delete()
            .where("cart_id", cartId)

        await knex("carts").update("total_price", null)
            .where("id", cartId)
    }

    async show(request, response) {
        const user_id = request.user.id

        const userOrdersInformartion = await knex("orders")
            .select([
                "orders.status",
                "orders.created_at",
                "orders.id"

            ])
            .where("user_id", user_id)

            const userOrdersProducts = await knex("order_products")
            .select([
                "meals.name",
                "order_products.number_of_products",
                "order_products.order_id"
            ])
            .whereIn("order_id", userOrdersInformartion.map(order => order.id))
            .innerJoin("meals", "meals.id", "order_products.meal_id")

            const userOrders = userOrdersInformartion.map((order) => ({
                order_id: order.id,
                status: order.status,
                date: order.created_at,
                products: userOrdersProducts.filter(product => product.order_id === order.id)
            }))


        console.log(userOrders)
        return response.json(userOrders)
    }

}


module.exports = OrdersController