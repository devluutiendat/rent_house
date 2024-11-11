import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Protected({children}) {
  
  const navigate = useNavigate();
  const storedState = JSON.parse(localStorage.getItem('dat'));
  const token = storedState?.state?.token;
  useEffect(() =>{
    if (!token) {
        navigate('/login')
        return
    }
  },[navigate])
  return (
    <Outlet/>
  )
}
