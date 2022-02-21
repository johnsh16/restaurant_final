import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/layout'
import AppContext from '../context/AppContext'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {gql, useQuery, ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import {loadCart} from '../lib/cartFunctions'
import {Button} from '@mui/material'
import "regenerator-runtime/runtime.js"



//const stripePromise = await loadStripe('pk_test_51KQvCmISIBToTlrNUGZ5akYEYjIMdvkGngvLRwpoV0vJizz9PxV3gIeFdlKfXfApxCcCTyVdXpEkv7GK7fjU262x00A8Ta9Qnf')



function MyApp({ Component, pageProps }) {
  var {cart, addItem, removeItem, user, setUser, authenticated, saveToBrowser} = React.useContext(AppContext)
  const [cartState, setCartState] = React.useState(loadCart())

  const options = {
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET
  }

  const link = new HttpLink({uri : `${process.env.NEXT_PUBLIC_API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link, cache})

  useEffect(() => {
    console.log(cartState)
  }, [cartState])

  addItem = (item) => {
    cart.items.push(item)
  }

  removeItem = (item) => {
    
  }

  setUser = (props) => {
    console.log("Setting user")
    user = props

  }

  return (
    <>
    <AppContext.Provider value={{cart: cartState, authenticated: authenticated, addItem: addItem, removeItem: removeItem, setUser: setUser}}>
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Button onClick={()=>
        loadCart()
          .then(res => console.log(res))
        }>Test Redis</Button>
    </ApolloProvider>
    </AppContext.Provider>
    </>
  )
}

export default MyApp
