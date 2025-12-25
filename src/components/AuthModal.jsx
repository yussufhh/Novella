import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState('renter'); // 'renter' or 'owner'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Reset form when switching between login/signup
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUserRole('renter');
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [isLogin]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Form validation
  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!isLogin && !confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(isLogin ? 'Login data:' : 'Signup data:', {
        email,
        password,
        ...((!isLogin) && { confirmPassword, userRole })
      });
      setLoading(false);
      
      // Store user role in localStorage
      if (!isLogin) {
        localStorage.setItem('userRole', userRole);
      } else {
        // For demo, default to renter for login
        localStorage.setItem('userRole', 'renter');
      }
      
      if (onSuccess) {
        onSuccess({ email, isLogin, userRole: isLogin ? 'renter' : userRole });
      }
      onClose();
    }, 1500);
  };

  // Handle Google OAuth
  const handleGoogleAuth = () => {
    console.log('Google OAuth triggered');
    setError('');
    // Implement Google OAuth logic here
  };

  // Backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 py-12 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-blue-500 hover:text-blue-700 text-2xl hover:scale-110 transition-all duration-300"
              aria-label="Close modal"
            >
              <HiX />
            </button>

            {/* Logo/Title */}
            <div className="text-center mb-10 mt-4">
              <h2 id="auth-modal-title" className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
                Welcome to Novella
              </h2>
              <p className="text-blue-600">Your dream home awaits</p>
            </div>

            {/* Tab Header */}
            <div className="flex border-b border-blue-100 mb-10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-2 text-lg font-semibold transition-all duration-300 ${
                  isLogin
                    ? 'text-blue-600 border-b-4 border-blue-500'
                    : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-2 text-lg font-semibold transition-all duration-300 ${
                  !isLogin
                    ? 'text-blue-600 border-b-4 border-blue-500'
                    : 'text-blue-400 hover:text-blue-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full bg-white border-2 border-blue-200 hover:border-blue-400 text-blue-700 font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-blue-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-blue-900 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-2 border-blue-100 focus:border-blue-500 bg-white/50 rounded-2xl px-5 py-4 text-lg placeholder-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                  disabled={loading}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-blue-900 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-2 border-blue-100 focus:border-blue-500 bg-white/50 rounded-2xl px-5 py-4 text-lg placeholder-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 pr-12"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Signup only) */}
              <AnimatePresence>
                {!isLogin && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="confirmPassword" className="block text-blue-900 font-semibold mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border-2 border-blue-100 focus:border-blue-500 bg-white/50 rounded-2xl px-5 py-4 text-lg placeholder-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 pr-12"
                          disabled={loading}
                          required={!isLogin}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                        </button>
                      </div>
                    </motion.div>

                    {/* User Role Selection (Signup only) */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-blue-900 font-semibold mb-2">
                        I want to
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setUserRole('renter')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            userRole === 'renter'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-blue-100 bg-white text-blue-900 hover:border-blue-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">🏠</div>
                          <div className="font-bold">Rent a Home</div>
                          <div className="text-xs mt-1 opacity-75">Find properties</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setUserRole('owner')}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            userRole === 'owner'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-blue-100 bg-white text-blue-900 hover:border-blue-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">🏘️</div>
                          <div className="font-bold">List Property</div>
                          <div className="text-xs mt-1 opacity-75">Become an owner</div>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 mt-8"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>{isLogin ? 'Sign In' : 'Create Account'}</>
                )}
              </button>

              {/* Toggle Login/Signup */}
              <div className="text-center mt-8">
                <p className="text-blue-700">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </div>

              {/* Terms and Privacy (Signup only) */}
              {!isLogin && (
                <p className="text-xs text-blue-500 text-center mt-6 pb-2">
                  By signing up, you agree to our{' '}
                  <button type="button" className="underline hover:text-blue-700">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="underline hover:text-blue-700">
                    Privacy Policy
                  </button>
                </p>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
