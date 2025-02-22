import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CDash from "./components/CDash";
import JobBoard from "./components/company/JobBoard";




import FreelancerLogin from "./components/Freelancer/FreelancerLogin"

function App() {
  return (
    <Router>
      <Navbar/>
      <HeroSection/>
      <FreelancerLogin/>
      <CDash/>
  
      
      
    </Router>
  )
}

export default App
