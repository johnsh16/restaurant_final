import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {Card, CardContent, FormGroup, CardHeader, Stack, TextField, Button} from "@mui/material"
import styles from '../styles/checkout.module.css'
import AppContext from '../context/AppContext'
import CartComponent from '../components/CartComponent'
import PlaceOrder from '../components/PlaceOrder'
import {loadCart} from '../lib/cartFunctions'

function Checkout () {

    const [cart, setCart] = React.useState()

    useEffect(() => {
        loadCart()
            .then(res => {
                setCart(res)
            })
            .catch(err => {
                console.log(err)
            }) 
    }, [])

    return (
        <>
        <div className={styles.card_row}>
        <Stack direction="row" spacing={1}>
            <CartComponent cart={cart}/>
            <PlaceOrder cart={cart}/>
        </Stack>
        </div>
        </>
    )
}

export default Checkout 