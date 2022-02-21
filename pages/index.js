import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RestaurantsHome from '../components/RestaurantsHome'
import SearchBar from '../components/SearchBar'
import ServiceOptions from '../components/ServiceOptions'

export default function Home() {
  return (
    <>
    <br/>
    <SearchBar />
    <br/>
    <RestaurantsHome />
    <br/>
    </>
  )
}
