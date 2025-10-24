import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import API from '../../utils/axios';
import useAuth from '../../hooks/useAuth';
const SelectRole = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth(); // No need for fetchUser here

  // helper: map role to dashboard path
  const getDashboardPath = (role) => {
    switch (role) {
      case 'visitor':
        return '/policy';
      case 'agent':
        return '/agent-verification';
      case 'handyman':
        return '/handyman-verification';
      default:
        return '/';
    }
  };

  // The Effect will handle navigation ONLY after user object is stable
  useEffect(() => {
    if (user && !user.isNewUser && user.role) {
      navigate(getDashboardPath(user.role), { replace: true });
    }
  }, [user, navigate]);

  const handleSelect = async (role) => {
    try {
      const res = await API.patch(
        '/auth/set-role',
        { role },
        { withCredentials: true }
      );

      const updatedUser = res.data.user;

      if (!updatedUser) {
        alert('Something went wrong: no user returned');
        return;
      }
      
      // ✅ Update the context. The useEffect will handle navigation.
      updateUser(updatedUser); 
      console.log('✅ Role updated in context:', updatedUser.role);

    } catch (error) {
      console.error('❌ Error setting role:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <img src={logo} alt="Company Logo" className="w-32 h-32 mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-700 text-center">
        Let’s know who you are
      </h2>
      <div className="md:flex grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 justify-center items-center">
  {/* Agent Column */}
  <div className="flex flex-col items-center gap-4">
    <button
      onClick={() => handleSelect('agent')}
      className="px-6 py-3 w-60 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
    >
      I'm an Agent
    </button>
    <button
      onClick={() => handleSelect('agent')}
      className="px-6 py-3 w-60 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
    >
      We are Real Estate Agency
    </button>
  </div>

  {/* Buyer & Renter */}
  <div className="flex flex-col gap-4">
    <button
      onClick={() => handleSelect('visitor')}
      className="px-6 py-3 w-60 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
    >
      I'm a Buyer
    </button>
    <button
      onClick={() => handleSelect('visitor')}
      className="px-6 py-3 w-60 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
    >
      I'm a Renter
    </button>
  </div>

  {/* Service Providers & Professionals */}
  <div className="flex flex-col gap-4">
    <button
      onClick={() => handleSelect('handyman')}
      className="px-6 py-3 w-60 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
    >
      I'm a Service Provider
    </button>
    <button
      onClick={() => handleSelect('handyman')}
      className="px-6 py-3 w-60 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
    >
      I'm a Professional
    </button>
  </div>
</div>

    </div>
  );
};

export default SelectRole;
