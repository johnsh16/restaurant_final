import {Box, TextField, Stack, Button, InputAdornment, Typography} from "@mui/material"
import styles from '../styles/Home.module.css'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar () {
    return (
        <>
        <Box id={styles.searchBar} sx={{bgcolor:"lightblue"}}>
            <Stack direction="row">
                <TextField
                sx={{width:'100%'}}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon></SearchIcon>
                        </InputAdornment>
                    )
                }}
                />
            </Stack>
        </Box>
        
        </>
    )
}

export default SearchBar