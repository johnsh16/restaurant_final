import React from 'react'
import {Card, FormGroup, Text, TextField, CardHeader, CardContent, Button} from "@mui/material"
import {registerUser} from "../lib/auth.js"
import axios from 'axios'

function Signup () {

    const [data, setData] = React.useState({email: "", password: "", first: "", last: "", username: ""})

    function handleSubmit () {
        if (data.password !== "" && data.email !== "" && data.username !== "") {
            registerUser(data)
        }
    }

    return (
        <>
        <Card>
            <CardHeader
                title="Create An Account"
            />
            <CardContent>
            <FormGroup>
                <TextField  
                    id="email"
                    label="Email"
                    helperText="Required"
                    onChange={(e) => {
                        setData({...data, email: e.target.value})
                    }}
                />
                <TextField  
                    id="password"
                    label="Password"
                    helperText="Required"
                    onChange={(e) => {
                        setData({...data, password: e.target.value})
                    }}
                />
                <TextField  
                    id="username"
                    label="Create Username"
                    helperText="Required"
                    onChange={(e) => {
                        setData({...data, username: e.target.value})
                    }}
                />
                <TextField  
                    id="first"
                    label="First Name"
                    onChange={(e) => {
                        setData({...data, first: e.target.value})
                    }}
                />
                <TextField  
                    id="last"
                    label="Last Name"
                    onChange={(e) => {
                        setData({...data, last: e.target.value})
                    }}
                />
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
            </CardContent>
        </Card>
        </>
    )
}

export default Signup