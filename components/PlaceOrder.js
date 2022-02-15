import React, { useEffect } from 'react'
import { Card, CardHeader, FormGroup, TextField, Button } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import {CardElement, useElements, useStripe, Elements} from '@stripe/react-stripe-js'
import {submitOrder} from '../lib/orders'
import AppContext from '../context/AppContext'
import styles from '../styles/checkout.module.css'
import Cookies from 'js-cookie'
import axios from 'axios'


function PlaceOrder () {
    console.log("Initialize module")
    var stripePromise = loadStripe('pk_test_51KQvCmISIBToTlrNUGZ5akYEYjIMdvkGngvLRwpoV0vJizz9PxV3gIeFdlKfXfApxCcCTyVdXpEkv7GK7fjU262x00A8Ta9Qnf')
    console.log(typeof stripePromise)

    const [data, setData] = React.useState({address: "", city: "", state: ""})
    var {cart} = React.useContext(AppContext)
    

    var stripe = useStripe()
    var elements = useElements()

    useEffect(() => {
        console.log(Cookies.get("token"))
    }, [data])
    

    async function submit (props) {

        console.log(props)
        const cardElement = elements.getElement(CardElement)
        const token = await stripe.createToken(Elements);
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            token,
            confirmParams: {
              return_url: "https://my-site.com/order/123/complete",
            },
          });
        const userToken = Cookies.get("token");
        var objData = JSON.stringify({
            "data": {
              "Amount": cart.total,
              "Dishes": cart.items,
              "Address": data.address,
              "City": data.city,
              "State": data.state,
              "token": token.token.id
            }
          });
          
        var reqObj = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
            headers: {
                "Content-Type" : 'application/json',
                'Authorization': userToken,
            }
        })

        reqObj.post("/", objData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
                <Elements loadStripe={stripePromise}>
                    <CardElement />
                </Elements>
                <Button onClick={() => submit(data)}>Submit</Button>
        </Card>
    )
}

export default PlaceOrder