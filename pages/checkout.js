import React from 'react'
import { useRouter } from 'next/router'
import {Card, CardContent, FormGroup, CardHeader, Stack, TextField} from "@mui/material"
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import styles from '../styles/checkout.module.css'
import Cookies from "js-cookie"
import AppContext from '../context/AppContext'
import OrderSummary from '../components/OrderSummary'

function checkout (props) {

    var router = useRouter()

    var {cart, addItem, removeItem, user, setUser} = React.useContext(AppContext)
    const [data, setData] = React.useState({address: "", city: "", state: ""})
    const [error, setError] = React.useState(false)
    const stripe = useStripe()
    const elements = useElements()


    async function handleSubmit () {

        if (!stripe || !elements) {
            return;
        }

        const token = await stripe.createToken(CardElement);
        const userToken = Cookies.get("token");
        const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method: "POST",
            headers: userToken && { Authorization: `Bearer ${userToken}` },
            body: JSON.stringify({
                amount: Number(Math.round(cart.total + "e2") + "e-2"),
                dishes: cart.items,
                address: data.address,
                city: data.city,
                state: data.state,
                token: token.token.id,
            }),
        });
        const stripeResponse = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: "https://my-site.com/order/123/complete",
            },
        });
 
        if (stripeResponse.error || dbResponse.error) {
            setError(true)
        } else {
            //Go to the success page which is seeded with the order number from this order
            router.push(`/success/${orderNumber}`)
        }
    } 
    

    
    function PlaceOrder () {
        return (
            <Card className={styles.place_order}>
                <CardHeader 
                    title="Place Order"
                />   
                <form>
                    <FormGroup> 
                        <TextField
                            id="address"
                            label="Street Address"
                            onChange={(e) => {
                                setData({...data, address: e.target.value})
                            }}
                        />
                        <TextField
                            id="city"
                            label="City"
                            onChange={(e) => {
                                setData({...data, city: e.target.value})
                            }}
                        />
                        <TextField
                            id="state"
                            label="State"
                            onChange={(e) => {
                                setData({...data, state: e.target.value})
                            }}
                        />
                    </FormGroup>
                    <CardElement />
                    <button>Submit</button>
                </form>
            </Card>
        )
    }

    return (
        <>
        <div className={styles.card_row}>
        <Stack direction="row" spacing={1}>
            <OrderSummary />
            <PlaceOrder />
        </Stack>
        </div>
        </>
    )
}

export default checkout 