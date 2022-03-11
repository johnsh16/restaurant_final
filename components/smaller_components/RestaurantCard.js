import React, { useEffect } from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button, Divider, Box, useMediaQuery, CardActionArea} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'
import {isMobile} from 'react-device-detect'

function RestaurantCard (props) {

    console.log(props)
    const router = useRouter()

    const bp1 = useMediaQuery('(min-height: 650px)')
    const bp2 = useMediaQuery('(min-height: 600px)')
    const bp3 = useMediaQuery('(min-height: 450px)')
    const width1 = useMediaQuery('(min-width:850px)')
    const width2 = useMediaQuery('(min-width:700px)')
    const mobile = useMediaQuery('(min-width: 500px)')

    const [header_fontSize, setFontsize] = React.useState()
    const [total_height, setTotalheight] = React.useState()
    const [total_width, setTotalwidth] = React.useState()
    const [total_minWidth, setMinwidth] = React.useState()
    const [total_maxWidth, setMaxwidth] = React.useState()
    const [header_height, setHeaderheight] = React.useState()
    const [image_height, setImageheight] = React.useState()
    const [image_width, setImageWidth] = React.useState()
    const [content_height, setContentheight] = React.useState()
    const [children, setChildren] = React.useState()
    const [data, setData] = React.useState(props.data)

    const children1 = (
        <>
        </>
    )

    const children2 = (
        <>
        </>    
    )

    //inputs are total_height, content_height, header_height, image_height, image_width, header_fontSize, children
    // total_height "Xvh"
    // total_width "Xvw"
    // total_minWidth "Xvw"
    // content_height "Xvh"
    // header_height "Xvh"
    // header_fontSize Number
    // image_height "Xpx"
    // image_width "Xpx"
    // children

    useEffect(() => {
        console.log(bp1, bp2, bp3, mobile, width1, width2)
        if (bp1 && width1 && !isMobile) {
            setFontsize(20)
            setTotalheight("26vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("8vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (bp1 && !width1 && width2 && !isMobile) {
            setFontsize(15)
            setTotalheight("28vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("6vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (bp1 && !width2 && !isMobile) {
            setFontsize(15)
            setTotalheight("28vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("6vh")
            setImageheight("75px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (!bp1 && bp2 && width2 && !isMobile) {
            setFontsize(18)
            setTotalheight("28vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("8vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (!bp1 && bp2 && !width2 && !isMobile) {
            setFontsize(10)
            setTotalheight("28vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("8vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (!bp2 && bp3 && width2 && !isMobile) {
            setFontsize(14)
            setTotalheight("26vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("8vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (!bp2 && bp3 && !width2 && !isMobile) {
            setFontsize(12)
            setTotalheight("26vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("6vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else if (!bp3 && mobile && !isMobile) {
            setFontsize(8)
            setTotalheight("22vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("2vh")
            setImageheight("55px")
            setImageWidth("50px")
            setContentheight("10%")
            setChildren(1)
        } else if (isMobile) {
            console.log('ismobile')
            setFontsize(12)
            setTotalheight("22vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("6vh")
            setImageheight("100px")
            setImageWidth("100px")
            setContentheight("10%")
            setChildren(1)
        } else {
            setFontsize(8)
            setTotalheight("22vh")
            setTotalwidth("20vw")
            setMinwidth("10vw")
            setMaxwidth("20vw")
            setHeaderheight("2vh")
            setImageheight("55px")
            setImageWidth("50px")
            setContentheight("10%")
            setChildren(1)
        }
    }, [bp1, bp2, bp3, mobile, width1, width2])
    
    return (
            <>
            <Card
                sx={{
                    bgcolor: "aliceblue",
                    height: total_height,
                    weight: total_width,
                    minWidth: total_minWidth,
                    maxWidth: total_maxWidth
                }}
            >
                <CardActionArea
                    onClick={() => router.push(`/view/${props.id}`)}
                >
                    <CardHeader
                        title={data.name}
                        sx={{
                            minHeight: header_height
                        }}
                        titleTypographyProps={{
                            fontSize: Number(header_fontSize)
                        }}
                    />
                    <CardMedia
                        component='img'
                        height={image_height}
                        width={image_width}
                        image={`${process.env.NEXT_PUBLIC_API_URL}${data.image.data.attributes.url}`}
                    />
                    <CardContent 
                        sx={{
                            height: content_height
                        }}
                    >
                        {children == "0" ? null : <>{children == "1" ? children1 : children2}</>}
                    </CardContent>
                </CardActionArea>
            </Card>
            </>
        )   
    
}

export default RestaurantCard

//inputs are total_height, content_height, header_height, image_height, image_width, header_fontSize, children

