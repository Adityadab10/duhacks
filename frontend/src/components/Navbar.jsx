
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#2F4156]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">FreeJob</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/find-work">Find Work</NavLink>
            <NavLink href="/hire">Hire Freelancers</NavLink>
            <NavLink href="/how-it-works">How it Works</NavLink>
            <button className="text-gray-200 hover:text-white transition-colors">Sign In</button>
            <button className="bg-white text-[#2F4156] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <NavLink href="/find-work" mobile>
              Find Work
            </NavLink>
            <NavLink href="/hire" mobile>
              Hire Freelancers
            </NavLink>
            <NavLink href="/how-it-works" mobile>
              How it Works
            </NavLink>
            <button className="block w-full text-left py-2 text-gray-200 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="block w-full text-left mt-2 bg-white text-[#2F4156] px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Join Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}



