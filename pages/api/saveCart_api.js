import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    var redis = await loadRedis()
    redis.get('cart')
    redis.set('cart', JSON.stringify(req.body))
    res.status(200)
}