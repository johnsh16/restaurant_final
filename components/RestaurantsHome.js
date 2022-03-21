import React, { useEffect } from 'react'
import {Card, Stack, CardHeader, useMediaQuery, CircularProgress, Button} from '@mui/material'
import styles from '../styles/Home.module.css'
import RestaurantCard from './smaller_components/RestaurantCard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios'
import {isMobile} from 'react-device-detect'

function RestaurantsHome () {

    const [restaurants, setRestaurants] = React.useState([])
    const [increment, setIncrement] = React.useState(5)
    const [start, setStart] = React.useState(0)
    const [stop, setStop] = React.useState(start+increment)
    const [sliced, setSliced] = React.useState(restaurants.slice(start, stop))
    const bp1 = useMediaQuery('(min-width:1150px')
    const mobile1 = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        if (isMobile) {
            console.log(isMobile)
            setIncrement(3)
        } 
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?populate=*`)
            .then(res => {
                console.log(res.data)
                let restaurantArray = []
                for (let i=0; i<res.data.data.length; i++) {
                    restaurantArray.push(res.data.data[i])
                }
                setRestaurants(restaurantArray)
                if (isMobile) {
                    setSliced(restaurantArray.slice(start, start+3))
                    setStop(start+3)
                } else {
                    setSliced(restaurantArray.slice(start, start+5))
                    setStop(start+5)
                }
            })
    }, [])

    useEffect(() => {
        setSliced(restaurants.slice(start, stop))
    }, [start, stop])

    useEffect(() => {
        if (!mobile1 || isMobile) {
            setIncrement(3)
            setSliced(restaurants.slice(start, 3))
        } else {
            setIncrement(5)
            setSliced(restaurants.slice(start, 5))
        }
    }, [mobile1])

    useEffect(() => {
        console.log(sliced)
    }, [sliced])

    const ForwardArrow = () => (
        <>
        <Button
         sx={{
             padding: "0%",
             width: "8%",
             minWidth: "2%"
         }}
         onClick={() => {setStart(start+increment); setStop(stop+increment)}}>
             <ArrowForwardIosIcon
                sx={{
                    width: "4vw"
                }}
             />
        </Button>
        </>
    )

    const BackwardArrow = () => (
        <>
        <Button
            onClick={() => {setStart(start-increment); setStop(stop-increment)}}
            sx={{
                padding: "0%",
                width: "8%",
                minWidth: "2%"
            }}
        >
                <ArrowBackIosNewIcon
                    sx={{
                        width: "4vw"
                    }}
                />
        </Button>
        </>
    )

    if (restaurants) {
        if (bp1) {
            return (
                <>
                <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "40vh", bgcolor:"white"}}>
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
        } else  {
            const fiveRestaurants = restaurants.slice(start, stop)
            if (start===0) {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{paddingLeft: "1%", height: "40vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        {sliced.map((item, i) => (
                            <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                        ))}
                        <ForwardArrow />
                        </Stack>
                    </Card>
                    </>
                )
            } else if (restaurants.length>stop) {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "40vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        <BackwardArrow />
                        {sliced.map((item, i) => (
                            <RestaurantCard key={i} data={item.attributes} id={item.id}/>
                        ))}
                        <ForwardArrow />
                        </Stack>
                    </Card>
                    </>
                )
            } else {
                return (
                    <>
                    <Card id={styles.restaurantsHome} sx={{padding: "0.5%", height: "40vh"}}>
                    <CardHeader
                        title="Featured Restaurants"
                    />
                        <Stack direction="row" spacing={1}>
                        <BackwardArrow />
                        {sliced.map((item, i) => (
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