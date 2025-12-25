import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiOutlineLocationMarker } from 'react-icons/hi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const Rentals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ["All", "Apartments", "Villas", "Studios", "Family Homes", "Luxury", "Budget"];

  const properties = [
    {
      id: 1,
      title: "Azure Horizon Villa",
      price: "$2,500",
      location: "Malindi, Kenya",
      rating: "4.9",
      beds: 4,
      baths: 3,
      area: "2800 sq ft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      category: "Villas"
    },
    {
      id: 2,
      title: "Downtown Studio Loft",
      price: "$1,200",
      location: "Nairobi, Kenya",
      rating: "4.7",
      beds: 1,
      baths: 1,
      area: "650 sq ft",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      category: "Studios"
    },
    {
      id: 3,
      title: "Seaside Family Home",
      price: "$3,200",
      location: "Mombasa, Kenya",
      rating: "4.8",
      beds: 5,
      baths: 4,
      area: "3500 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      category: "Family Homes"
    },
    {
      id: 4,
      title: "Modern City Apartment",
      price: "$1,800",
      location: "Kisumu, Kenya",
      rating: "4.6",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      category: "Apartments"
    },
    {
      id: 5,
      title: "Luxury Penthouse",
      price: "$5,000",
      location: "Nairobi, Kenya",
      rating: "5.0",
      beds: 3,
      baths: 3,
      area: "2200 sq ft",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      category: "Luxury"
    },
    {
      id: 6,
      title: "Budget-Friendly Flat",
      price: "$800",
      location: "Eldoret, Kenya",
      rating: "4.4",
      beds: 1,
      baths: 1,
      area: "500 sq ft",
      image: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?auto=format&fit=crop&w=800&q=80",
      category: "Budget"
    }
  ];

  const filteredProperties = selectedCategory === 'All' 
    ? properties 
    : properties.filter(prop => prop.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Explore Our Rentals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Find your perfect home from our curated collection of properties
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-yellow-500 font-semibold">⭐ {property.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <HiOutlineLocationMarker className="mr-1" />
                  <span>{property.location}</span>
                </div>
                
                <div className="flex items-center justify-between text-gray-700 mb-4">
                  <div className="flex items-center space-x-1">
                    <BiBed className="text-xl" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiBath className="text-xl" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiArea className="text-xl" />
                    <span>{property.area}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-3xl font-bold text-blue-600">{property.price}<span className="text-lg text-gray-500">/mo</span></span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rentals;
