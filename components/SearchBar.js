import React from 'react'
import {Box, TextField, Button, InputAdornment, Typography, Grid, CircularProgress, Dialog, Divider} from "@mui/material"
import {useQuery, gql} from '@apollo/client'
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { indigo } from '@mui/material/colors'

function SearchBar () {

    const GET_INFO = gql`
        query {
            restaurants {
                data {
                    attributes {
                        name
                        city
                    }
                }
            }
            dishes (pagination: {limit: -1}) {
                data {
                    attributes {
                        name
                        description
                        restaurant  {
                            data {
                                id
                                attributes {
                                    name
                                }
                            }
                        }
                        vegetarian
                        vegan
                        gf
                        service
                    }
                }
            }
        }
    `

    const {loading, error, data} = useQuery(GET_INFO)
    //const {loadingDish, errorDish, dataDish} = useQuery(GET_DISHES_INFO)

    const [queryText, setQueryText] = React.useState("")
    const [openSearch, setOpenSearch] = React.useState(false)

    function SearchRestaurants (input) {
        const [seeMore, setSeeMore] = React.useState(false)
        let returnArray = []

        for (let i = 0; i<data.restaurants.data.length; i++) {
            let testName = data.restaurants.data[i].attributes.name.search(queryText)
            if (testName !== -1) {
                returnArray.push(data.restaurants.data[i])
            }
        }  

        if (returnArray.length>0) {
            
            if (!seeMore) {
                let firstFive = returnArray.slice(0, 4)
                return (
                    <>
                    <Typography>Restaurant Results</Typography>
                    <Grid container spacing={1} sx={{margin: "auto"}}>
                    {firstFive.map((item, i) => (
                        <Grid item key={i} sx={{padding:"3%"}}>
                            <Box sx={{border: "1px solid black", padding:"3%", margin:"auto" }}>
                                <Typography>{item.attributes.name}</Typography>
                                <Button onClick={() => router.push(`/view/${item.id}`)}>Go</Button>
                            </Box>
                        </Grid>
                    ))}
                    </Grid>
                    {(returnArray.length-firstFive.length>0) ? <Typography><Button onClick={() => {setSeeMore(true)}}>{returnArray.length-firstFive.length} more...</Button></Typography> : null}
                    </>
                )
            } else {
                return (
                    <>
                    <Typography>Restaurant Results</Typography>
                    <Grid container spacing={1}>
                    {returnArray.map((item, i) => (
                        <Grid item key={i}>
                            <Box sx={{border: "1px solid black", padding:"3%", margin:"auto" }}>
                                <Typography color="whitesmoke">{item.attributes.name}</Typography>
                                <Button onClick={() => router.push(`/view/${item.id}`)}>Go</Button>
                            </Box>
                        </Grid>
                    ))}
                    </Grid>
                    <Typography><Button onClick={() => {setSeeMore(false)}}>See less</Button></Typography>
                    </>
                )
            }
        } else {
            return (
                <>
                <Typography>No Restaurant Results</Typography>
                </>
            )
        }
    }

    function SearchDishes (input) {

        const [seeMore, setSeeMore] = React.useState(false)
        let returnArray = []

        for (let i = 0; i<data.dishes.data.length; i++) {
            let testName = data.dishes.data[i].attributes.name.search(queryText)
            if (data.dishes.data[i].attributes.description && queryText.length>3) {
                var testDescr = data.dishes.data[i].attributes.description.search(queryText)
            }
            if (testName !== -1) {
                returnArray.push(data.dishes.data[i])
            } else if (testDescr && testDescr !== -1 ) {
                returnArray.push(data.dishes.data[i])
            } 
        }
        
        if (returnArray.length>0) {
            if (!seeMore) {
                let firstFive = returnArray.slice(0, 4)
                console.log('all dishes', returnArray)
                return (
                    <>
                    <Typography>Dish Results</Typography>
                    <br/>
                    <Grid container spacing={2}>
                        {firstFive.map((item, i) => (
                            <Grid item key={i}>
                                <Box sx={{border:"1px solid black"}}>
                                    <Typography>{item.attributes.name}</Typography>
                                    <Typography>Served at: {item.attributes.restaurant.data.attributes.name}</Typography>
                                    <Button onClick={() => router.push(`/view/${item.attributes.restaurant.data.id}`)}>View Menu</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    {(returnArray.length-firstFive.length > 0) ? <Button onClick={() => setSeeMore(true)}>{returnArray.length-firstFive.length} more...</Button> : null}
                    </>
                )
            } else {
                return (
                    <>
                    <Typography>Dish Results</Typography>
                    <Grid container spacing={2}>
                        {returnArray.map((item, i) => (
                            <Grid item key={i}>
                                <Box sx={{border:"1px solid black"}}>
                                    <Typography>{item.attributes.name}</Typography>
                                    <Typography>Served at: {item.attributes.restaurant.data.attributes.name}</Typography>
                                    <Button onClick={() => router.push(`/view/${item.attributes.restaurant.data.id}`)}>View Menu</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Button onClick={() => setSeeMore(false)}>See less...</Button>
                    </>
                )
            }
        } else {
            return (
                <>
                <Typography>No dish results</Typography>
                </>
            )
        }
    }


    if (!openSearch) {
        return (
            <>
            <Box id={styles.searchBar} sx={{bgcolor:"lightblue"}}>
                <TextField
                sx={{width:'100%'}}
                defaultValue={queryText}
                onClick={() => {setOpenSearch(true)}}
                onChange={(e) => {setQueryText(e.target.value)}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon></SearchIcon>
                        </InputAdornment>
                    )
                }}
                />
            </Box>
            </>
        )
    } else {
        if (loading) {
            return (
                <>
                <Box className={styles.searchContainer}>
                <Dialog
                    open={openSearch}
                    onClose={() => setOpenSearch(false)}
                    fullWidth={true}
                    maxWidth={"lg"}

                >
                <Box id={styles.searchBar} sx={{bgcolor:"lightblue"}}>
                        <TextField
                        sx={{width:'100%'}}
                        onChange={(e) => {setQueryText(e.target.value)}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon></SearchIcon>
                                </InputAdornment>
                            )
                        }}
                        />
                </Box>
                <Box 
                    id={styles.searchBox}
                    sx={{bgcolor:'whitesmoke', padding: "2%"}}
                >
                    <Box id={styles.restaurantSearch}>
                        <CircularProgress />
                    </Box>
                    <Divider />
                    <Box id={styles.dishSearch}>
                        <CircularProgress />
                    </Box>
                </Box>
                </Dialog>
                </Box>
                </>
            )
        } else {
            return (
                <>
                <Dialog
                    open={openSearch}
                    onClose={() => setOpenSearch(false)}
                    maxWidth="lg"
                >
                <Box  sx={{bgcolor:"lightblue"}}>
                        <TextField
                        sx={{width:'100%'}}
                        onChange={(e) => {setQueryText(e.target.value)}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon></SearchIcon>
                                </InputAdornment>
                            )
                        }}
                        />
                </Box>
                <Box 
                    id={styles.searchBox}
                    sx={{bgcolor: "whitesmoke",  width: "75vw"}}
                >
                    <Box id={styles.restaurantSearch}>
                        <SearchRestaurants input={queryText} />
                    </Box>
                    <Divider />
                    <Box id={styles.dishSearch}>
                        <SearchDishes input={queryText} />
                    </Box>
                </Box>
                </Dialog>
                </>
            )
        }
        
    }
    
}

export default SearchBar