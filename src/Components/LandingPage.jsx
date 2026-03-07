import React, { useState } from "react";
import "../assets/Styles/landingpage.css";
import AdminLogin from "./Admin/AdminLogin";
import UserLogin from "./User/UserLogin";

const LandingPage = () => {
  let [bool, setBool] = useState(true);
  let handleButton = () => {
    setBool((prev) => !prev);
  };
  return (
    <>
      <div className="landingpage">
        <div className="formbox-con">
          <div className="head">
            <h2>{bool ? "ADMIN LOGIN" : "USER LOGIN"}</h2>
            <div className="btn">
              <button
                onClick={handleButton}
                className={bool ? "left" : "right"}
              >
                {bool ? "ADMIN" : "USER"}
              </button>
            </div>
          </div>
          <>

          
          {bool ? <AdminLogin /> : <UserLogin />}
          </>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
