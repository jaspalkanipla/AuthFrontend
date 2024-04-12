import Axios from "axios";
import { useContext, useEffect } from "react";
import { userContext } from "../context/userContext";
Axios.defaults.withCredentials = true;
export default function Dashboard() {
  const { userData, setuserData, setisAuth } = useContext(userContext);
  const home = async () => {
    const data = await Axios("http://localhost:3000/userDashboard");
    if (data) {
      setuserData(data.data);
      setisAuth(true);
    }
  };
  useEffect(() => {
    home();
  }, []);
  return (
    <div className="formWrapper">
       &nbsp;
      {userData.userName}
      <br />
      {userData.userEmail}
      {}{" "}
    </div>
  );
}
