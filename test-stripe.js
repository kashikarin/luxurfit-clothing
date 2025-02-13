require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000,
            currency: "usd",
            payment_method_types: ["card"]
        });
        console.log("✅ Stripe Payment Intent Created:", paymentIntent);
    } catch (error) {
        console.error("❌ Stripe Error:", error);
    }
}

testStripe();
