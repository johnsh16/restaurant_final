import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button, Divider, Box, useMediaQuery} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'

function RestaurantCard (props) {

    console.log(props)
    const router = useRouter()

    const bp1 = useMediaQuery('(min-height: 650px)')
    const bp2 = useMediaQuery('(min-height: 575px)')
    const bp3 = useMediaQuery('(min-height: 450px)')

    if (bp1) {
        return (
            <>
            <Card 
                className={styles.restaurantCard}
                sx={{
                    height:"50vh"
                }}
            >
                <CardHeader
                    title={props.data.name}
                    sx={{
                        height:"20%"
                    }}
                />
                <CardMedia
                    component="img"
                    height="75"
                    maxWidth="200"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.data.image.data.attributes.url}`}
                    sx={{}}
                />
                <CardContent
                    sx={{
                        height: "30%"
                    }}
                >
                    <Box
                        sx={{
                            height:"10%",
                            minHeight: "100px"
                        }}
                    >
                    <Typography variant="body">{props.data.address}</Typography>
                    <Typography variant="h6">{props.data.city}</Typography>
                    <Typography variant="h7">{props.data.state}</Typography>
                    </Box>
                    <Divider />
                    <Button onClick={() => router.push(`/view/${props.id}`)}>View Menu</Button>
                </CardContent>
            </Card>
            </>
        )
    } else if (!bp1 && bp2) {
        return (
            <>
            <Card 
                className={styles.restaurantCard}
                sx={{
                    height:"50vh"
                }}
            >
                <CardHeader
                    title={props.data.name}
                    sx={{
                        height:"20%"
                    }}
                />
                <CardMedia
                    component="img"
                    height="75"
                    maxWidth="200"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.data.image.data.attributes.url}`}
                    sx={{}}
                />
                <CardContent
                    sx={{
                        height: "30%"
                    }}
                >
                    <Typography variant="h6">{props.data.city}</Typography>
                    <Typography variant="h7">{props.data.state}</Typography>
                    <Button onClick={() => router.push(`/view/${props.id}`)}>View Menu</Button>
                </CardContent>
            </Card>
            </>
        )
    } else if (!bp1 && !bp2 && bp3) {
        return (
            <>
            <Card 
                className={styles.restaurantCard}
                sx={{
                    height:"42vh"
                }}
            >
                <CardHeader
                    title={props.data.name}
                    sx={{
                        height:"10%",
                    }}
                    titleTypographyProps={{variant:"body"}}
                />
                <CardMedia
                    component="img"
                    height="75"
                    maxWidth="200"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.data.image.data.attributes.url}`}
                    sx={{}}
                />
                <CardContent
                    sx={{
                        height: "20%"
                    }}
                >
                    <Button onClick={() => router.push(`/view/${props.id}`)}>View Menu</Button>
                </CardContent>
            </Card>
            </>
        )
    } else {
        return (
            <>
            <Card 
                className={styles.restaurantCard}
                sx={{
                    height:"40vh"
                }}
            >
                <CardHeader
                    title={props.data.name}
                    sx={{
                        height:"10%",
                    }}
                    titleTypographyProps={{variant:"body"}}
                />
                <CardMedia
                    component="img"
                    height="50"
                    maxWidth="200"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.data.image.data.attributes.url}`}
                    sx={{}}
                />
                <CardContent
                    sx={{
                        height: "10%"
                    }}
                >
                    <Button onClick={() => router.push(`/view/${props.id}`)}>View Menu</Button>
                </CardContent>
            </Card>
            </>
        )
    }
    
}

export default RestaurantCard

