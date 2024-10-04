import React, { useEffect, useState, useRef } from 'react';
import { deleteSub, getUser, updateSub } from '../api/auth';
import Header from './Header';
import AddUser from './processUser';
import { notify } from '../utils/toastify';

export default function User() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [message, setMessage] = useState('');
  const storedState = JSON.parse(localStorage.getItem('dat'));
  const id = storedState?.state?.current;

  const fetchUserData = async () => {
    const res = await getUser({ userid: id });
    setData(res.data.sub);
  };

  const updatesub = async () => {
    try {
      await updateSub({ subId: currentId, message })
      setModal(false);      
    } catch (error) {
      notify(error.response.data.message)
    }
    fetchUserData(); // Refresh data after update
  };

  const deletesub = async (subId) => {
    try {
      await deleteSub({subId}); 
    } catch (error) {
      console.log(error);    
     notify(error.response.data.message)
    }
    fetchUserData(); // Refresh data after deletion
  };

  useEffect(() => {
    fetchUserData();
  }, [id]); // Add dependency on `id`

  return (
    <div>
      <Header />
      <AddUser />
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <button
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Update Message</h2>
            <input
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Enter new message'
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />
            <button 
              onClick={updatesub} 
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Update Message
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="space-y-4">
          {data.map(item => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  setCurrentId(item.id);
                  setMessage(item.message); 
                  setModal(true);
                }}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => deletesub(item.id)}
              >
                Delete
              </button>
              <p className="text-gray-800 font-semibold">User ID: {item.userId}</p>
              <p className="text-gray-600">Message: {item.message}</p>
              <p className="text-gray-500 text-sm">Property ID: {item.propertyId}</p>
              <p className="text-gray-400 text-xs">Created At: {new Date(item.createdAt).toLocaleString()}</p>
              <p className="text-gray-400 text-xs">Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
