"use strict"

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const stripe = require("stripe")("sk_test_51PXztiKjfhRPG3Yhsh7d0hiGN03NszZk5OrYApnjYvq847yccE6rGtoQNLH1BjRtZInh6ITf9Nme9Pyjg5Yd9Eso00Po5im74C")

module.exports = {
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body)
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Order ${new Date()} by ${ctx.state.user._id}`
    })

    return await strapi.services.order.create({
      user: ctx.state.user._id,
      charge_id: charge.id,
      amount: amount,
      address,
      dishes
    })
  }
}
