import React from 'react'
import { useNavigate } from 'react-router-dom';



const Profile = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div>

    <h1>Hoşgeldiniz</h1>      
    <button onClick={handleLogout}>Çıkış Yap</button>

    </div>
  )
}

export default Profile
