import React, {useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import {AppBar, Toolbar, Button, Typography, Badge, Dialog, CircularProgress, Snackbar, styles} from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { loadCart } from "../lib/cartFunctions"
import { getRedisAuth } from '../lib/auth'
import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'

function Layout ({children}) {

    const router = useRouter()
    const [cartState, setCartState] = React.useState({items: [], total: 0})
    const [userObj, setUserObj] = React.useState()
    const [displayAccount, setDisplayAccount] = React.useState(false)
    var openAccount = () => {
        setDisplayAccount(true)
    }
    const { user, isLoading } = useUser()
    const [itemsAdded, setItemsAdded] = React.useState([])
 
    useEffect(() => {
        loadCart()
            .then(res => {
                setCartState(JSON.parse(res))
            })
            .catch(err => console.log(err)) 
    }, [])


    useEffect(() => {
        window.addEventListener('addToCart', function (e) {
            loadCart()
            .then(res => setCartState(res))
            .catch(err => console.log(err)) 
        })
    }, [])

    useEffect(() => {
        window.addEventListener('addToCart', function (e) {
            setItemsAdded([e.detail])
        })
    }, [])


    function AccountDialog () {

        

        if (userObj) {
            console.log('userObj', userObj)
            return (
                <>
                <Dialog
                        open={displayAccount}
                        onClose={() => setDisplayAccount(false)}
                    >
                <Typography>Logged in as {userObj.email}</Typography>
                <Button onClick={() => {router.push('/api/auth/logout'); setDisplayAccount(false)}}>Logout</Button>
                </Dialog>
                </>
            )
        } else if (user || isLoading) {
            return (
                <>
                <Dialog
                        open={displayAccount}
                        onClose={() => setDisplayAccount(false)}
                    >
                {isLoading ? <Typography>Logged in as: <CircularProgress /></Typography> : <Typography>Logged in as: {user.email}</Typography>}
                <Button onClick={() => {router.push('/api/auth/logout'); setDisplayAccount(false)}}>Logout</Button>
                </Dialog>
                </>
            )
        } else {
            return (
                <>
                <Dialog
                        open={displayAccount}
                        onClose={() => setDisplayAccount(false)}
                    >
                        <Button onClick={() => {router.push('/api/auth/login'); setDisplayAccount(false)}}>Login</Button>
                        <Button onClick={() => {router.push('/api/auth/login'); setDisplayAccount(false)}}>Sign Up</Button>
                </Dialog>
                </>
            )
        }
            
    }


    const SnackContainer = React.memo(() => {
        return (
            <>
            <CartSnack props={itemsAdded[0]} />
            </>
        )
    })


    
    return (
        <>
        <AppBar position="static" sx={{marginBottom: "10px"}}>
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1}}><Link href="/">Restaurant App</Link></Typography>
                {cartState.items !== undefined ? <Badge badgeContent={cartState.items.length} color="secondary"><ShoppingBagIcon onClick={() => router.push('/checkout')} /></Badge> : null}
                <AccountCircleIcon sx={{padding: "1%"}} onClick={openAccount} />
                <AccountDialog />
            </Toolbar>
        </AppBar>
        {children}
        <SnackContainer props={itemsAdded} />
        </>
    )
    
    
}

export default Layout

function CartSnack (props) {

    console.log(props)

    const [open, setOpen] = React.useState(true)

    const action = (
        <>
        <Button color="secondary" size="small" onClick={()=> {router.push('/checkout')}}>
            View
        </Button>
        </>
    )

    function handleClose () {
        setOpen(false)
    }

    return (
        <Snackbar   
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={`${props.props} added to cart.`}
            action={action}
            sx={{
                position: "fixed",
                zIndex: "100"
            }}
        />
    )
}

