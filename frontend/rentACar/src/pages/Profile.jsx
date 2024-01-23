import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../redux/actions/fetchUserData";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import Cookies from 'js-cookie';


const Profile = () => {
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.userDetail);
  const [userRoles, setUserRoles] = useState([]);
  const navigate = useNavigate();
  const canAccessPage =
    userRoles.includes("USER") || userRoles.includes("ADMIN");
  const [token, setToken] = useState("");

  const decodeJWT = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("JWT çözümlenirken bir hata oluştu:", error);
      return null;
    }
  };
  const handleLogout = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      // Çıkış endpoint'i
      const response = await fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        headers: headers,
      });
      // Başarılı bir çıkış durumunda, local storage'daki token'ı sil
      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        // Kullanıcıyı login sayfasına yönlendir
        Cookies.remove("remember-me")
        navigate("/login");
      } else {
        console.error("Çıkış işlemi başarısız.");
      }
    } catch (error) {
      console.error("Çıkış işlemi sırasında bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    // JWT'den yetkilendirme bilgilerini okuma işlemi
    const storedJWT = localStorage.getItem("access_token");
    if (storedJWT) {
      const decodedToken = decodeJWT(storedJWT);
      const id = decodedToken.id;
      setToken(storedJWT);
      if (decodedToken && decodedToken.role) {
        setUserRoles(decodedToken.role);
        dispatch(fetchUserData(id));
      }
    }
  }, [dispatch]);

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
  );
};

export default Profile;
