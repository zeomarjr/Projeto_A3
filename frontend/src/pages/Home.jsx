import React from 'react'
import Carousel from '../components/layout/carrosel/Carousel' 
import sytles from './Home.module.css'
import Card from '../components/layout/Cards/Card'
const Home = () => {
  return (
   <div className={sytles.container} >
    <Carousel/>
    <h1>EVENTOS</h1>
    <Card/>
   </div>
  )
}

export default Home