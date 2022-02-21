import React from 'react'
import axios from 'axios'
import AppContext from '../context/AppContext'
import { createClient } from 'redis'

export async function loadRedis () {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err))
    await client.connect()
    return client
}

export function saveCart (props) {
    console.log('props sent to API', props)
    axios.post('/api/saveCart_api', props)
        .then((res) => {
            console.log(res.data)
            return true
        })
        .catch((err) => {
            console.log(err)
            return false
        })
}

export function loadCart () {
    return new Promise ((resolve, reject) => {
        axios.get('/api/loadCart_api')
        .then((res) => {
            console.log('returned from API:', res.data)
            resolve(res.data)
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