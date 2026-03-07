import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const AdminLogin = () => {
  let [bool, setBool] = useState(true);
  let handleBool = () => {
    setBool((prev) => !prev);
  };

  let [formData, setFormData] = useState({ email: "", password: "" });

  let ErrMsg = useRef("");
  let navigate = useNavigate();

  let handleInput = (e) => {
    let keyname = e.target.name;
    let keyvalue = e.target.value;
    // console.log(keyname, keyvalue)
    setFormData({ ...formData, [keyname]: keyvalue });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)

    // ! collecting data from input field
    let { email, password } = formData;

    // ! creating admin credentials
    let credentials = {
      adminMail: "admin@gmail.com",
      adminpassword: "Admin@123",
    };
    let { adminMail, adminpassword } = credentials;

    if (email === adminMail && password === adminpassword) {
      navigate("/adminportal");
      toast.success("login successfully")
    } else {
      let errBorder = "2px solid red";
      e.target[0].style.border = errBorder;
      e.target[1].style.border = errBorder;
      ErrMsg.current.innerText = "e-mail or password is invalid";
      toast.error("login failed")
    }
    
    setFormData({ ...formData, email: "", password: "" });
  };
  return (
    <>
      <div className="admin-login">
        <div className="formbox">
          <h1>Login Page</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter e-mail..."
              onChange={handleInput}
              name="email"
              value={formData.email}
            />
            <div className="password-box">
              <input
                type={bool ? "password" : "text"}
                placeholder="Enter password..."
                onChange={handleInput}
                name="password"
                value={formData.password}
              />

              <span onClick={handleBool} className="icon">
                {bool ? <VisibilityIcon/> : <VisibilityOffIcon />}
              </span>
            </div>
            <span
              style={{ color: "red", textAlign: "center" }}
              ref={ErrMsg}
            ></span>
            <button>ADMIN LOGIN</button>
          </form>
          <Link >Forget Password?</Link>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
