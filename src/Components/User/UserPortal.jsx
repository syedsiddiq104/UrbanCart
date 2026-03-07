import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../Product";
import Navbar from "../Navbar";
import Home from "../Home";
import ViewMore from "../ViewMore";
import Users from "../Users";
import CartItems from "../CartItems";

const UserPortal = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Product />} path="/product" />
        <Route element={<ViewMore />} path="/viewmore/:id" />
        <Route  element={<Users />} path='/user' />
        <Route  element={<CartItems />} path='/cartitems' />
      </Routes>
    </>
  );
};

export default UserPortal;
