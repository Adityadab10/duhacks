import React from 'react'
import { useNavigate } from 'react-router-dom' // Add this import
import { ArrowRight, Users, Shield, Star, Briefcase, Globe } from "lucide-react"

export default function HeroSection() {
  const navigate = useNavigate(); // Add this hook

  return (
    <div className="bg-gradient-to-br from-[#2F4156] to-[#1A2A3A] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Unlock Your Freelance Potential with <span className="text-blue-300">FreeJob</span>
            </h1>
            <p className="text-lg text-gray-300 md:text-xl">
              Connect with top clients, showcase your skills, and take control of your career. Join thousands of
              successful freelancers on our secure and innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/section')}  // Add onClick handler
                className="bg-white text-[#2F4156] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => navigate('/how-it-works')} // Add this onClick handler
                className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                How It Works
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <Stat icon={Users} text="20k+ Freelancers" />
              <Stat icon={Shield} text="Secure Payments" />
              <Stat icon={Star} text="Top Rated Pros" />
              <Stat icon={Briefcase} text="10k+ Projects" />
              <Stat icon={Globe} text="Global Reach" />
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute -right-8 -bottom-8 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>
            <img
              src="/Hero.png"
              alt="Freelancers collaborating"
              className="relative z-10 rounded-lg object-cover w-full h-auto max-w-[600px] mx-auto shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-blue-300" />
      <span className="text-sm">{text}</span>
    </div>
  )
}
