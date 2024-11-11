import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const datValue = localStorage.getItem('dat');
  const navigate = useNavigate();
  useEffect(() => {
    if (datValue) {
      const parsedDat = JSON.parse(datValue);
      setUser(parsedDat.state);
    } else {
      console.log("No data found for 'dat'");
    }
  }, [datValue]); 

  const handleNaviagte = () =>{
    if (user.role === "agent") {
      navigate('/agent')
    } else{
      navigate('/user')
    }
  }
  const handleLogout = () => {
    navigate('/login')
    setUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
      <h1 className="text-2xl">rent house</h1>
      <div className="flex items-center cursor-pointer" onClick={() => setIsModalOpen(true)}>
        {user && user.img ? (
          <img src={user.img} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" /> // Placeholder for missing image
        )}
        <span className="text-sm font-semibold text-gray-800">{user ? user.name : 'Guest'}</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Options</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                &times; {/* X character */}
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNaviagte()}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                User
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
