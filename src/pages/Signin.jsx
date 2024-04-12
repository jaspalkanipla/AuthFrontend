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

  let err = {};
  const f1 = () => {
    if (Object.keys(data).length > 0) {
      setformError({});
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const validation = () => {
    if (!userEmail) {
      err.euserEmail = "enter Email";
      setformError(err);
    } else if (!userPass) {
      err.euserPass = "enter password";
      setformError(err);
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
              placeholder="Email"
            />
            <span>{euserEmail}</span>
          </div>
          <div className="formGroup">
            <input
              type="password"
              name="userPass"
              value={userPass}
              onChange={handlechange}
              onInput={f1}
              placeholder="Password"
            />
            <span>{euserPass}</span>
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
