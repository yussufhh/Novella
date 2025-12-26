// API Service Layer for Novella
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

// ==================== Authentication APIs ====================

export const authAPI = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data = await handleResponse(response);
      
      // Store token and user info
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.user_type);
      }
      
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await handleResponse(response);
      
      // Store token and user info
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.user_type);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders(),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      
      const data = await handleResponse(response);
      
      // Update stored user info
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(passwordData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ==================== Property APIs ====================

export const propertyAPI = {
  // Get all properties with optional filters
  getProperties: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.property_type) queryParams.append('property_type', filters.property_type);
      if (filters.min_price) queryParams.append('min_price', filters.min_price);
      if (filters.max_price) queryParams.append('max_price', filters.max_price);
      if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms);
      
      const url = `${API_BASE_URL}/rentals/properties${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get properties error:', error);
      throw error;
    }
  },

  // Get single property
  getProperty: async (propertyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/properties/${propertyId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get property error:', error);
      throw error;
    }
  },

  // Create new property (owner only)
  createProperty: async (propertyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Create property error:', error);
      throw error;
    }
  },

  // Update property (owner only)
  updateProperty: async (propertyId, propertyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/properties/${propertyId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Update property error:', error);
      throw error;
    }
  },

  // Delete property (owner only)
  deleteProperty: async (propertyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/properties/${propertyId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Delete property error:', error);
      throw error;
    }
  },

  // Get user's properties (owner only)
  getMyProperties: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/my-properties`, {
        headers: getAuthHeaders(),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get my properties error:', error);
      throw error;
    }
  },
};

// ==================== Booking APIs ====================

export const bookingAPI = {
  // Create new booking (renter only)
  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  // Get user's bookings (renter)
  getMyBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/my-bookings`, {
        headers: getAuthHeaders(),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get my bookings error:', error);
      throw error;
    }
  },

  // Get property bookings (owner)
  getPropertyBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/property-bookings`, {
        headers: getAuthHeaders(),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get property bookings error:', error);
      throw error;
    }
  },

  // Update booking status (owner only)
  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rentals/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Update booking status error:', error);
      throw error;
    }
  },
};

// Export default object with all APIs
export default {
  auth: authAPI,
  property: propertyAPI,
  booking: bookingAPI,
};
