// API_URL/auth/local/register for registering a user
// API_URL/auth/local/ for logging in a user
import axios from 'axios'
import Cookies from 'js-cookie'
import AppContext from '../context/AppContext';


export async function registerUser (props) {
    var {setUser} = React.useContext(AppContext)

    //dont do anything if we aren't on the client side (unless a window is present)
    if (typeof window === "undefined") {
        return;
    }

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, props)
            .then((res) => {
                console.log(res.data)
                Cookies.set('token', res.data.jwt)
                setUser(res.data.user)
                resolve(res.data.user)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

export async function loginUser (props) {
    var {setUser} = React.useContext(AppContext)

    if (typeof window === "undefined") {
        return;
    }

    return new Promise((resolve, reject) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, props)
            .then((res) => {
                console.log(res.data)
                Cookies.set('token', res.data.jwt)
                setUser(res.data.user)
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