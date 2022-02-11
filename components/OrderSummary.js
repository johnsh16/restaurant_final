import React from 'react'
import {Card, CardContent} from '@mui/material'
import AppContext from '../context/AppContext'

function OrderSummary () {

    var {cart, addItem, removeItem} = React.useContext(AppContext)

    return (
        <Card className={styles.order_summary}>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}

export default OrderSummary