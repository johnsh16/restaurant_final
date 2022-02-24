import React from 'react'
import styles from '../styles/Home.module.css'
import RestaurantsHome from '../components/RestaurantsHome'
import SearchBar from '../components/SearchBar'

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
