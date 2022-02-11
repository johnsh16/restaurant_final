import React from 'react'
import {Card, CardHeader, TextField} from '@mui/material'
import {loginUser} from '../lib/auth.js'
import {useRouter} from 'next/router'

function Signin () {

    const router = useRouter()
    const [data, setData] = React.useState({username: "", password: ""})
    const [error, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")

    function handleSubmit () {
        loginUser(data)
            .then(router.push('/'))
            .catch((err) => {
                setError(true)
                setErrorMsg(err)
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
                        label="Username"
                        onChange={(e) => setData({...data, username: e.target.value})}
                    />
                    <TextField  
                        label="Password"
                        onChange={(e) => setData({...data, password: e.target.value})}
                    />
                </FormGroup>
                <Button onClick={handleSubmit}></Button>
                {error ? <div>{errorMsg}</div> : null}
            </CardContent>
        </Card>
        </>
    )
}

export default Signin