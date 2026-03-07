import React, { useEffect, useState } from "react";
import "../assets/Styles/users.css";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { toast } from "react-toastify";

const Users = () => {
  let [usersData, setUsersData] = useState([]);

  const [showPassword, setShowPassword] = useState({});
  const togglePassword = (index) => {
    setShowPassword((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  let fetchUserApi = async () => {
    let userApiData = await axios.get("http://localhost:4000/users");
    setUsersData(userApiData.data);
  };

  useEffect(() => {
    fetchUserApi();
  }, []);

  const handleDelete = async (id) => {
    let confirmDelete = confirm("Do you want to delete this user?");

    if (confirmDelete) {
      await axios.delete(`http://localhost:4000/users/${id}`);

      // remove deleted user from state
      setUsersData(usersData.filter((user) => user.id !== id));

      toast.success("User deleted successfully");
    }else{
        toast.dark("user not deleted")
    }
  };
  return (
    <>
      <div className="userstable-con">
        <div className="usersTable">
          <table border={1}>
            <thead>
              <tr>
                <th>Sl. no</th>
                <th>Name</th>
                <th>age</th>
                <th>Phone No</th>
                <th>E-mail</th>
                <th>Password</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => {
                let { name, phone, email, password, DOB } = user;
                let age = new Date().getFullYear() - new Date(DOB).getFullYear()
                
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td className="password-cell">
                      {showPassword[index] ? password : "••••••••"}

                      <span
                        className="eye-icon"
                        onClick={() => togglePassword(index)}
                      >
                        {showPassword[index] ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </span>
                    </td>
                    <td>{DOB}</td>
                    <td>
                      <DeleteOutlineSharpIcon
                        className="delete-icon"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
