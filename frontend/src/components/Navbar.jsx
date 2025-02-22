import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <nav className="bg-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setActiveItem("/")}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Jobster
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-sky-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-sky-800 ${
                    activeItem === item.path 
                      ? "bg-sky-800 text-white" 
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* CTA Button */}
            <li className="ml-4">
              <Link
                to="/get-started"
                className="px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? "max-h-64 opacity-100" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="py-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg transition-all duration-200 hover:bg-sky-800 ${
                    activeItem === item.path 
                      ? "bg-sky-800 text-white" 
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveItem(item.path);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* Mobile CTA Button */}
            <li className="pt-2">
              <Link
                to="/get-started"
                className="block px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}