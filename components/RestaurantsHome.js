import React, { useEffect } from 'react'
import {Card, Stack, CardHeader, useMediaQuery, CircularProgress, Button} from '@mui/material'
import styles from '../styles/Home.module.css'
import RestaurantCard from './smaller_components/RestaurantCard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios'

function RestaurantsHome () {

    const [restaurants, setRestaurants] = React.useState([])
    const [start, setStart] = React.useState(0)
    const [stop, setStop] = React.useState(5)
    const bp1 = useMediaQuery('(min-width:1150px')

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?populate=*`)
            .then(res => {
                console.log(res.data)
                let restaurantArray = []
                for (let i=0; i<res.data.data.length; i++) {
                    restaurantArray.push(res.data.data[i])
                }
                setRestaurants(restaurantArray)
            })
    }, [])

    if (restaurants) {
        if (bp1) {
            return (
                <>
                <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "65vh"}}>
                <CardHeader
                    title="Featured Restaurants"
                />
                    <Stack direction="row" spacing={1}>
                    {restaurants.map((item, i) => (
                        <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                    ))}
                    </Stack>
                </Card>
                </>
            )
        } else {
            const fiveRestaurants = restaurants.slice(start, stop)
            if (start===0) {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "60vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        {fiveRestaurants.map((item, i) => (
                            <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                        ))}
                        <Button onClick={() => {setStart(5); setStop(10)}}><ArrowForwardIosIcon /></Button>
                        </Stack>
                    </Card>
                    </>
                )
            } else if (restaurants.length>stop) {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "60vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        <Button onClick={() => {setStart(start-5); setStop(stop-5)}}><ArrowBackIosNewIcon /></Button>
                        {fiveRestaurants.map((item, i) => (
                            <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                        ))}
                        <Button onClick={() => {setStart(5); setStop(10)}}><ArrowForwardIosIcon /></Button>
                        </Stack>
                    </Card>
                    </>
                )
            } else {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "60vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        <Button onClick={() => {setStart(start-5); setStop(stop-5)}}><ArrowBackIosNewIcon /></Button>
                        {fiveRestaurants.map((item, i) => (
                            <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                        ))}
                        </Stack>
                    </Card>
                    </>
                )
            }
        }
    } else {
        return (
            <>
            <Card id='restaurantsHome'>
                <CircularProgress />
            </Card>
            </>
        )
    }
    
}

export default RestaurantsHome