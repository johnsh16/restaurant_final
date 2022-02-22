import React, { useEffect } from 'react'
import {Card, CardContent, CardHeader, Typography, CardActions, Button, CircularProgress, Box, Divider} from '@mui/material'
import AppContext from '../context/AppContext'
import styles from '../styles/checkout.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import { loadCart, saveCart } from '../lib/cartFunctions';
import { useRouter } from 'next/router'

function CartComponent () {

    const [cart, setCart] = React.useState()
    const [total, setTotal] = React.useState(0)
    const [wholeCart, setWholeCart] = React.useState({})
    const [reload, setReload] = React.useState(false)

    const router = useRouter()
    
    useEffect(() => {
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
    }, [])
    

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
                action={
                    <Button onClick={() => setReload(!reload)}><RefreshIcon /></Button>
                }
            />
            <CardContent>
            {cart !== undefined 
            ? <>{
                cart.map((item, i) => (
                    <ItemComponent item={item} key={i} completeCart={wholeCart}/>
                ))
            }</> : <CircularProgress />
            }
            <Box sx={{bgcolor:'lightgray', width:"50%", margin: "auto"}}>
                <Typography>
                    Total: ${total.toFixed(2)}
                </Typography>
            </Box>
            </CardContent>
        </Card>
    )
}

export default CartComponent

function ItemComponent (item) {

    
    const [displayInfo, setDisplayInfo] = React.useState(false)
    const [incremented, setIncremented] = React.useState(false)
    const [decremented, setDecremented] = React.useState(false)

    function resetLoaders () {
        setIncremented(false)
        setDecremented(false)
    }

    useEffect(() => {
        resetLoaders()
    }, [item])


    function incrementDish () {
        setIncremented(true)
        let itemsArray = item.completeCart
        itemsArray.push(item.item.itemObj)
        let newTotal = 0
        for (let i = 0; i<item.completeCart.length; i++) {
            console.log("new total", newTotal)
            newTotal += item.completeCart[i].item.cost
        }
        console.log(newTotal)
        console.log('test increment', itemsArray, newTotal)
        saveCart({items: itemsArray, total: newTotal})
        const addToCart = new Event ('addToCart')
        window.dispatchEvent(addToCart)
    }

    function decrementDish () {
        setDecremented(true)
        let indexAt = null
        let newCart = item.completeCart
        for (let i = 0; i<item.completeCart.length; i++) {
            if (item.completeCart[i].item.name === item.item.itemObj.item.name) {
                indexAt = i
                console.log(item.completeCart[i].item.name)
                break
            }
        }
        newCart.splice(indexAt, 1)
        let newTotal = 0
        for (let i = 0; i<newCart.length; i++) {
            console.log("new total", newTotal)
            newTotal += newCart[i].item.cost
        }
        console.log(newCart, newTotal)
        saveCart({items: newCart, total: newTotal})
        const addToCart = new Event ('addToCart')
        window.dispatchEvent(addToCart)
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
                    <Divider />
                    <Typography variant="body1">
                        {item.item.count} items @ ${item.item.itemObj.item.cost.toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!incremented ? <Button><AddIcon onClick={incrementDish} /></Button> : <CircularProgress />}
                    {!decremented ? <Button onClick={decrementDish}><RemoveIcon /></Button> : <CircularProgress />}
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