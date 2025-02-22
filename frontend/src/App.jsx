import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Section from './components/Section'
import FreelancerLogin from "./components/Freelancer/FreelancerLogin"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <Section/>
          </>
        } />
        <Route path="/freelancer-login" element={<FreelancerLogin />} />
      </Routes>
    </Router>
  )
}

export default App
