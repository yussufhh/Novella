import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RenterDashboard from './RenterDashboard';
import OwnerDashboard from './OwnerDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Get user role from localStorage (in production, this would come from auth context/API)
  const userRole = localStorage.getItem('userRole') || 'renter';

  // Render the appropriate dashboard based on user role
  if (userRole === 'owner') {
    return <OwnerDashboard />;
  }
  
  return <RenterDashboard />;
};

export default Dashboard;
