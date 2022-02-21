import React, { useEffect } from 'react'
import Menu from '../../components/Menu'
import { useRouter } from 'next/router'
import {gql, useQuery } from '@apollo/client';
import RestaurantCard_Menu from '../../components/smaller_components/RestaurantCard_Menu'
import {Typography, Divider, Box} from "@mui/material"
import styles from '../../styles/Menu.module.css'
import {loadCart, savePage, loadPage} from '../../lib/cartFunctions'


function View () {

    const router = useRouter()
    var { id } = router.query
    const [cart, setCart] = React.useState()
    const [updater, setUpdater] = React.useState(false)

    useEffect(() => {
        window.addEventListener('addToCart', function () {
            console.log("Trigger reload of view/[id]")
            setUpdater(!updater)
            loadCart()
                .then((res) => {
                    console.log("Cart loaded: ", res)
                    setCart(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }, [])
    
    useEffect(() => {
        console.log('Loading cart...')
        loadCart()
            .then((res) => {
                console.log("Cart loaded: ", res)
                setCart(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    
    useEffect(() => {
        console.log('Loading page...')
        loadPage()
            .then((res) => {
                console.log("Page loaded: ", res)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const GET_RESTAURANT = gql`
        query GET_RESTAURANT {
            restaurant (id:${Number(id)}) {
                data {
                    attributes {
                    name
                    image {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
            }
        }
        `

    const { loading, error, data } = useQuery(GET_RESTAURANT, {errorPolicy:'all'})

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else if (data) {
        console.log(data)
        savePage({page: Number(id)})
        return (
            <>
            <br/>
            <RestaurantCard_Menu props={data.restaurant.data.attributes} />
            <br/>
            <Divider />
            <Box className={styles.menuTitle}>
                <Typography>MENU</Typography>
            </Box>
            <Menu name={data.restaurant.data.attributes.name} cart={cart}/>
            </>
        )
    } else {
        console.log(error)
        return (
            <>
            <div>{error}</div>
            </>
        )
        
    }
    
}

export default View