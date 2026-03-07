import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes } from "react-router-dom";
import Home from '../Home';
import Product from '../Product';
import ViewMore from '../ViewMore';
import AddProducts from '../Admin/AddProducts';
import Users from '../Users';
import AddUsers from '../AddUsers';

const AdminPortal = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route  element={<Home />}  path='/'/>
      <Route  element={<Product />} path='/product' />
      <Route element={<ViewMore />} path='/viewmore/:id' />
      <Route  element={<AddProducts />} path='/addproducts' />
      <Route  element={<Users />} path='/user' />
      <Route  element={<AddUsers />} path='/addusers' />
    </Routes>
    </>
  )
}

export default AdminPortal