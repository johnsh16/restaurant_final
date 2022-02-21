import { loadRedis } from "../../lib/cartFunctions"

export default async function handler(req, res) {
    var redis = await loadRedis()
    var response = await redis.get('cart')
    console.log("loadCart: ", response)
    res.status(200).send(response)
}