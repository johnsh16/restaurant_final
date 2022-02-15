import '../styles/globals.css'
import React from "react"
import Layout from '../components/layout'
import AppContext from '../context/AppContext'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {gql, useQuery, ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';




const stripePromise = loadStripe('pk_test_51KQvCmISIBToTlrNUGZ5akYEYjIMdvkGngvLRwpoV0vJizz9PxV3gIeFdlKfXfApxCcCTyVdXpEkv7GK7fjU262x00A8Ta9Qnf')

function MyApp({ Component, pageProps }) {
  var {cart, addItem, removeItem, user, setUser, authenticated} = React.useContext(AppContext)
  const [cartState, setCartState] = React.useState({cart: cart})

  const options = {
    clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET
  }

  const link = new HttpLink({uri : `${process.env.NEXT_PUBLIC_API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link, cache})

  authenticated = () => {
    if (Cookies.get("token") !== undefined) {
      return true
    }
    return false
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
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </AppContext.Provider>
    </Elements>
    </>
  )
}

export default MyApp
