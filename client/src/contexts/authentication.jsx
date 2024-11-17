import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(prop) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  //make a login to request  //สร้าง Requestไปที่ API Post/Login
  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:3000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken });
      navigate("/");
      alert("เข้าสู่ระบบสำเร็จ");
    } catch (error) {
      console.error("Login Error:", error);
      alert("รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  //register the user  //สร้าง Requestไปที่ API Post/Register
  const register = async (data) => {
    await axios.post("http://localhost:3000/auth/register", data);
    navigate("/login");
    alert("ลงทะเบียนสำเร็จ");
  };

  //clear the token in localstorage and the user data //JWT Token ออกจากLocalstorage
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
}

//hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
