import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <HiOutlineHome className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-blue-900">Novella</span>
          </Link>
          <p className="text-blue-400 leading-relaxed">Redefining the rental experience with transparency, security, and elegance.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-blue-950 mb-6">Discover</h4>
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><Link to="/rentals" className="hover:text-blue-700 transition-colors">Browse Properties</Link></li>
            <li><Link to="/about" className="hover:text-blue-700 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-700 transition-colors">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-700 transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6">Support</h4>
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><a href="#" className="hover:text-blue-700 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Safety</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Community</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6">Legal</h4>
          <ul className="space-y-4 text-blue-500 font-medium">
            <li><a href="#" className="hover:text-blue-700 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-blue-700 transition-colors">Licenses</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-blue-50 text-center text-blue-300 font-medium">
        © {new Date().getFullYear()} Novella Rental Systems. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
