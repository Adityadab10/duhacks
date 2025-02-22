import React from 'react'
import { ArrowRight, Users, Shield, Star, Briefcase, Globe } from "lucide-react"

export default function CompanyHero() {
  return (
    <div className="bg-gradient-to-br from-[#2F4156] to-[#1A2A3A] text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Unlock Your Business Potential with <span className="text-blue-300">FreeJob</span>
            </h1>
            <p className="text-lg text-gray-300 md:text-xl">
              Connect with top talent, streamline your hiring process, and build your dream team. 
              Join thousands of successful companies on our secure and innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#2F4156] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
                How It Works
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <Stat icon={Users} text="50k+ Candidates" />
              <Stat icon={Shield} text="Secure Hiring" />
              <Stat icon={Star} text="Top Rated Talent" />
              <Stat icon={Briefcase} text="20k+ Jobs Filled" />
              <Stat icon={Globe} text="Global Talent Pool" />
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute -right-8 -bottom-8 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Company hiring"
              className="relative z-10 rounded-lg object-cover shadow-2xl"
              width={600}
              height={600}
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
