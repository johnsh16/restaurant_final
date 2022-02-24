import {loadRedis} from '../../lib/cartFunctions'

export default async function handler(req, res) {
    const redis = await loadRedis()
    redis.set('auth', JSON.stringify({user: req.body.user, auth: true, jwt: req.body.jwt}))
    let response = await redis.get('auth')
    console.log('response', JSON.parse(response))
    res.status(200).send(response)
} 