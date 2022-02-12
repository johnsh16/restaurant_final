import React from 'react'
import { useRouter } from 'next/router'
import {Card, CardContent, FormGroup, CardHeader, Stack, TextField, Button} from "@mui/material"

import styles from '../styles/checkout.module.css'
import AppContext from '../context/AppContext'
import OrderSummary from '../components/OrderSummary'
import PlaceOrder from '../components/PlaceOrder'

function checkout () {

    return (
        <>
        <div className={styles.card_row}>
        <Stack direction="row" spacing={1}>
            <PlaceOrder />
        </Stack>
        </div>
        </>
    )
}

export default checkout 