import React from 'react'
import {Card, CardContent} from '@mui/material'
import AppContext from '../context/AppContext'

function CartComponent () {

    var {cart, addItem, removeItem} = React.useContext(AppContext)

    return (
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
    )
}

export default OrderSummary