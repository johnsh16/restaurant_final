import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/Layout'
import {Button, Snackbar} from "@mui/material"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import "regenerator-runtime/runtime.js"
import { UserProvider } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'



function MyApp({ Component, pageProps }) {

  const link = new HttpLink({uri : `${process.env.NEXT_PUBLIC_API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link, cache})

  return (
    <>
    <UserProvider>
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </UserProvider>
    <CartSnack />
    </>
  )
}

export default MyApp

function CartSnack () {

  const router = useRouter()
  const [itemAdded, setItemAdded] = React.useState(null)

  useEffect(() => {
    window.addEventListener('addToCart', function (e) {
        console.log("heard addCart from CartSnack", e.detail)
        setItemAdded(e.detail)
        setTimeout(function () {
          setItemAdded(null)
        }, 6050)
    })
  }, [])

  const action = (
      <>
      <Button color="secondary" size="small" onClick={()=> {router.push('/checkout')}}>
          View
      </Button>
      </>
  )

  

  const Snackie = (props) => {

      const [open, setOpen] = React.useState(true)

      function handleClose () {
        setOpen(false)
      }

      return (
        <Snackbar   
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={`${props.props} added to cart.`}
          action={action}
          sx={{
              position: "fixed",
              zIndex: "100"
          }}
      />
      )
  }
      
   

  return (
    <>
    {itemAdded !== null ? 
      <Snackie props={itemAdded} /> : null  
    }
    </>
  )
}
