import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button, Divider} from "@mui/material"
import styles from '../../styles/Home.module.css'

function RestaurantCard (props) {

    console.log(props)

    return (
        <>
        <Card className={styles.restaurantCard}>
            <CardHeader
                title={props.props.name}
                sx={{minHeight:'20%'}}
            />
            <CardMedia
                component="img"
                height="75"
                maxWidth="200"
                image={`${process.env.NEXT_PUBLIC_API_URL}${props.props.image.data.attributes.url}`}
            />
            <CardContent>
                <Typography variant="body">{props.props.address}</Typography>
                <Typography variant="h6">{props.props.city}</Typography>
                <Typography variant="h7">{props.props.state}</Typography>
                <Divider />
                <Button>View Menu</Button>
            </CardContent>
        </Card>
        </>
    )
}

export default RestaurantCard