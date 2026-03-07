import React, { useState } from "react";
import "../assets/Styles/addusers.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUsers = () => {
  let [userInput, setUserInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    DOB: "",
  });

  let handleInput = (e) => {
    let keyname = e.target.name;
    let keyvalue = e.target.value;
    // console.log(keyname, keyvalue)
    setUserInput({ ...userInput, [keyname]: keyvalue });
  };

  let navigate = useNavigate();
  let handleSubmit = (e) => {
    e.preventDefault();

    let confirmAdd = confirm(`Do you want to add ${userInput.name} user?`);

    if (confirmAdd) {
        axios.post("http://localhost:4000/users", userInput);
        
        toast.success(`User ${userInput.name} added successfully`);

      navigate("/adminportal/user");
    } else {
      toast.warning("User not added");
    }

    setUserInput({
      name: "",
      phone: "",
      email: "",
      password: "",
      DOB: "",
    });
  };
  return (
    <>
      <div className="users-con">
        <h1>
          ADD <br />USERS
        </h1>
        <div className="adduser-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={userInput.name}
              onChange={handleInput}
              required
            />

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              name="phone"
              value={userInput.phone}
              onChange={handleInput}
              required
            />

            <input
              type="email"
              placeholder="Enter e-mail"
              autoComplete="username"
              name="email"
              value={userInput.email}
              onChange={handleInput}
              required
            />

            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={userInput.password}
              onChange={handleInput}
              required
            />

            <input
              type="date"
              placeholder="Enter DOB"
              name="DOB"
              value={userInput.DOB}
              onChange={handleInput}
              required
            />

            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
