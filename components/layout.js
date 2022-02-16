import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import {Box, AppBar, Toolbar, Button, IconButton, Typography, Badge} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import AppContext from '../context/AppContext'
import { AccountCircleIcon } from '@mui/icons-material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function Layout ({children}) {

    const router = useRouter()
    var {cart, authenticated, user} = React.useContext(AppContext)
    const [update, setUpdate] = React.useState(false)

    console.log(cart)
    console.log(authenticated)

    useEffect(() => {
        window.addEventListener('addToCart', function (e) {
            console.log('heard')
            setUpdate(!update)
        })
    }, [])

    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }}>Restaurant App</Typography>
                <Badge badgeContent={cart.cart.items.length} color="secondary" update={update}><ShoppingBagIcon onClick={() => router.push('/checkout')} /></Badge>
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