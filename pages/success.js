import {Card, CardHeader, CardContent, CardActions, Typography, CircularProgress} from '@mui/material'
import React, { useEffect } from 'react'
import {clearCart, loadCart} from "../lib/cartFunctions"
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

function Success () {

    const [orderDetails, setOrderDetails] = React.useState()
    const {user, isLoading} = useUser()
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        loadCart() 
            .then((res) => {
                setOrderDetails(JSON.parse(res))
                setTimeout(function () {
                    clearCart()
                }, 1000)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <CircularProgress />
        )
    } else if (orderDetails) {
        return (
            <Card>
              <CardHeader
                title="Success" 
                />
                <CardContent>
                    <Typography>{user ? user : "Anonymous"}, thank you for your order!</Typography>
                    <Typography>Order total: {orderDetails.total}</Typography>
                </CardContent>
                <CardActions>
                    <div onClick={() => router.push("/")}>Return Home</div>
                </CardActions>
            </Card>
        )
    } else {
        return (
            <CircularProgress />
        )
    }
    
}

export default Success