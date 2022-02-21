import { loadRedis } from "../../lib/cartFunctions";

export default async function handler(req, res) {
    var redis = await loadRedis()
    var currentPage = redis.set('page', req.body.page)
    res.status(200).send(currentPage)
}