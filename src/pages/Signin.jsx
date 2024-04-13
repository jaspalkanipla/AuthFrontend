import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/signup.css";
// import Cookies from 'js-cookie';

export default function Signin() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    userEmail: "",
    userPass: "",
  });
  const { userEmail, userPass } = data;
  console.log(data);
  const [formError, setformError] = useState({});
  const { euserEmail, euserPass } = formError;
  const [buttonState, setbuttonState] = useState(false);
  const [borderOutline, setborderOutline] = useState("");


  let err = {};
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
    if (!userEmail) {
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
    setbuttonState(true);
    console.log(buttonState);
  };
  const ApiRun = async () => {
    try {
      const result = await Axios.post("http://localhost:3000/signin", data);
      console.log(result);
      if (result.status === 200) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000 );
      }
      return result;
    } catch (error) {
      err.euserEmail = "Email not exist";
      setformError(err);
      console.log(error);
      console.log(err);
    }
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && buttonState === true) {
      ApiRun();
    }
  }, [buttonState]);
  return (
    <div className="formWrapper">
      <div className="formCover">
        <div className="formGroup">
          <h2>
            {" "}
            Sign<span>In</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">SignIn</button>
          </div>
          <div className="formGroup base">
            Don&apos;t have an account ?
            <Link className="navLink" to="/signup">
              <span>SignUp</span>
            </Link>
            {""}
          </div>
        </form>
      </div>
    </div>
  );
}
