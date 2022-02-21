import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/layout'
import AppContext from '../context/AppContext'
import {gql, useQuery, ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import {loadCart} from '../lib/cartFunctions'
import {Button} from '@mui/material'
import "regenerator-runtime/runtime.js"



function MyApp({ Component, pageProps }) {
  var {cart, addItem, removeItem, user, setUser, authenticated, saveToBrowser} = React.useContext(AppContext)
  const [cartState, setCartState] = React.useState(loadCart())


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
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </>
  )
}

export default MyApp
