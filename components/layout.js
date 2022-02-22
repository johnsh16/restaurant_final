import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Box, AppBar, Toolbar, Button, IconButton, Typography, Badge} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import AppContext from '../context/AppContext'
import { AccountCircleIcon } from '@mui/icons-material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {loadCart} from "../lib/cartFunctions"

function Layout ({children}) {

    const router = useRouter()
    var {authenticated, user} = React.useContext(AppContext)
    const [updater, setUpdater] = React.useState(false)
    const [cartState, setCartState] = React.useState({items: [], total: 0})

    console.log(cartState)
    console.log(authenticated)

    useEffect(() => {
        window.addEventListener('addToCart', function (e) {
            loadCart()
            .then(res => setCartState(res))
            .catch(err => console.log(err)) 
        })
    }, [cartState])

    useEffect(() => {
        loadCart()
            .then(res => setCartState(res))
            .catch(err => console.log(err)) 
    }, [])

    return (
        <>
        <AppBar position="static" sx={{marginBottom: "10px"}}>
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }}><a href="/">Restaurant App</a></Typography>
                <Badge badgeContent={cartState.items.length} color="secondary" update={updater}><ShoppingBagIcon onClick={() => router.push('/checkout')} /></Badge>
                {authenticated === true
                    ? <AccountCircleIcon />
                    : <Button variant="filled" onClick={() => router.push('/signin')}>LOGIN</Button>
                }
            </Toolbar>
        </AppBar>
        {children}
        </>
    )
}

export default Layout