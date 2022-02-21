import {Card} from '@mui/material'
import { useEffect } from 'react'
import {clearCart} from "../lib/cartFunctions"

function Success () {

    useEffect(() => {
        clearCart()
    }, [])

    return (
        <Card>
          Success!  
        </Card>
    )
}

export default Success