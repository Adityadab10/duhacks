import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <>
      <Navbar/>
      {/* <HeroSection/> */}
      {/* ..My name is Russel  */}
      <h1 className='text-3xl font-bold underline'>Hello World</h1>
      <h2 className='text-3xl font-bold underline'>Hello Worldd</h2>
      <Navbar/>
      <HeroSection/>
    </>
  )
}

export default App
