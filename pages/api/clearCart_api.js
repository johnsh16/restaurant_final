import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    var redis = await loadRedis()
    redis.set('cart', '{"items": [], "total": 0}')
    res.status(200).send('done')
}