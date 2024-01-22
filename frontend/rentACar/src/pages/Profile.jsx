import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fetchUserData from '../redux/actions/fetchUserData';
import axiosInstance from '../redux/utilities/interceptors/axiosInterceptors';



const Profile = () => {
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.userDetail);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();
  const canAccessPage =  userRoles.includes('USER') || userRoles.includes('ADMIN');

  const decodeJWT = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('JWT çözümlenirken bir hata oluştu:', error);
      return null;
    }
  };
  const handleLogout = async () => {
    try {
    // Çıkış endpoint'i
    const response = await fetch('http://localhost:8080/api/v1/logout');
      console.log(response)
    // Başarılı bir çıkış durumunda, local storage'daki token'ı sil
    if (response.ok) {
      localStorage.removeItem('access_token');
      // Kullanıcıyı login sayfasına yönlendir
      navigate('/login');
    } else {
      console.error('Çıkış işlemi başarısız.');
    }
  } catch (error) {
    console.error('Çıkış işlemi sırasında bir hata oluştu:', error);
  }
  };

console.log("Roles: ", userRoles)
  useEffect(() => {
    // JWT'den yetkilendirme bilgilerini okuma işlemi
    const storedJWT = localStorage.getItem('access_token');
    if (storedJWT) {
      const decodedToken = decodeJWT(storedJWT);
      const id = decodedToken.id;
      console.log("TOken: ",decodedToken)
      if (decodedToken && decodedToken.role) {

        setUserRoles(decodedToken.role);
        dispatch(fetchUserData(id));
      }
    }
  }, [dispatch]);
console.log("Details: ",details)
  
  return (
    <div>

    <h1>Hoşgeldiniz</h1>   
      
    <button onClick={handleLogout}>Çıkış Yap</button>
    {canAccessPage ? (
        <h1>Hoş Geldiniz!{details.name} Bu sayfayı görüntüleyebilirsiniz.</h1>
        
      ) : (
        <h1>Üzgünüz, bu sayfaya erişim izniniz yok.</h1>
      )}

    </div>
  )
}

export default Profile
