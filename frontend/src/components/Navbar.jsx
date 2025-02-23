import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/how-it-works", label: "Services" }, // Changed path to /section
    { path: "/contact", label: "Contact" }
  ];

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/80 backdrop-blur-md text-gray-800 shadow-lg" 
        : "bg-transparent text-white"
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => setActiveItem("/")}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300">
              Jobster
            </span>
          </Link>

          <button
            className="md:hidden p-2 hover:bg-gray-100/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className="hidden md:flex md:items-center md:space-x-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeItem === item.path
                      ? "bg-blue-500 text-white"
                      : `${isScrolled ? "text-gray-600" : "text-gray-200"} hover:bg-gray-100/10`
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-4">
              <Link
                to="/section"  // Changed from /get-started to /section
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-sm font-medium hover:from-blue-500 hover:to-blue-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="py-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    activeItem === item.path
                      ? "bg-blue-500 text-white"
                      : `${isScrolled ? "text-gray-600" : "text-gray-200"} hover:bg-gray-100/10`
                  }`}
                  onClick={() => setActiveItem(item.path)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/section"  // Changed from /get-started to /section
                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg text-sm font-medium text-center hover:from-blue-500 hover:to-blue-300 transition-all duration-300 shadow-md"
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