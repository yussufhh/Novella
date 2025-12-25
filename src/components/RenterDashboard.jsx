import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineHome, 
  HiOutlineHeart, 
  HiOutlineCreditCard, 
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineBell,
  HiOutlineChartBar
} from 'react-icons/hi';
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const RenterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    memberSince: "January 2024",
    totalBookings: 12,
    activeBookings: 2,
    totalSpent: "$28,400"
  };

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      property: "Azure Horizon Villa",
      location: "Malindi, Kenya",
      checkIn: "2025-01-15",
      checkOut: "2025-01-22",
      price: "$2,500",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      property: "Downtown Studio Loft",
      location: "Nairobi, Kenya",
      checkIn: "2025-02-10",
      checkOut: "2025-02-17",
      price: "$1,200",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      property: "Seaside Family Home",
      location: "Mombasa, Kenya",
      checkIn: "2024-12-01",
      checkOut: "2024-12-08",
      price: "$3,200",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Mock favorite properties
  const favorites = [
    {
      id: 1,
      title: "Luxury Penthouse",
      location: "Nairobi, Kenya",
      price: "$5,000",
      rating: "5.0",
      beds: 3,
      baths: 3,
      area: "2200 sq ft",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Modern City Apartment",
      location: "Kisumu, Kenya",
      price: "$1,800",
      rating: "4.6",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Mock payment history
  const payments = [
    {
      id: 1,
      property: "Azure Horizon Villa",
      date: "2024-12-20",
      amount: "$2,500",
      status: "Paid",
      method: "Credit Card"
    },
    {
      id: 2,
      property: "Seaside Family Home",
      date: "2024-11-25",
      amount: "$3,200",
      status: "Paid",
      method: "PayPal"
    },
    {
      id: 3,
      property: "Downtown Studio Loft",
      date: "2024-11-10",
      amount: "$1,200",
      status: "Refunded",
      method: "Credit Card"
    }
  ];

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: <HiOutlineChartBar /> },
    { id: 'bookings', name: 'My Bookings', icon: <HiOutlineCalendar /> },
    { id: 'favorites', name: 'Favorites', icon: <HiOutlineHeart /> },
    { id: 'payments', name: 'Payments', icon: <HiOutlineCreditCard /> },
    { id: 'profile', name: 'Profile', icon: <HiOutlineUser /> },
    { id: 'settings', name: 'Settings', icon: <HiOutlineCog /> }
  ];

  const statsCards = [
    { title: 'Total Bookings', value: userData.totalBookings, icon: <HiOutlineCalendar />, color: 'blue' },
    { title: 'Active Bookings', value: userData.activeBookings, icon: <HiOutlineHome />, color: 'green' },
    { title: 'Favorites', value: favorites.length, icon: <HiOutlineHeart />, color: 'red' },
    { title: 'Total Spent', value: userData.totalSpent, icon: <HiOutlineCreditCard />, color: 'purple' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'refunded':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
                    src={userData.avatar} 
                    alt={userData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-xl font-bold text-blue-900">{userData.name}</h3>
                <p className="text-sm text-blue-600">{userData.email}</p>
                <p className="text-xs text-gray-500 mt-2">Member since {userData.memberSince}</p>
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
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Dashboard Overview</h1>

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
                      <p className="text-3xl font-bold text-blue-900">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">Recent Bookings</h2>
                  <div className="space-y-4">
                    {bookings.slice(0, 2).map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                        <img src={booking.image} alt={booking.property} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h3 className="font-bold text-blue-900">{booking.property}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <HiOutlineLocationMarker className="text-blue-500" />
                            {booking.location}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {booking.checkIn} - {booking.checkOut}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600 text-xl">{booking.price}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <HiOutlineHome className="text-4xl mb-3" />
                    <h3 className="font-bold text-lg">Browse Properties</h3>
                    <p className="text-sm text-blue-100 mt-2">Find your next home</p>
                  </button>
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <HiOutlineHeart className="text-4xl mb-3" />
                    <h3 className="font-bold text-lg">View Favorites</h3>
                    <p className="text-sm text-purple-100 mt-2">Saved properties</p>
                  </button>
                  <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <HiOutlineCreditCard className="text-4xl mb-3" />
                    <h3 className="font-bold text-lg">Payment History</h3>
                    <p className="text-sm text-green-100 mt-2">View transactions</p>
                  </button>
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
                <h1 className="text-4xl font-bold text-blue-900 mb-8">My Bookings</h1>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50 border-b border-blue-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Property</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Check-in</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Check-out</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Price</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-50">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={booking.image} alt={booking.property} className="w-16 h-16 rounded-lg object-cover" />
                                <span className="font-semibold text-blue-900">{booking.property}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{booking.location}</td>
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
                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View</button>
                                {booking.status === 'Confirmed' && (
                                  <button className="text-red-600 hover:text-red-700 font-semibold text-sm">Cancel</button>
                                )}
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

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Favorite Properties</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map((property) => (
                    <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="relative h-48">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors">
                          <HiOutlineHeart className="text-2xl fill-current" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">{property.title}</h3>
                        <p className="text-gray-600 flex items-center gap-1 mb-4">
                          <HiOutlineLocationMarker className="text-blue-500" />
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between text-gray-700 mb-4">
                          <div className="flex items-center gap-1">
                            <BiBed className="text-xl" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiBath className="text-xl" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BiArea className="text-xl" />
                            <span>{property.area}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t">
                          <span className="text-2xl font-bold text-blue-600">{property.price}<span className="text-sm text-gray-500">/mo</span></span>
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Payment History</h1>
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50 border-b border-blue-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Transaction ID</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Property</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Method</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-blue-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-50">
                        {payments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm text-gray-600">TXN{payment.id.toString().padStart(6, '0')}</td>
                            <td className="px-6 py-4 font-semibold text-blue-900">{payment.property}</td>
                            <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                            <td className="px-6 py-4 font-bold text-blue-600">{payment.amount}</td>
                            <td className="px-6 py-4 text-gray-700">{payment.method}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Download Receipt</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                        defaultValue={userData.name}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-900 font-semibold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={userData.email}
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
                      <label className="block text-blue-900 font-semibold mb-2">Bio</label>
                      <textarea 
                        rows="4"
                        placeholder="Tell us about yourself..."
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
                      {['Email notifications', 'SMS notifications', 'Push notifications', 'Booking reminders', 'Promotional offers'].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors">
                          <span className="font-semibold text-blue-900">{setting}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
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

export default RenterDashboard;
