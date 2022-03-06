import React, { useEffect } from 'react'
import { Card, CardHeader, FormGroup, TextField, Button, CircularProgress } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import {PaymentElement, useElements, useStripe, Elements} from '@stripe/react-stripe-js'
import styles from '../styles/checkout.module.css'
import { createPaymentIntent, loadCart } from '../lib/cartFunctions'
import axios from 'axios'

const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLIC))

function PlaceOrder () {

    const [clientSecret, setClientSecret] = React.useState(null)
    const [cart, setCart] = React.useState()
    const [noitems, setNoitems] = React.useState(false)

    const [message, setMessage] = React.useState("")
    const [data, setData] = React.useState({address: "", city: "", state: ""})
    
    useEffect(() => {
        loadCart()
            .then((res) => {
                setCart(JSON.parse(res))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    useEffect(() => {
        createPaymentIntent()
            .then(res => {
                if (res == null) {
                    setNoitems(true)
                } else {
                    setClientSecret(res.data.clientSecret)
                }
            })
            .catch(err => {
                console.log(err)
            }) 
    }, [])

    
    const appearence = {
        theme: 'stripe'
    }
    var options = {
        clientSecret,
        appearence
    }

    

    function CheckoutForm () {
        const stripe = useStripe()
        const elements = useElements()

        var submit = () => {
        
            if (!stripe || !elements) {
                return 
            }

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, 
                {
                    data : {
                        Address: data.address,
                        City: data.city,
                        State: data.state,
                        Dishes: cart.items,
                        Amount: cart.total
                    }
                })
    
            const { error } = stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "http://147.182.163.162:3000/success"
                }
            })
    
            setTimeout(function () {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message);
                } else {
                    setMessage("An unexpected error occured.");
                }
            }, 2000)
        }  

        return (
            <>
            
            <PaymentElement />
            <Button onClick={() => submit()}>Submit</Button>
            {message && <div>{message}</div>}
            </>
        )
    }

    function CheckItems () {
        if (clientSecret === null) {
            return (
                <>
                <div>No items in cart</div>
                </>
            )
        } else {
            return (
                <>
                <CircularProgress />
                </>
            )
        }
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
                {clientSecret && stripePromise ? (<Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>) : <CheckItems />}
            </Card>
                

    )
}

export default PlaceOrder