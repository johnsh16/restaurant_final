import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button, Divider} from "@mui/material"
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'

function RestaurantCard (props) {

    console.log(props)
    const router = useRouter()

    return (
        <>
        <Card className={styles.restaurantCard}>
            <CardHeader
                title={props.data.name}
                sx={{minHeight:'20%'}}
            />
            <CardMedia
                component="img"
                height="75"
                maxWidth="200"
                image={`${process.env.NEXT_PUBLIC_API_URL}${props.data.image.data.attributes.url}`}
            />
            <CardContent>
                <Typography variant="body">{props.data.address}</Typography>
                <Typography variant="h6">{props.data.city}</Typography>
                <Typography variant="h7">{props.data.state}</Typography>
                <Divider />
                <Button onClick={() => router.push(`/view/${props.id}`)}>View Menu</Button>
            </CardContent>
        </Card>
        </>
    )
}

export default RestaurantCard

