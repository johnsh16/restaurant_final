import React, { useEffect } from 'react'
import {Card, Stack, CardHeader} from '@mui/material'
import styles from '../styles/Home.module.css'
import RestaurantCard from './smaller_components/RestaurantCard'
import axios from 'axios'

function RestaurantsHome () {

    const [restaurants, setRestaurants] = React.useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?populate=*`)
            .then(res => {
                console.log(res.data)
                let restaurantArray = []
                for (let i=0; i<res.data.data.length; i++) {
                    restaurantArray.push(res.data.data[i].attributes)
                }
                setRestaurants(restaurantArray)
            })
    }, [])

    if (restaurants) {
        return (
            <>
            <Card id={styles.restaurantsHome}>
            <CardHeader
                title="Featured Restaurants"
            />
                <Stack direction="row" spacing={1}>
                {restaurants.map((item, i) => (
                    <RestaurantCard props={item} />
                ))}
                </Stack>
            </Card>
            </>
        )
    } else {
        return (
            <>
            <Card id='restaurantsHome'>

            </Card>
            </>
        )
    }
    
}

export default RestaurantsHome