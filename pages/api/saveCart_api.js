import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    console.log(req.body)
    var redis = await loadRedis()
    redis.set('cart', JSON.stringify(req.body))
    var newCart = await redis.get('cart')
    console.log(newCart)
    res.send(newCart)
}