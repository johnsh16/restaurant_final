import React from 'react'
import {Card, CardHeader, FormGroup, TextField, Button} from '@mui/material'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {submitOrder} from '../lib/orders'
import AppContext from '../context/AppContext'
import styles from '../styles/checkout.module.css'
import Cookies from 'js-cookie'
import axios from 'axios'

function PlaceOrder () {

    const [data, setData] = React.useState({address: "", city: "", state: ""})
    var {cart} = React.useContext(AppContext)

    var stripe = useStripe()
    var elements = useElements()
    var cardElement = elements.getElement(CardElement)

    async function submit () {
        const token = await stripe.createToken(cardElement);
        const userToken = Cookies.get("token");
        axios({
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/orders`, 
            method: "POST",
            headers: userToken && { Authorization: `Bearer ${userToken}` } && {"Access-Control-Allow-Origin" : "*"},
            body: JSON.stringify({
                amount: Number(Math.round(cart.total + "e2") + "e-2"),
                dishes: cart.items,
                address: data.address,
                city: data.city,
                state: data.state,  
                token: token.token.id,
            }),

        });
    }

    return (
        <Card className={styles.place_order}>
            <CardHeader 
                title="Place Order"
            />   
                <FormGroup> 
                    <TextField
                        id="address"
                        label="Street Address"
                        onChange={(e) => {
                            e.preventDefault()
                            setData({...data, address: e.target.value})
                        }}
                    />
                    <TextField
                        id="city"
                        label="City"
                        onChange={(e) => {
                            e.preventDefault()
                            setData({...data, city: e.target.value})
                        }}
                    />
                    <TextField
                        id="state"
                        label="State"
                        onChange={(e) => {
                            e.preventDefault()
                            setData({...data, state: e.target.value})
                        }}
                    />
                </FormGroup>
                <CardElement />
                <Button onClick={submit}>Submit</Button>
        </Card>
    )
}

export default PlaceOrder