import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CompanyLogin from "./components/company/CompanyLogin";
import Offers from "./components/company/Offers"
import Section from './components/Section'
import FreelancerLogin from "./components/Freelancer/FreelancerLogin"
import CompanyDashboard from './components/company/CompanyDashboard';
import CreateJobOpening from './components/company/CreateJob';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
      <FreelancerLogin/>
      <Offers/>
      <CompanyDashboard/>
      
  
      
            <Section/>
          </>
        } />
        <Route path="/freelancer-login" element={<FreelancerLogin />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/create-job" element={<CreateJobOpening />} />
     



        
      </Routes>
    </Router>
  )
}

export default App
