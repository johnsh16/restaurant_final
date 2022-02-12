import '../styles/globals.css'
import React from "react"
import Layout from '../components/layout'
import AppContext from '../context/AppContext'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import App from 'next/app'


const stripePromise = loadStripe('pk_test_51KQvCmISIBToTlrNUGZ5akYEYjIMdvkGngvLRwpoV0vJizz9PxV3gIeFdlKfXfApxCcCTyVdXpEkv7GK7fjU262x00A8Ta9Qnf')

function MyApp({ Component, pageProps }) {
  var {cart, addItem, removeItem, user, setUser} = React.useContext(AppContext)
  const [cartState, setCartState] = React.useState({cart: cart})

  const options = {
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET
  }

  addItem = () => {

  }

  removeItem = () => {
    
  }

  setUser = (props) => {
    console.log("Setting user")
    user = props
  }

  return (
    <>
    <Elements stripe={stripePromise}>
    <AppContext.Provider value={{cart: cartState, addItem: addItem, removeItem: removeItem, user:null, setUser: setUser}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
    </Elements>
    </>
  )
}

export default MyApp
