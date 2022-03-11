import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/Layout'
import {Button, Snackbar} from "@mui/material"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import "regenerator-runtime/runtime.js"
import { UserProvider } from '@auth0/nextjs-auth0'



function MyApp({ Component, pageProps }) {

  const link = new HttpLink({uri : `${process.env.NEXT_PUBLIC_API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link, cache})

  const [itemsAdded, setItemsAdded] = React.useState("")

  useEffect(() => {
    window.addEventListener('addToCart', function (e) {
        setItemsAdded(e.detail)
    })
  }, [])

  const SnackContainer = () => {
      return (
          <>
          <CartSnack props={itemsAdded[0]} />
          </>
      )
  }


  return (
    <>
    <UserProvider>
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    </UserProvider>
    {itemsAdded !== "" ? <SnackContainer /> : null}
    </>
  )
}

export default MyApp

function CartSnack (props) {

  console.log(props)

  const [open, setOpen] = React.useState(true)

  const action = (
      <>
      <Button color="secondary" size="small" onClick={()=> {router.push('/checkout')}}>
          View
      </Button>
      </>
  )

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
