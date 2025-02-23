import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CompanyLogin from "./components/company/CompanyLogin";
import FreelancerRegister from "./components/Freelancer/FreelancerRegister";
import Section from './components/Section';
import FreelancerLogin from "./components/Freelancer/FreelancerLogin";
import FreelancerHero from "./components/Freelancer/FreelancerHero";
import FreelancerProfile from "./components/Freelancer/FreelancerProfile";
import CreateJobOpening from './components/company/CreateJob';
import ChatApp from "./components/ChatApp";
import CompanyRegistration from "./components/company/CompanyRegistration";
import CompanyDashboard from "./components/company/CompanyDashboard";
import JobBoard from "./components/company/JobBoard";
import AboutUs from "./components/ui/AboutUs";
import CompanyHero from "./components/company/CompanyHero";
import { ChatProvider } from "./context/ChatContext"; 
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("user") || "user1";
  const chatRoom = "room1";
  
  return (
    <ChatProvider>
      <Router>
      <div className="min-h-screen flex flex-col">
          <Navbar />
          
          
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Section />
                <div className="app-container">
                  {/* <ChatApp userId={userId} chatRoom={chatRoom} /> */}
                </div>
                <Footer />
              </>
            } />
            <Route path="/freelancer/login" element={<FreelancerLogin />} />
            <Route path="/company/login" element={<CompanyLogin />} />
            <Route path="/freelancer/register" element={<FreelancerRegister/>} />
            <Route path="/freelancer/dashboard" element={<FreelancerHero />} />
            <Route path="/freelancer/profile" element={<FreelancerProfile />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/jobs" element={<JobBoard />} />
            <Route path="/company/register" element={<CompanyRegistration />} />
            <Route path="/create-job" element={<CreateJobOpening />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/company/hero" element={<CompanyHero />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/section" element={<Section />} />
          </Routes>
        </main>
      </div>
    </Router>
    </ChatProvider>
  )
}

export default App;
