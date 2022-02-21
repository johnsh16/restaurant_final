import React, { useEffect } from 'react'
import {Card, CardContent, CardHeader, Typography, CardActions, Button, CircularProgress, Box} from '@mui/material'
import AppContext from '../context/AppContext'
import styles from '../styles/checkout.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import { loadCart, saveCart } from '../lib/cartFunctions';

function CartComponent (cartProp) {

    const [cart, setCart] = React.useState()
    const [total, setTotal] = React.useState(0)
    const [wholeCart, setWholeCart] = React.useState({})

    window.addEventListener('addToCart', function () {
        console.log("Trigger reload of CartComponent")
        loadCart()
            .then((res) => {
                console.log("Cart loaded: ", res)
                setTotal(res.total)
                setCart(parseCart(res.items))
            })
            .catch((err) => {
                console.log(err)
            })
    })

    useEffect(() => {
        loadCart()
            .then(res => {
                setWholeCart(res.items)
                setTotal(res.total)
                setCart(parseCart(res.items))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function parseCart (input) {
        let newArray = []
        for (let i = 0; i<input.length; i++) {
            if (i==0) {
                newArray.push({itemObj: input[i], count: 1})
            } else {
                let found = false
                for (let j = 0; j<newArray.length; j++) {
                    if (input[i].item.name === newArray[j].itemObj.item.name) {
                        newArray[j] = {itemObj: newArray[j].itemObj, count: newArray[j].count+1}
                        found = true
                        break
                    } 
                }
                if (!found) newArray.push({itemObj: input[i], count: 1})
            }
        }
        console.log(newArray)
        return newArray
    }
    return (
        <Card className={styles.order_summary}>
            <CardHeader
                title="Your Cart"
            />
            <CardContent>
            {cart !== undefined 
            ? <>{
                cart.map((item, i) => (
                    <ItemComponent item={item} key={i} completeCart={wholeCart}/>
                ))
            }</> : <CircularProgress />
            }
            <Box sx={{bgColor:'grey'}}>
                <Typography>
                    Total: ${total.toFixed(2)}
                </Typography>
            </Box>
            </CardContent>
        </Card>
    )
}

export default CartComponent

function ItemComponent (item, completeCart) {

    const [displayInfo, setDisplayInfo] = React.useState(false)

    console.log(completeCart)

    function incrementDish () {
        loadCart()
            .then(res => {  
                saveCart({items: [...res.items, item.itemObj], total: res.total + item.itemObj.item.cost})
            })
            .catch(err => console.log(err))
        const addToCart = new Event ('addToCart')
        window.dispatchEvent(addToCart)
    }

    function decrementDish () {

    }

    if (!displayInfo) {
        return (
            <>
            <Card className={styles.itemComponent}>
                <CardContent>
                    <Typography variant="h6">
                        {item.item.itemObj.item.name} x{item.item.count}
                    </Typography>
                    <Typography variant="body2">
                        From: {item.item.itemObj.item.restaurant.data.attributes.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button><AddIcon onClick={incrementDish} /></Button>
                    <Button><RemoveIcon /></Button>
                    <Button onClick={() => setDisplayInfo(!displayInfo)}><InfoIcon /></Button>
                </CardActions>
            </Card>
            </>
        )
    } else {
        return (
            <>
            <Card className={styles.itemComponent}>
                <CardContent>
                    <Typography variant="h6">
                        {item.item.itemObj.item.name} x{item.item.count}
                    </Typography>
                    <Typography variant="body2">
                        From: {item.item.itemObj.item.restaurant.data.attributes.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button><AddIcon /></Button>
                    <Button><RemoveIcon /></Button>
                    <Button onClick={() => setDisplayInfo(!displayInfo)}><InfoIcon /></Button>
                </CardActions>
            </Card>
            </>
        )
    }
    
}