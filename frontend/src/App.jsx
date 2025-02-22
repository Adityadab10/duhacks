import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

import FreelancerLogin from "./components/Freelancer/FreelancerLogin"

function App() {
  return (
    <Router>
      <Navbar/>
      <HeroSection/>
    </>
  )
}

export default App
