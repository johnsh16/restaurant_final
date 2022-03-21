import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/Layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {Button, Snackbar, CssBaseline} from "@mui/material"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import "regenerator-runtime/runtime.js"
import { UserProvider } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Karla from '../public/fonts/Karla/Karla-VariableFont_wght.ttf'


function MyApp({ Component, pageProps }) {

  const link = new HttpLink({uri : `${process.env.NEXT_PUBLIC_API_URL}/graphql`})
  const cache = new InMemoryCache()
  const client = new ApolloClient({link, cache})

  const THEME = createTheme({
    typography: {
      fontFamily: 'Karla'
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Karla';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('../public/fonts/Karla/Karla-VariableFont_wght.ttf'), local('Karla'), url(${Karla}), format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
    },
  })

  return (
    <>
    <ThemeProvider theme={THEME}>
    <UserProvider>
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <CssBaseline />
    </ApolloProvider>
    </UserProvider>
    <CartSnack />
    </ThemeProvider>
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
