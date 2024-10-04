import React, { useEffect, useState } from 'react';
import { deleteProperty, getAgent } from '../api/auth';
import Header from './Header';
import Add from './processProperty';
import AddUser from './processUser';
import { notify } from '../utils/toastify';

const PropertyCard = () => {
    const [properties, setProperties] = useState([]);
    const [current, setCurrent] = useState(1);
    const [modalproperty,setmodalproperty] = useState(false);
    const [data,setdata] = useState(null)
    const local = JSON.parse(localStorage.getItem("dat"));
    const userId = local.state.current;

    const fetchProperties = async () => {
        const data = {
            userid: userId,
            current: current,
        };
        const res = await getAgent(data);
        setProperties(res.data.properties);   
        setmodalproperty(false)     
    };
    const refreshProperties = () => {
        fetchProperties();  
    };
    
    const update =(id) =>{
        setmodalproperty(true)
        setdata(properties[id]) 
    }
    const deleteproperty = async(id)=>{
        const data ={PropertyId : id}
        const res = await deleteProperty({data});
        notify(res.data.message)
        fetchProperties();
    }
    const close = () =>{
        setmodalproperty(false)
        setdata()
    }
    useEffect(() =>{
        fetchProperties()
    },[current])
    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div>
            { modalproperty ?
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">         
              <div className="bg-white rounded-lg p-6 shadow-lg relative">
              <button
                    onClick={() => close()}
                    className="text-gray-500 hover:text-gray-700 text-lg font-bold"
                  >
                    &times; {/* X character */}
              </button>
                <Add data={data} type={data ? "update" : ""} refeshFunction={refreshProperties} />
              </div>
            </div>
            : ""}
            <Header/>
            <AddUser/>
            <button            
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 "
                onClick={() => setmodalproperty(true)}
            >add property</button>
            <div className='flex justify-between'>
                {current > 1 && (
                  <button
                    onClick={() => setCurrent(current - 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 "
                  >
                    Prev
                  </button>
                )}
                <p className="text-lg font-semibold">Page {current}</p>
                <button
                  onClick={() => setCurrent(current + 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-5">         
            {properties.map((property,index) => (
                <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden" >
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 m-1" onClick={() => update(index)}>update</button>                    
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 m-1" onClick={() => deleteproperty(property.id)}>delete</button>

                    <img src={property.images[0]} alt="Property" className="w-full h-48 object-cover" />

                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{property.name}</h2>
                        <p className="text-gray-600 mb-4">{property.address}</p>
                        
                        <span className="text-gray-600 font-semibold mb-2">description : {property.description}</span>

                        <p className="text-gray-800 font-semibold mb-2">
                            Price: <span className="text-red-500">₫{property.price}</span>
                        </p>
                        <p className="text-gray-600 mb-2">
                            Size: <span className="font-semibold">{property.size} m²</span>
                        </p>
                        <p className="text-gray-600 mb-4">
                            Status: <span className="font-semibold">{property.status}</span>
                        </p>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Images:</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {property.images.map((image, index) => (
                                <img key={index} src={image} alt={`Property Image ${index + 1}`} className="w-full h-24 object-cover rounded" />
                            ))}
                        </div>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-800">Submissions:</h4>
                            {property.submissions.map((submission, index) => (
                                <div key={index}>
                                    <p className="text-gray-600">User ID: {submission.userId}</p>
                                    <p className="text-gray-600">
                                        Message: <span className="font-semibold">{submission.message || 'No message provided'}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Created At: <span className="font-semibold">{new Date(submission.createdAt).toLocaleDateString()}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default PropertyCard;
