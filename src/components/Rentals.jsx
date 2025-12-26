import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiOutlineLocationMarker } from 'react-icons/hi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';
import { propertyAPI } from '../services/api';

const Rentals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  
  const categories = ["All", "apartment", "house", "condo", "villa", "studio"];

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties();
  }, [selectedCategory, searchCity]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {};
      if (selectedCategory !== 'All') {
        filters.property_type = selectedCategory;
      }
      if (searchCity) {
        filters.city = searchCity;
      }
      
      const data = await propertyAPI.getProperties(filters);
      setProperties(data.properties || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Failed to load properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPropertyImage = (property) => {
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    // Default fallback images based on property type
    const fallbacks = {
      apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      house: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      villa: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      condo: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      studio: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    };
    return fallbacks[property.property_type] || fallbacks.apartment;
  };

  const formatPropertyType = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

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
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Find your perfect home from our curated collection of properties
          </motion.p>
          
          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto flex gap-4"
          >
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search by city..."
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <HiSearch className="text-xl" />
              Search
            </button>
          </motion.form>
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
              {category === 'All' ? 'All' : formatPropertyType(category)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchProperties}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No properties found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={getPropertyImage(property)} 
                    alt={property.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-blue-600 font-semibold capitalize">{property.property_type}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <HiOutlineLocationMarker className="mr-1" />
                    <span>{property.city}, {property.state}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-700 mb-4">
                    <div className="flex items-center space-x-1">
                      <BiBed className="text-xl" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BiBath className="text-xl" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    {property.square_feet && (
                      <div className="flex items-center space-x-1">
                        <BiArea className="text-xl" />
                        <span>{property.square_feet} sqft</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.price_per_month)}
                      <span className="text-lg text-gray-500">/mo</span>
                    </span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Rentals;

