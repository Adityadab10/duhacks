import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CompanyLogin from "./components/company/CompanyLogin";
import FreelancerRegister from "./components/Freelancer/FreelancerRegister";
import Offers from "./components/company/Offers"
import Section from './components/Section'
import FreelancerLogin from "./components/Freelancer/FreelancerLogin"
import FreelancerHero from "./components/Freelancer/FreelancerHero"
import FreelancerProfile from "./components/Freelancer/FreelancerProfile"
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
            <Section/>
          </>
        } />
        <Route path="/freelancer/login" element={<FreelancerLogin />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/freelancer/register" element={<FreelancerRegister/>}/>
        <Route path="/freelancer/dashboard" element={<FreelancerHero />} />
        <Route path="/freelancer/profile" element={<FreelancerProfile />} />
        <Route path="/create-job" element={<CreateJobOpening />} />
     



        
      </Routes>
    </Router>
  )
}

export default App
