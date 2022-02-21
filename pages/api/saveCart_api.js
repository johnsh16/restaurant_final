import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    var redis = await loadRedis()
    redis.set('cart', JSON.stringify(req.body))
    let message = await redis.get('cart')
    console.log('check cart', message)
    res.status(200).send(message)
}