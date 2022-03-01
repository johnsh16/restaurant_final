import '../styles/globals.css'
import React, { useEffect } from "react"
import Layout from '../components/Layout'
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import "regenerator-runtime/runtime.js"
import { UserProvider } from '@auth0/nextjs-auth0'



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
    </>
  )
}

export default MyApp
