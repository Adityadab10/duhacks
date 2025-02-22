import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CDash from "./components/CDash";
import JobBoard from "./components/company/JobBoard";
import CompanyLogin from "./components/company/CompanyLogin";


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
      <FreelancerLogin/>
      <CDash/>
  
      
            <Section/>
          </>
        } />
        <Route path="/freelancer-login" element={<FreelancerLogin />} />
        <Route path="/company-login" element={<CompanyLogin />} />
      </Routes>
    </Router>
  )
}

export default App
