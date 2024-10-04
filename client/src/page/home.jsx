import React, { useEffect, useState } from 'react';
import { apiCurrent, searchCoditions } from '../api/auth'; // Both APIs
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import RadioDefault from '../component/radio';
import InputDefault from '../component/input';
import { useForm } from 'react-hook-form';
import Header from './Header';

export default function Home() {
  const [dataProperties, setdataProperties] = useState([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const location = useLocation(); // Get the current route
  
  const isSearchPage = location.pathname === '/search'; // Determine if it's the search page
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (!data.size && !data.price && !data.address) {
        return;
      } else {
        const Price = data.price ? data.price.split(',') :"";
        const Size =  data.size ? data.size.split(',') : "";
        const queryParam = {
          minSize: Size ? Size[0] : "",
          maxSize: Size ? Size[1] : "",
          minPrice: Price ? Price[0] : "",
          maxPrice: Price ? Price[1] : "",
          current: current,
          address: data.address || "",
        };        
        const queryParams = new URLSearchParams(queryParam).toString();
        navigate(`/search?${queryParams}`);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect that calls different APIs based on the current page (route)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let res;

        if (isSearchPage) {
          // Call searchConditions API for the search page
          const query = {
            minSize: searchParams.get('minSize'),
            maxSize: searchParams.get('maxSize'),
            minPrice: searchParams.get('minPrice'),
            maxPrice: searchParams.get('maxPrice'),
            address: searchParams.get('address'),
            current: current,
          };
          res = await searchCoditions(query); // Call search API
        } else {
          res = await apiCurrent({ params: { current } });
        }
        
        setdataProperties(res.data.properties);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [current, isSearchPage, searchParams]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Form */}
      <Header/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between border border-gray-300 rounded-lg shadow-md p-4 m-4"
      >
        <RadioDefault
          label="size"
          placeholder="Enter your size"
          option={[
            { label: "4m ->10m", value: [4, 10] },
            { label: "10m ->100m", value: [10, 100] }
          ]}
          register={register}
          error={errors.size}
        />

        <RadioDefault
          label="price"
          placeholder="Enter your price"
          option={[
            { label: "4 triệu -> 5 triệu", value: [4000000, 5000000] },
            { label: "0 -> 3 triệu", value: [0, 3000000] }
          ]}
          register={register}
          error={errors.price}
        />

        <InputDefault
          label="address"
          type="text"
          placeholder="Enter your address"
          register={register}
          error={errors.address}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-6">
        {current > 1 && (
          <button
            onClick={() => setCurrent(current - 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
        )}
        <p className="text-lg font-semibold">Page {current}</p>
        {dataProperties.length > 0 ? <button
          onClick={() => setCurrent(current + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button> : ""}
      </div>

      {/* Property List */}
      
      { dataProperties.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataProperties.map((item) => (
          <Link
            key={item.id}
            to={`house/${item.id}`}
            className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition"
          >
            {/* Display property name */}
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>

            {/* Display images */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>

            {/* Display property details */}
            <p className="text-sm text-gray-500 mb-2">Address: {item.address}</p>
            <p className="text-sm text-gray-500 mb-2">Price: ${item.price}</p>
            <p className="text-sm text-gray-500 mb-2">Size: {item.size} sqft</p>
            <p className="text-sm text-gray-500 mb-2">Status: {item.status}</p>
            <p className="text-sm text-gray-500 mb-2">Last Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
          </Link>
        ))}
      </div> : <p className='text-center'>no have data</p>}
    </div>
  );
}
