import axios from 'axios'
import { createClient } from 'redis'

export async function loadRedis () {
    /**
     * const client = createClient({
        url: process.env.NEXT_PUBLIC_REDIS_URL
    }); **/
    const client = createClient()
    client.on('error', (err) => console.log('Redis Client Error', err, process.env.REDIS_URL))
    await client.connect()
    return client
}

export function saveCart (props) {
    console.log('props sent to API', props)
    return new Promise ((resolve, reject) => {
        axios.post('/api/saveCart_api', props)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            console.log("error here", err)
            reject(err)
        })
    })  
}

export function clearCart () {
    axios.get('/api/clearCart_api')
    console.log('cleared')
}

export function loadCart () {
    return new Promise ((resolve, reject) => {
        axios.get('/api/loadCart_api')
        .then((res) => {
            if (res.data !== "") {
                console.log('returned from API:', res.data)
                resolve(res.data)
            } else if (res.data === "") {
                resolve({"items": [], "total": 0})
            }
        })
        .catch((err) => {
            console.log(err)
            reject(false)
        })
    })
}

export function savePage (props) {
    axios.post('/api/savePage_api', props) 
        .then((res) => {
            console.log('saved as: ', res.data)
        })
        .catch((err) => {
            console.log("error loading page", err)
        })
}

export function loadPage () {
    return new Promise ((resolve, reject) => {
        axios.get('/api/loadPage_api')
        .then((res) => {
            console.log('returned page from API', res.data)
            resolve(res)
        })
        .catch((err) => {
            console.log('error returning current page', err)
            reject(err)
        })
    })
}

export function createPaymentIntent () {
    return new Promise ((resolve, reject) => {
        axios.get('/api/create-payment-intent')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}