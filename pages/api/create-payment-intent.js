import { loadRedis } from '../../lib/cartFunctions'
import { loadStripe } from '@stripe/stripe-js'



export default async function handler (req, res) {
    const stripe = require('stripe')(String(process.env.NEXT_PUBLIC_STRIPE_SECRET))
    
    const redis = await loadRedis()
    const cartRaw = await redis.get('cart')
    const cart = JSON.parse(cartRaw)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cart.total*100,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
}