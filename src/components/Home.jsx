
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiSearch, 
  HiOutlineLocationMarker, 
  HiOutlineCalendar, 
  HiOutlineUsers, 
  HiOutlineShieldCheck, 
  HiOutlineBadgeCheck,
  HiOutlineHome
} from 'react-icons/hi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const Home = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchData);
  };

  const categories = ["Apartments", "Villas", "Studios", "Family Homes", "Luxury", "Budget"];

  const featuredProperties = [
    {
      id: 1,
      title: "Azure Horizon Villa",
      price: "$2,500",
      location: "Malindi, Kenya",
      rating: "4.9",
      beds: 4,
      baths: 3,
      sqft: "2,400",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Skyline Modern Suite",
      price: "$1,200",
      location: "Westlands, Nairobi",
      rating: "4.8",
      beds: 2,
      baths: 2,
      sqft: "1,100",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Blue Wave Cottage",
      price: "$950",
      location: "Diani Beach",
      rating: "4.7",
      beds: 3,
      baths: 2,
      sqft: "1,800",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "The Glass Pavilion",
      price: "$4,000",
      location: "Karen, Nairobi",
      rating: "5.0",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Sapphire Apartments",
      price: "$800",
      location: "Kilimani, Nairobi",
      rating: "4.6",
      beds: 1,
      baths: 1,
      sqft: "750",
      img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Cobalt Creek Manor",
      price: "$3,200",
      location: "Runda, Nairobi",
      rating: "4.9",
      beds: 6,
      baths: 5,
      sqft: "5,000",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-blue-900 selection:bg-blue-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"></div>
        
        {/* Decorative SVG Waves */}
        <div className="absolute bottom-0 w-full leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] text-slate-50 fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.57,105.7,118.07,110.11,177.51,103.3c74.17-8.51,146.12-25.5,219.89-35.15C434.78,63.15,471.6,60,508,60c32.4,0,65.34,2.5,97.16,13.56,38.3,13.34,74.67,31.43,113.14,42.87,46,13.68,94.51,17.2,142,12a450.7,450.7,0,0,0,103.62-25c75.61-26.65,142.27-72.2,217.48-84C1147.21,11,1200,43.33,1200,43.33V120H0V0Z"></path>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight"
          >
            Find Your <span className="text-blue-300">Dream Home</span> Today
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-50 mb-12 max-w-2xl mx-auto font-light"
          >
            Discover thousands of premium verified rentals tailored to your lifestyle.
          </motion.p>

          {/* Search Bar Container */}
          <motion.form 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 0.5 }}
            onSubmit={handleSearch}
            className="bg-white p-4 md:p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="flex-1 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-blue-100 p-2 w-full">
              <HiOutlineLocationMarker className="text-blue-500 text-2xl flex-shrink-0" />
              <div className="text-left w-full">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="w-full focus:outline-none text-blue-900 font-medium placeholder:text-slate-300"
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="flex-1 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-blue-100 p-2 w-full">
              <HiOutlineCalendar className="text-blue-500 text-2xl flex-shrink-0" />
              <div className="text-left w-full">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Check-in</label>
                <input 
                  type="date" 
                  className="w-full focus:outline-none text-blue-900 font-medium"
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                />
              </div>
            </div>

            <div className="flex-1 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-blue-100 p-2 w-full">
              <HiOutlineUsers className="text-blue-500 text-2xl flex-shrink-0" />
              <div className="text-left w-full">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Guests</label>
                <select 
                  className="w-full focus:outline-none text-blue-900 font-medium bg-transparent"
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                >
                  {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Guests</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-blue-500/40">
              <HiSearch className="text-xl" />
              <span>Search</span>
            </button>
          </motion.form>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar flex space-x-4 py-4 justify-center">
          {categories.map((cat) => (
            <button key={cat} className="whitespace-nowrap px-8 py-3 rounded-2xl border-2 border-blue-50 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- FEATURED PROPERTIES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">Featured Rentals</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProperties.map((property, index) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-50"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={property.img} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-blue-700 px-4 py-1.5 rounded-full font-bold shadow-lg">
                  {property.price}<span className="text-xs font-normal">/mo</span>
                </div>
                <button className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                  <HiOutlineBadgeCheck />
                </button>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                    <p className="text-blue-400 flex items-center text-sm mt-1">
                      <HiOutlineLocationMarker className="mr-1" /> {property.location}
                    </p>
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-sm font-bold flex items-center">
                    ⭐ {property.rating}
                  </div>
                </div>

                <div className="flex justify-between py-4 border-t border-blue-50">
                  <div className="flex items-center text-blue-500 font-medium">
                    <BiBed className="mr-2 text-xl" /> {property.beds} <span className="ml-1 text-slate-400 text-xs">Beds</span>
                  </div>
                  <div className="flex items-center text-blue-500 font-medium">
                    <BiBath className="mr-2 text-xl" /> {property.baths} <span className="ml-1 text-slate-400 text-xs">Baths</span>
                  </div>
                  <div className="flex items-center text-blue-500 font-medium">
                    <BiArea className="mr-2 text-xl" /> {property.sqft} <span className="ml-1 text-slate-400 text-xs">Sqft</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-bold transition-all transform group-hover:scale-[1.02]">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US & STATS --- */}
      <section className="bg-blue-900 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Why Rent With Novella?</h2>
            <p className="text-blue-300">We make finding your next home as simple as a few clicks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: <HiOutlineShieldCheck />, title: "Secure Payments", desc: "Every transaction is encrypted and protected by our secure escrow system." },
              { icon: <HiOutlineBadgeCheck />, title: "Verified Listings", desc: "Our team personally verifies every property to ensure quality and authenticity." },
              { icon: <HiOutlineHome />, title: "Zero Hassle", desc: "Electronic lease signing and digital keys make moving in a breeze." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-5xl text-blue-400 mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10">
            {[
              { num: "10K+", label: "Properties" },
              { num: "500K+", label: "Happy Tenants" },
              { num: "24/7", label: "Support" },
              { num: "100%", label: "Verified" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-2">{stat.num}</div>
                <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-700 to-blue-500 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to find your home?</h2>
            <p className="text-blue-50 text-lg mb-12 max-w-xl mx-auto">Join thousands of people finding their perfect living spaces effortlessly every day.</p>
            <button className="bg-white text-blue-700 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-12 gap-4 h-full">
              {[...Array(48)].map((_, i) => <div key={i} className="border border-white/30 rounded-full w-2 h-2"></div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;