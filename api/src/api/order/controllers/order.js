("use strict");

// @ts-ignore
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        // @ts-ignore
        const { products } = ctx.request.body;
        const lineItems = await Promise.all(
            products.map(async (/** @type {{ id: any; }} */ product) => {
                const item = await strapi
                    .service("api::product.product")
                    .findOne(product.id);

                if (!item) {
                    ctx.response.status = 400;
                    return { error: `Product with id ${product.id} not found` };
                }

                // @ts-ignore
                if (product.quantity <= 0) {
                    ctx.response.status = 400;
                    return { error: `Invalid quantity for product ${product.id}` };
                }
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    // @ts-ignore
                    quantity: product.quantity,
                };
            })
        );

        try {
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ["US", "CA"] },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: process.env.CLIENT_URL + "?success=true",
                cancel_url: process.env.CLIENT_URL + "?success=false",
                line_items: lineItems,
            });

            await strapi
                .service("api::order.order")
                .create({
                    data: {
                        products,
                        stripeId: session.id
                    },
                });

            return { stripeSession: session };

        } catch (error) {
            ctx.response.status = 500;
            return { error };
        }
    },
}));