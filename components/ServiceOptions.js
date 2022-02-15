import {Card, CardActionArea, Stack, Typography, Box} from "@mui/material"
import styles from '../styles/Home.module.css'

function BreakfastButton () {
    return (
        <>
        <Card className={styles.serviceCard}>
            <CardActionArea onClick={()=>{return}}>
                <Typography>Breakfast</Typography>
            </CardActionArea>
        </Card>
        </>
    )
}

function BrunchButton () {
    return (
        <>
        <Card className={styles.serviceCard}>
            <CardActionArea onClick={()=>{return}}>
                <Typography>Brunch</Typography>
            </CardActionArea>
        </Card>
        </>
    )
}

function LunchButton () {
    return (
        <>
        <Card className={styles.serviceCard}>
            <CardActionArea onClick={()=>{return}}>
                <Typography>Lunch</Typography>
            </CardActionArea>
        </Card>
        </>
    )
}

function DinnerButton () {
    return (
        <>
        <Card className={styles.serviceCard}>
            <CardActionArea onClick={()=>{return}}>
                <Typography>Dinner</Typography>
            </CardActionArea>
        </Card>
        </>
    )
}

function ServiceOptions () {
    return (
        <>
        <Box id={styles.serviceOptions}>
        <Stack direction="row" spacing={5} >
            <BreakfastButton />
            <BrunchButton />
            <LunchButton />
            <DinnerButton />
        </Stack>
        </Box>
        </>
    )
}

export default ServiceOptions