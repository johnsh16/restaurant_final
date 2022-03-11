import {Card, CardHeader, CardMedia, Button, Divider, CardContent, Typography} from '@mui/material'
import styles from '../../styles/Menu.module.css'
import {isMobile} from 'react-device-detect'

function RestaurantCard_Menu (props) {

    console.log(props)

    if (!isMobile) {
        return (
            <>
            <Card className={styles.restaurantCard}>
                <CardHeader
                    title={props.props.name}
                    sx={{minHeight:'20%'}}
                />
                <CardMedia
                    component="img"
                    height="100"
                    maxWidth="50"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.props.image.data.attributes.url}`}
                />
                <CardContent>
                    <Typography variant="body">{props.props.address}</Typography>
                    <Typography variant="h6">{props.props.city}</Typography>
                    <Typography variant="h7">{props.props.state}</Typography>
                    <Divider />
                    <Button onClick={() => location.assign(props.props.link)}>Visit Website</Button>
                </CardContent>
            </Card>
            </>
        )
    } else {
        return (
            <>
            <Card sx={{
                margin: "auto",
                width: "35vw"
            }}
            >
                <CardHeader
                    title={props.props.name}
                    sx={{minHeight:'20%'}}
                />
                <CardMedia
                    component="img"
                    height="100"
                    maxWidth="50"
                    image={`${process.env.NEXT_PUBLIC_API_URL}${props.props.image.data.attributes.url}`}
                />
                <CardContent>
                    <Typography variant="body">{props.props.address}</Typography>
                    <Typography variant="h6">{props.props.city}</Typography>
                    <Typography variant="h7">{props.props.state}</Typography>
                    <Divider />
                    <Button onClick={() => location.assign(props.props.link)}>Visit Website</Button>
                </CardContent>
            </Card>
            </>
        )
    }
    
}

export default RestaurantCard_Menu