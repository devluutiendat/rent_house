import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputDefault from '../component/input';
import RadioDefault from '../component/radio';
import { apiRegister, apiSignIn, apiCurrent } from '../api/auth';
import  UserStore  from '../store/userstore';
import InputFileDefault from '../component/file';
import uploadSingleImageToCloudinary from '../utils/upImage';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/toastify';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isRegistering && file) {
        const uploadedImage = await uploadSingleImageToCloudinary(file);
        data.avatar = uploadedImage;
      }

      const apiCall = isRegistering ? apiRegister : apiSignIn;
      const response = await apiCall(data);      
      if (!response.success) {
        UserStore.getState().setToken(response.data.token);
        UserStore.getState().setCurrent(response.data.currentUsers.userId);
        UserStore.getState().setImg(response.data.currentUsers.img);
        UserStore.getState().setRole(response.data.currentUsers.role);
        UserStore.getState().setName(response.data.currentUsers.name);
        navigate('/'); 
      } else {
        console.error('Login error:', response);
      }
    } catch (error) {      
      notify(error.response.data.message)
      console.error('Sign-in error:' );
    } finally {
      setLoading(false);
      reset(); 
    }
  };


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">{isRegistering ? 'Register' : 'Sign In'}</h2>
        
        <div className="flex justify-between mb-4">
          <button type="button" className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => { setIsRegistering(true); reset(); }}>Register</button>
          <button type="button" className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => { setIsRegistering(false); reset(); }}>Sign In</button>
        </div>
        <InputDefault
          label="phone"
          placeholder="Enter your phone"
          type="text"
          validate={{
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{4}[0-9]{3}[0-9]{3}$/,
              message: "Invalid phone"
            }
          }}
          register={register}
          error={errors}
        />

        <InputDefault
          label="password"
          placeholder="Enter your password"
          type="password"
          validate={{
            required: "Password is required",
          }}
          register={register}
          error={errors}
        />

        {isRegistering && (
          <>
            <RadioDefault 
              label="radio"
              option={[
                {label:"agent",value:"agent"},
                {label:"user",value:"user"},
              ]}
              validate={{
                required:"typr is required"
              }}
              register={register}
              error={errors}
            />
            <InputDefault
              label="name"
              placeholder="Enter your name"
              type="text"
              validate={{
                required: "Name is required",
              }}
              register={register}
              error={errors}
            />

            <InputFileDefault
              label="avatar"
              type="file"
              validate={{ required: "Avatar is required" }}
              register={(name, options) =>
                register(name, { ...options, onChange: handleImageChange })
              }
              multiple={false}
              error={errors}
            />

            <InputDefault
              label="email"
              placeholder="Enter your email"
              type="email"
              validate={{
                required: "Email is required",
              }}
              register={register}
              error={errors}
            />
          </>
        )}

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        
        <button type="submit" className="w-full px-4 py-2 mt-4 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">Submit</button>
      </form>
    </div>
  );
}

export default Login;
