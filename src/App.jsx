import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navb from "./components/Navb";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import "./App.css";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { userContext } from "./context/userContext";
import { useState } from "react";
import Signout from "./components/Signout";
import ErrorPage from "./pages/ErrorPage";
export default function App() {
  const [userData, setuserData] = useState({});
  const [isAuth, setisAuth] = useState(false);

  return (
    <div>
      <userContext.Provider
        value={{ userData, setuserData, isAuth, setisAuth }}
      >
        <Router>
          <Navb />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
    
  );
}
