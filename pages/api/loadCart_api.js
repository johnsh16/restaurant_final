import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    var redis = await loadRedis()
    var response = await redis.get('cart')
    if (response == null) {
        let emptyCart = '{"items": [], "total": 0}'
        res.status(200).send(JSON.stringify(response))
        return 
    } else {
        res.status(200).send(JSON.stringify(response))
        return
    }
}