// import Axios from "axios";
import Axios from "axios";
import { useEffect, useState } from "react";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    userName: "",
    userEmail: "",
    userPass: "",
  });
  const { userName, userEmail, userPass } = data;
  console.log(data);
  const [formError, setformError] = useState({});
  const { euserName, euserEmail, euserPass } = formError;
  const [buttonstate, setbuttonstate] = useState(false);
  const [borderOutline, setborderOutline] = useState("");

  let err = {};
  const regName = /^[a-zA-Z]+$/;
  const f1 = () => {
    if (Object.keys(data).length > 0) {
      setformError({});
      setborderOutline("");
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  let outlineColor = "1px solid #ba3b3b";
  const validation = () => {
    if (!userName) {
      err.euserName = "Enter Username";
      setformError(err);
      setborderOutline(outlineColor);
    } else if (!regName.test(userName)) {
      err.euserName = "Enter text only";
      setformError(err);
      setborderOutline(outlineColor);
    } else if (!userEmail) {
      err.euserEmail = "Enter Email";
      setformError(err);
      setborderOutline(outlineColor);
    } else if (!userPass) {
      err.euserPass = "Enter Password";
      setformError(err);
      setborderOutline(outlineColor);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validation();
    setbuttonstate(true);
    console.log(buttonstate);
  };
  const ApiRun = async () => {
    try {
      const result = await Axios.post("http://localhost:3000/signup", data);
      console.log(result);
      // setshowStatus(result.status)
      if (result.status === 200) {
        alert("successfully registered now Signin");
        setTimeout(() => {
          navigate("/signin");
        }, 1000 * 3);
      }
    } catch (error) {
      // alert(error.response.data.message);
      err.euserEmail = "Email already exist";
      setformError(err);
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && buttonstate === true) {
      ApiRun();
    }
  }, [buttonstate]);

  //
  return (
    <div className="formWrapper">
      <div className="formCover">
        <div className="formGroup">
          <h2>
            {" "}
            Sign<span>Up</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            {/* <span>{euserName}</span> */}
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handlechange}
              onInput={f1}
              placeholder={euserName ? euserName : "Name"}
              style={euserName ? { outline: borderOutline } : {}}
              className={euserName ? "red-placeholder" : ""}
            />
          </div>
          <div className="formGroup">
            <input
              type="email"
              name="userEmail"
              value={userEmail}
              onChange={handlechange}
              onInput={f1}
              placeholder={euserEmail ? euserEmail : "Email"}
              style={euserEmail ? { outline: borderOutline } : {}}
              className={euserEmail ? "red-placeholder" : ""}
            />
            {/* <span>{euserEmail}</span> */}
          </div>
          <div className="formGroup">
            <input
              type="password"
              name="userPass"
              value={userPass}
              onChange={handlechange}
              onInput={f1}
              placeholder={euserPass ? euserPass : "Password"}
              style={euserPass ? { outline: borderOutline } : {}}
              className={euserPass ? "red-placeholder" : ""}
            />
            {/* <span>{euserPass}</span> */}
          </div>
          <div className="formGroup">
            <button type="submit">Save</button>
          </div>
          <div className="formGroup base">
            Already have an account ?
            <Link className="navLink" to="/signin">
              <span>SignIn</span>
            </Link>
            {""}
          </div>
        </form>
      </div>
    </div>
  );
}
