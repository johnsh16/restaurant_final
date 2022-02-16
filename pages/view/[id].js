import React from 'react'
import Menu from '../../components/Menu'
import { useRouter } from 'next/router'
import {gql, useQuery } from '@apollo/client';
import RestaurantCard_Menu from '../../components/smaller_components/RestaurantCard_Menu'
import {Typography, Divider, Box} from "@mui/material"
import styles from '../../styles/Menu.module.css'

function View () {

    const router = useRouter()
    var { id } = router.query

    
    if (typeof window == undefined && id === undefined) {
        var waitForLoad = setInterval(function () {
            if (typeof window !== undefined) {
                clearInterval(waitForLoad)
                id = localStorage.getItem('pageid')
            }
        }, 10)  
    } else {
        var waitForLoad = setInterval(function () {
            if (typeof window !== undefined) {
                clearInterval(waitForLoad)
                localStorage.setItem('pageid', id)
            }
        }, 10) 
    }


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
        return (
            <>
            <br/>
            <RestaurantCard_Menu props={data.restaurant.data.attributes} />
            <br/>
            <Divider />
            <Box className={styles.menuTitle}>
                <Typography>MENU</Typography>
            </Box>
            <Menu name={data.restaurant.data.attributes.name} />
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