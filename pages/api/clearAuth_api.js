import { loadRedis } from "../../lib/cartFunctions";

export default async function handler(req, res) {
    const redis = await loadRedis()
    redis.del('auth')
    res.send('cleared')
}