import React from 'react'
import {Card, CardHeader, TextField, CardContent, FormGroup, Button} from '@mui/material'
import {loginUser} from '../lib/auth.js'
import {useRouter} from 'next/router'
import AppContext from '../context/AppContext'

function Signin () {

    const router = useRouter()
    const [data, setData] = React.useState({identifier: "", password: ""})
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")

    function handleSubmit () {
        loginUser(data)
            .then((res) => {
                const loggedIn = new Event ('loggedIn')
                window.dispatchEvent(loggedIn)
                router.push('/')
            })
            .catch((err) => {
                setError(true)
                setErrorMsg("error")
                console.log(err)
            })
    }

    return (
        <>
        <Card>
            <CardHeader
                title="Log In"
            />
            <CardContent>
                <FormGroup>
                    <TextField  
                        label="Email"
                        onChange={(e) => setData({...data, identifier: e.target.value})}
                    />
                    <TextField  
                        label="Password"
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                {error ? <div>{errorMsg}</div> : null}
            </CardContent>
        </Card>
        </>
    )
}

export default Signin