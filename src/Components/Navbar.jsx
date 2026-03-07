import React, { useEffect, useState } from "react";
import "../assets/Styles/navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/Images/Logo/image.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Navbar = () => {
  let location = useLocation();
  // console.log(location.pathname)

  let bool = location.pathname.startsWith("/adminportal");
  // console.log(bool)

  const [menuOpen, setMenuOpen] = useState(false);
  let handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  // console.log(menuOpen)

  useEffect(() => {
  const closeMenu = () => setMenuOpen(false);

  if(menuOpen){
    document.addEventListener("click", closeMenu);
  }

  return () => document.removeEventListener("click", closeMenu);
}, [menuOpen]);
  return (
    <>
      <div className="Mynavbar">
        <div className="logo">
          <img src={logo} alt="SYED SIDDIQ" />
        </div>
        <div className={`links ${menuOpen ? "active" : ""}`}>
          {bool ? (
            <ul>
              <li>
                <NavLink to="/adminportal" end>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/adminportal/product">PRODUCTS</NavLink>
              </li>
              <li>
                <NavLink to="/adminportal/addproducts">ADD PRODUCTS</NavLink>
              </li>
              <li>
                <NavLink to="/adminportal/user">USER</NavLink>
              </li>
              <li>
                <NavLink to="/adminportal/addusers">ADD USERS</NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <NavLink to="/userportal" end>
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/userportal/product">PRODUCTS</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="logout">
          {
            bool ? <></>
          :
            <NavLink to={"/userportal/cartitems"}>
            <button className="Cart">
              <AddShoppingCartIcon />
            </button>
          </NavLink>
          }
          <h4>
            <NavLink to={"/"}>
              <button className="bn9">
                <span>LOGOUT</span>
              </button>
            </NavLink>
          </h4>
        </div>

        <div
          className="hamburger"
          onClick={(e) => {
            e.stopPropagation();
            handleNav();
          }}
        >
          ☰
        </div>
      </div>
    </>
  );
};

export default Navbar;
