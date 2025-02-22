import { useState } from "react";
import { Link } from "react-router-dom"; // Remove this if not using React Router
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyWebsite</h1>
        
        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-16 md:top-auto shadow-md md:shadow-none p-4 md:p-0 transition-all ease-in-out duration-300 ${isOpen ? "block" : "hidden"}`}
        >
          <li><Link to="/" className="block py-2 px-4 hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="block py-2 px-4 hover:text-blue-500">About</Link></li>
          <li><Link to="/services" className="block py-2 px-4 hover:text-blue-500">Services</Link></li>
          <li><Link to="/contact" className="block py-2 px-4 hover:text-blue-500">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
