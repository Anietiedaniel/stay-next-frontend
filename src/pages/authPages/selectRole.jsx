import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import API from '../../utils/axios';
import useAuth from '../../hooks/useAuth';

const SelectRole = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const getDashboardPath = (role) => {
    switch (role) {
      case 'visitor':
      case 'agent':
      case 'serviceprovider':
      case 'agency':
      case 'hotel':
      case 'professional':
        return '/policy';
      default:
        return '/';
    }
  };

  useEffect(() => {
    if (user && !user.isNewUser && user.role) {
      navigate(getDashboardPath(user.role), { replace: true });
    }
  }, [user, navigate]);

  const handleSelect = async (role) => {
    try {
      const res = await API.patch('/auth/set-role', { role }, { withCredentials: true });
      const updatedUser = res.data.user;
      if (!updatedUser) return alert('Something went wrong: no user returned');
      updateUser(updatedUser);
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const roleButtons = [
    { label: "I'm an Agent / Landlord", role: 'agent', className: 'bg-green-600 hover:bg-green-700' },
    { label: 'We are Real Estate Company', role: 'agency', className: 'bg-green-500 hover:bg-green-600' },
    { label: "I'm a Buyer / Renter", role: 'visitor', className: 'bg-black hover:bg-gray-800' },
    { label: "I'm a Service Provider", role: 'serviceprovider', className: 'bg-gray-500 hover:bg-gray-600' },
    { label: "I'm a Professional", role: 'professional', className: 'bg-gray-700 hover:bg-gray-800' },
    { label: "We own Hotel / Event Hall", role: 'hotel', className: 'bg-gray-700 hover:bg-gray-800' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <img src={logo} alt="Company Logo" className="w-32 h-32 mb-6" />
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-700 text-center">
        Let’s know who you are
      </h2>

      {/* 2-per-row desktop, stacked mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {roleButtons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(btn.role)}
            className={`w-full py-3 text-white rounded-lg shadow transition ${btn.className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectRole;
