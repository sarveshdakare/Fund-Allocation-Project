// RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate= useNavigate();

  const handleSelection = (role) => {
    navigate(`/${role}/signin`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-8">Select Your Role</h1>
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleSelection('user')}
        >
          User
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => handleSelection('admin')}
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
