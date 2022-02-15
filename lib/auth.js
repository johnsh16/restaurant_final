// API_URL/auth/local/register for registering a user
// API_URL/auth/local/ for logging in a user
import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'



export async function registerUser (props) {


    //dont do anything if we aren't on the client side (unless a window is present)
    if (typeof window === "undefined") {
        return;
    }

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
            data: {
                email: props.email,
                password: props.password,
                username: props.username,
                firstname: props.first,
                lastname: props.last
            },
            contentType: 'application/json' 

        })
            .then((res) => {
                console.log(res.data)
                Cookies.set('token', res.data.jwt)
                resolve(res.data.user)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

export async function loginUser (props) {

    if (typeof window === "undefined") {
        console.log("catch")
        return;
    }

    console.log("Props", props)

    return new Promise((resolve, reject) => {
        Cookies.remove('token')
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
            identifier: props.identifier,
            password: props.password
        })
            .then((res) => {
                console.log(res.data)
                Cookies.set('token', res.data.jwt)
                resolve(res.data.user)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

export async function logoutUser () {
    Cookies.remove('token')
    return true
}