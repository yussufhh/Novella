import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineHome, HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rentals', path: '/rentals' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <HiOutlineHome className="text-white text-2xl" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-blue-900' : 'text-white'}`}>Novella</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `font-medium transition-colors ${
                    isActive 
                      ? isScrolled ? 'text-blue-600 font-bold' : 'text-white font-bold' 
                      : isScrolled ? 'text-blue-700 hover:text-blue-500' : 'text-white/90 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button 
              onClick={() => setShowAuth(true)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${isScrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl'}`}
            >
              Login / Sign Up
            </button>
          </div>

          <button className="md:hidden text-3xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <HiX className={isScrolled ? 'text-blue-900' : 'text-white'} /> : <HiOutlineMenuAlt3 className={isScrolled ? 'text-blue-900' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col items-center justify-center space-y-8"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-4xl text-blue-900">
              <HiX />
            </button>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-3xl font-bold ${isActive ? 'text-blue-600' : 'text-blue-900'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowAuth(true);
              }}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold shadow-xl"
            >
              Login / Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onSuccess={(data) => {
          console.log('Auth success:', data);
          setShowAuth(false);
        }}
      />
    </>
  );
};

export default Navbar;
