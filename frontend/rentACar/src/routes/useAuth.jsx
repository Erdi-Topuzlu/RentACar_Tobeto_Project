import { useDispatch, useSelector } from "react-redux";

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// export const useAuth=()=>{
//     const { details} = useSelector((state) => state.userDetail);
//     const isUser = details.role === "USER";
//     const isAdmin = details.role === "ADMIN";
//     if(isUser || isAdmin){
//       return true
//     } else {
//       return false
//     }
//   }

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = localStorage.getItem("role");
  //     const { details} = useSelector((state) => state.userDetail);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const role = () => {
    setUser(roles);
  };

  const value = useMemo(
    () => ({
      role,
    }),
    [roles]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
