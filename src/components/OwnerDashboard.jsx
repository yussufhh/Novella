import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlinePlus,
  HiOutlineCreditCard, 
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineUsers
} from 'react-icons/hi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProperty, setShowAddProperty] = useState(false);

  // Mock owner data
  const ownerData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    memberSince: "March 2023",
    totalProperties: 8,
    activeListings: 6,
    totalRevenue: "$124,500",
    monthlyRevenue: "$15,200"
  };

  // Mock properties data
  const properties = [
    {
      id: 1,
      title: "Azure Horizon Villa",
      location: "Malindi, Kenya",
      price: "$2,500",
      status: "Active",
      beds: 4,
      baths: 3,
      area: "2800 sq ft",
      views: 324,
      bookings: 12,
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Downtown Studio Loft",
      location: "Nairobi, Kenya",
      price: "$1,200",
      status: "Active",
      beds: 1,
      baths: 1,
      area: "650 sq ft",
      views: 189,
      bookings: 8,
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      location: "Nairobi, Kenya",
      price: "$5,000",
      status: "Pending",
      beds: 3,
      baths: 3,
      area: "2200 sq ft",
      views: 567,
      bookings: 15,
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Mock bookings on owner's properties
  const bookings = [
    {
      id: 1,
      property: "Azure Horizon Villa",
      renter: "John Doe",
      checkIn: "2025-01-15",
      checkOut: "2025-01-22",
      price: "$2,500",
      status: "Confirmed"
    },
    {
      id: 2,
      property: "Downtown Studio Loft",
      renter: "Jane Smith",
      checkIn: "2025-02-10",
      checkOut: "2025-02-17",
      price: "$1,200",
      status: "Pending"
    },
    {
      id: 3,
      property: "Luxury Penthouse",
      renter: "Mike Brown",
      checkIn: "2024-12-28",
      checkOut: "2025-01-05",
      price: "$5,000",
      status: "Confirmed"
    }
  ];

  // Mock revenue data
  const revenueData = [
    { month: "Jan", amount: 12400 },
    { month: "Feb", amount: 15200 },
    { month: "Mar", amount: 18900 },
    { month: "Apr", amount: 14300 },
    { month: "May", amount: 19800 },
    { month: "Jun", amount: 22100 },
    { month: "Jul", amount: 20500 },
    { month: "Aug", amount: 23400 },
    { month: "Sep", amount: 21200 },
    { month: "Oct", amount: 24800 },
    { month: "Nov", amount: 26300 },
    { month: "Dec", amount: 28500 }
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      property: "Azure Horizon Villa",
      renter: "John Doe",
      rating: 5,
      comment: "Amazing property! The villa exceeded all our expectations. Beautiful views and excellent amenities.",
      date: "2024-12-20"
    },
    {
      id: 2,
      property: "Downtown Studio Loft",
      renter: "Jane Smith",
      rating: 4,
      comment: "Great location and clean apartment. Perfect for a city stay.",
      date: "2024-12-18"
    },
    {
      id: 3,
      property: "Luxury Penthouse",
      renter: "Mike Brown",
      rating: 5,
      comment: "Absolutely stunning! Worth every penny. Will definitely book again.",
      date: "2024-12-15"
    }
  ];

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: <HiOutlineChartBar /> },
    { id: 'properties', name: 'My Properties', icon: <HiOutlineHome /> },
    { id: 'add-property', name: 'Add Property', icon: <HiOutlinePlus /> },
    { id: 'bookings', name: 'Bookings', icon: <HiOutlineCalendar /> },
    { id: 'revenue', name: 'Revenue', icon: <HiOutlineCreditCard /> },
    { id: 'reviews', name: 'Reviews', icon: <HiOutlineStar /> },
    { id: 'profile', name: 'Profile', icon: <HiOutlineUser /> },
    { id: 'settings', name: 'Settings', icon: <HiOutlineCog /> }
  ];

  const statsCards = [
    { title: 'Total Properties', value: ownerData.totalProperties, icon: <HiOutlineHome />, color: 'blue', change: '+2 this month' },
    { title: 'Active Listings', value: ownerData.activeListings, icon: <HiOutlineTrendingUp />, color: 'green', change: '75% active' },
    { title: 'Total Revenue', value: ownerData.totalRevenue, icon: <HiOutlineCreditCard />, color: 'purple', change: '+12% this year' },
    { title: 'Monthly Revenue', value: ownerData.monthlyRevenue, icon: <HiOutlineChartBar />, color: 'orange', change: '+8% from last month' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* User Profile */}
              <div className="text-center mb-8 pb-6 border-b border-blue-100">
                <div className="relative inline-block mb-4">
                  <img 
                    src={ownerData.avatar} 
                    alt={ownerData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-xl font-bold text-blue-900">{ownerData.name}</h3>
                <p className="text-sm text-blue-600">{ownerData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Property Owner</span>
                <p className="text-xs text-gray-500 mt-2">Member since {ownerData.memberSince}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all duration-300 mt-4">
                  <span className="text-xl"><HiOutlineLogout /></span>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold text-blue-900">Owner Dashboard</h1>
                  <button 
                    onClick={() => setActiveTab('add-property')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <HiOutlinePlus className="text-xl" />
                    Add Property
                  </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {statsCards.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600 text-2xl`}>
                          {stat.icon}
                        </div>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                      <p className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</p>
                      <p className="text-xs text-green-600 font-semibold">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">Revenue Overview</h2>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg hover:from-blue-600 hover:to-blue-400 transition-all cursor-pointer"
                          style={{ height: `${(data.amount / 30000) * 100}%` }}
                          title={`$${data.amount.toLocaleString()}`}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Bookings */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Recent Bookings</h2>
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-blue-900">{booking.property}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Renter: {booking.renter}</p>
                          <p className="text-xs text-gray-500 mt-1">{booking.checkIn} - {booking.checkOut}</p>
                          <p className="text-lg font-bold text-blue-600 mt-2">{booking.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Reviews */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Recent Reviews</h2>
                    <div className="space-y-4">
                      {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="p-4 rounded-xl border border-blue-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-blue-900">{review.renter}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <HiOutlineStar key={i} className="text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">{review.property} • {review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-4xl font-bold text-blue-900">My Properties</h1>
                  <button 
                    onClick={() => setActiveTab('add-property')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <HiOutlinePlus className="text-xl" />
                    Add New Property
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="relative h-48">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">{property.title}</h3>
                        <p className="text-gray-600 flex items-center gap-1 mb-4">
                          <HiOutlineLocationMarker className="text-blue-500" />
                          {property.location}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-700">
                          <div className="flex items-center gap-1">
                            <BiBed className="text-lg" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiBath className="text-lg" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiArea className="text-lg" />
                            <span className="text-xs">{property.area}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-500">Views</p>
                            <p className="font-bold text-blue-900">{property.views}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Bookings</p>
                            <p className="font-bold text-blue-900">{property.bookings}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                          <span className="text-2xl font-bold text-blue-600">{property.price}<span className="text-sm text-gray-500">/mo</span></span>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <HiOutlinePencil />
                            Edit
                          </button>
                          <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                            <HiOutlineTrash />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Add Property Tab */}
            {activeTab === 'add-property' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Add New Property</h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Property Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Luxury Beach Villa"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Location</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Nairobi, Kenya"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Price per Month ($)</label>
                        <input 
                          type="number" 
                          placeholder="2500"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Property Type</label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors">
                          <option>Apartment</option>
                          <option>Villa</option>
                          <option>Studio</option>
                          <option>Family Home</option>
                          <option>Penthouse</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Bedrooms</label>
                        <input 
                          type="number" 
                          placeholder="3"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Bathrooms</label>
                        <input 
                          type="number" 
                          placeholder="2"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Area (sq ft)</label>
                        <input 
                          type="number" 
                          placeholder="1200"
                          className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-900 font-semibold mb-2">Status</label>
                        <select className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors">
                          <option>Active</option>
                          <option>Pending</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Description</label>
                      <textarea 
                        rows="4"
                        placeholder="Describe your property..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Property Images</label>
                      <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <HiOutlinePlus className="text-5xl text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-600 font-semibold">Click to upload images</p>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                      >
                        Publish Property
                      </button>
                      <button 
                        type="button"
                        className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Property Bookings</h1>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50 border-b border-blue-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Booking ID</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Property</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Renter</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Check-in</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Check-out</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-50">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm text-gray-600">BK{booking.id.toString().padStart(6, '0')}</td>
                            <td className="px-6 py-4 font-semibold text-blue-900">{booking.property}</td>
                            <td className="px-6 py-4 text-gray-700">{booking.renter}</td>
                            <td className="px-6 py-4 text-gray-700">{booking.checkIn}</td>
                            <td className="px-6 py-4 text-gray-700">{booking.checkOut}</td>
                            <td className="px-6 py-4 font-bold text-blue-600">{booking.price}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Approve</button>
                                <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Decline</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Revenue & Earnings</h1>

                {/* Revenue Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                    <p className="text-blue-100 mb-2">Total Revenue</p>
                    <p className="text-4xl font-bold mb-4">$124,500</p>
                    <p className="text-sm text-blue-100">+12% from last year</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                    <p className="text-green-100 mb-2">This Month</p>
                    <p className="text-4xl font-bold mb-4">$15,200</p>
                    <p className="text-sm text-green-100">+8% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                    <p className="text-purple-100 mb-2">Pending</p>
                    <p className="text-4xl font-bold mb-4">$3,800</p>
                    <p className="text-sm text-purple-100">2 pending payments</p>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">Monthly Revenue Breakdown</h2>
                  <div className="h-80 flex items-end justify-between gap-3">
                    {revenueData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        <div className="relative w-full">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-xl hover:from-blue-600 hover:to-blue-400 transition-all cursor-pointer shadow-lg"
                            style={{ height: `${(data.amount / 30000) * 280}px` }}
                          >
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ${data.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 mt-3">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border-2 border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <HiOutlineCreditCard className="text-2xl text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-blue-900">Bank Account</p>
                          <p className="text-sm text-gray-600">****  **** 4532</p>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">Active</span>
                    </div>
                    <button className="w-full p-4 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 font-semibold hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      + Add Payment Method
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Customer Reviews</h1>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-6xl font-bold text-blue-600 mb-2">4.8</p>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <HiOutlineStar key={i} className="text-yellow-500 fill-current text-xl" />
                        ))}
                      </div>
                      <p className="text-gray-600">Based on 127 reviews</p>
                    </div>
                    <div className="md:col-span-3 space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-gray-700 w-12">{stars} stars</span>
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400"
                              style={{ width: `${stars === 5 ? 75 : stars === 4 ? 15 : stars === 3 ? 7 : 3}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">{stars === 5 ? '95' : stars === 4 ? '19' : stars === 3 ? '9' : '4'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                            {review.renter.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-blue-900">{review.renter}</p>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <HiOutlineStar key={i} className="text-yellow-500 fill-current text-lg" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <p className="text-sm font-semibold text-blue-600">{review.property}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">My Profile</h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={ownerData.name}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={ownerData.email}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+254 700 123 456"
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Location</label>
                      <input 
                        type="text" 
                        placeholder="Nairobi, Kenya"
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-blue-900 font-semibold mb-2">Company/Agency Name (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="Real Estate Agency"
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-blue-900 font-semibold mb-2">Bio</label>
                      <textarea 
                        rows="4"
                        placeholder="Tell renters about yourself and your properties..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Settings</h1>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">Notifications</h2>
                    <div className="space-y-4">
                      {['New booking requests', 'Booking confirmations', 'Payment notifications', 'New reviews', 'Property inquiries', 'Promotional emails'].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                          <span className="font-semibold text-blue-900">{setting}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={index < 4} />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-6">Security</h2>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors font-semibold text-blue-900">
                        Change Password
                      </button>
                      <button className="w-full text-left p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors font-semibold text-blue-900">
                        Two-Factor Authentication
                      </button>
                      <button className="w-full text-left p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors font-semibold text-blue-900">
                        Manage Sessions
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-red-900 mb-6">Danger Zone</h2>
                    <button className="w-full bg-red-50 text-red-700 border-2 border-red-200 p-4 rounded-xl font-bold hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
