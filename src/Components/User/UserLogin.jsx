import axios from "axios";
import "../../assets/Styles/userlogin.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const UserLogin = () => {
  let [userData, setUserData] = useState([]);
  let [bool, setBool] = useState(true);
  let handleBool = () => {
    setBool((prev) => !prev);
  };

  let userApiData = async () => {
    let response = await axios.get("http://localhost:4000/users");
    setUserData(response.data);
  };

  useEffect(() => {
    userApiData();
  }, []);
  // console.log(userData)

  //! collecting all email and password from api data
  let allEmail = userData.map((item) => item.email);
  let allPassword = userData.map((item) => item.password);
  // console.log(allEmail)
  // console.log(allPassword)

  //! collecting input data from form
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let handleInput = (e) => {
    let keyname = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [keyname]: value });
  };

  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    let { email, password } = formData;
    let emailposition = allEmail.indexOf(email);
    console.log(emailposition)
    if (emailposition !== -1) {
      if (allPassword[emailposition] === password) {
        toast.success("Welcome");
        navigate("/userportal");
      } else {
        toast.error("invalid password");
        e.target[1].style.border = "1px solid red";
      }
    } else {
      toast.error("Invalid email");
      let errBorder = "2px solid red";
      e.target[0].style.border = errBorder;
      ErrMsg.current.innerText = "e-mail or password is invalid";
    }
  };

  // let handleSubmit = (e) => {
  //   e.preventDefault();

  //   let { email, password } = formData;

  //   let user = userData.find((item) => item.email === email);

  //   if (user) {
  //     if (user.password === password) {
  //       toast.success("Welcome");
  //       navigate("/userportal");
  //     } else {
  //       toast.error("Invalid password");
  //     }
  //   } else {
  //     toast.error("Invalid email");
  //   }
  // };
  return (
    <>
      <div className="users-Login">
        <div className="formbox">
          <h1>Login Page</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter e-mail..."
              name="email"
              onChange={handleInput}
              value={formData.email}
              required
            />
            <div className="password-box">
              <input
                type={bool ? "password" : "text"}
                placeholder="Enter password..."
                name="password"
                onChange={handleInput}
                value={formData.password}
                required
              />

              <span onClick={handleBool} className="icon">
                {bool ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
            <span></span>
            <button>USER's LOGIN</button>
          </form>
          <Link>Forget Password?</Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
