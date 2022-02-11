import React, {useContext} from 'react'
import { useRouter } from 'next/router'
import {Box, AppBar, Toolbar, Button, IconButton, Typography} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import AppContext from '../context/AppContext'
import { AccountCircleIcon } from '@mui/icons-material'

function Layout (props) {

    const router = useRouter()
    var {cart, authenticated, user} = React.useContext(AppContext)

    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1 }}>Restaurant App</Typography>
                {authenticated 
                    ? <AccountCircleIcon />
                    : <Button variant="filled" onClick={() => router.push('/signin')}>LOGIN</Button>
                }
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Layout