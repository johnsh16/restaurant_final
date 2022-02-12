import React from 'react'
import AppContext from "../context/AppContext"
import Cookies from 'js-cookie'

export async function submitOrder ({stripe, elements, token, data, cart}) {

    console.log(stripe, elements, token, data, cart)

    if (!stripe || !elements) {
        console.log('catch')
        return;
    }

    
    const userToken = Cookies.get("token");
    const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: userToken && { Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({
            amount: Number(Math.round(cart.total + "e2") + "e-2"),
            dishes: cart.items,
            address: data.address,
            city: data.city,
            state: data.state,
            token: token.id,
        }),
    });
    const stripeResponse = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_LOCAL_API_URL}/success/${1}`,
        },
    });

    if (stripeResponse.error || dbResponse.error) {
        setError(true)
        console.log(stripeResponse.error)
        console.log(dbResponse.error)
    } else {
        //Go to the success page which is seeded with the order number from this order
        router.push(`/success/${orderNumber}`)
    }
} 