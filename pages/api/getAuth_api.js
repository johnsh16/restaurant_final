import { loadRedis } from "../../lib/cartFunctions";

export default async function handler(req, res) {
    const redis = await loadRedis()
    try {
        let authDetails = await redis.get('auth')
        res.send(JSON.parse(authDetails))
    } catch {
        res.send(false)
    }
}