import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { addSub, details } from "../api/auth";
import { notify } from "../utils/toastify";

const Detail = () => {
  const { id } = useParams();
  const [properties, setDataProperties] = useState(null);
  const [agent, setAgent] = useState(null);
  const [submissions, setSub] = useState(0);
  const [selectImage, setSelectImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success,setRes] = useState(false)
  const inputRef = useRef(null);
  const fetchData = async () => {
    try {
      const res = await details(id);
      setDataProperties(res.data.properties);
      setAgent(res.data.agent);
      setSub(res.data.submissions);
      setSelectImage(res.data.properties.images[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };
  const addsub = async () =>{
    if (success) {
      return
    }
    const storedState = JSON.parse(localStorage.getItem('dat'));
    const userId = storedState?.state?.current;
    const role = storedState?.state?.role;
    if (role === "agent") {
      notify("can't add because you are agent")
      return
    }
    const data = {
      userid : userId, 
      message : inputRef.current.value,
      propertyid : Number(id)
    }
    try {
      const res = await addSub(data);
      setRes(res.data.success)
    } catch (error) {
      notify(error.response.data.message)
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Property Images */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-extrabold mb-6">{properties.name}</h2>
          {/* Main Selected Image */}
          <img 
            src={selectImage} 
            alt="Selected Property" 
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
          />
          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {properties.images.map((image, index) => (
              <img
                onClick={() => setSelectImage(image)} // Set the selected image on click
                key={index}
                src={image}
                alt={`Property Image ${index + 1}`}
                className={`w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 
                ${selectImage === image ? 'ring-4 ring-blue-500' : ''}`} // Highlight selected image
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="md:col-span-1 bg-white shadow-lg rounded-lg p-6 mt-16">
          <h3 className="text-2xl font-semibold mb-6">Property Details</h3>
          <p className="text-gray-700 mb-4"><strong>Address:</strong> {properties.address}</p>
          <p className="text-gray-700 mb-4"><strong>Price:</strong> ${properties.price.toLocaleString()}</p>
          <p className="text-gray-700 mb-4"><strong>Status:</strong> {properties.status}</p>
          <p className="text-gray-700 mb-4"><strong>Size:</strong> {properties.size} sqm</p>
          <p className="text-gray-700 mb-6"><strong>Description:</strong> {properties.description}</p>
          <p className="text-gray-500"><strong>Last Updated:</strong> {new Date(properties.LaterUpdate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Submissions */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Submissions</h3>
        <p>Total Submissions: {submissions}</p>
      </div>

      {/* Agent Info */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Agent Information</h3>
        <div className="flex items-center space-x-6">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-20 h-20 rounded-full border-2 border-gray-300" 
          />
          <div className="text-gray-700">
            <p className="text-lg"><strong className="text-gray-800">Name:</strong> {agent.name}</p>
            <p className="text-lg"><strong className="text-gray-800">Phone:</strong> {agent.phone}</p>
            <p className="text-lg"><strong className="text-gray-800">Email:</strong> {agent.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Type your message..." 
          className="border rounded-md px-4 py-2 w-full"
        />
        <button 
          onClick={addsub} 
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          {success ? "was success" : "add success"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
