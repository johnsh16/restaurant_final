import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {Stack} from "@mui/material"
import styles from '../styles/checkout.module.css'
import CartComponent from '../components/CartComponent'
import PlaceOrder from '../components/PlaceOrder'
import {loadCart} from '../lib/cartFunctions'

function Checkout () {

    return (
        <>
        <div className={styles.card_row}>
        <Stack direction="row" spacing={1}>
            <CartComponent/>
            <PlaceOrder/>
        </Stack>
        </div>
        </>
    )
}

export default Checkout 