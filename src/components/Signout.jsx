import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import  Axios  from "axios";

export default function Signout() {
    
  const { userData, setuserData, isAuth, setisAuth } = useContext(userContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const data = await Axios.post("http://localhost:3000/signout", null, {
        withCredentials: true,
      });
      if (data.status == 200) {
        setuserData({});
        setisAuth(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    logout();
  }, []);
  return <div></div>;
}
