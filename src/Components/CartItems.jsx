import axios from "axios";
import "../assets/Styles/CartItem.css";
import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CartCounter from "./CartCounter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  let [cartData, setCartData] = useState([]);
  let recivedData = async () => {
    let response = await axios.get("http://localhost:4000/Mycart");
    let Mycart = response.data;
    setCartData(Mycart);
  };
  useEffect(() => {
    recivedData();
  }, []);
  // console.log(cartData);

  let handleDelete = async (id) => {
    let bool = window.confirm("Do you want to delete item from cart");

    if (bool) {
      await axios.delete(`http://localhost:4000/Mycart/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 1600);
      toast.success("Item deleted from cart");
    } else {
      toast.warning("Item not deleted");
    }
  };
  let navigate = useNavigate();

  let [grandTotal, setGrandTotal] = useState({});
  // console.log(grandTotal);

  let updateGrandTotal = (id, total) => {
    setGrandTotal((prev) => ({
      ...prev,
      [id]: total,
    }));
  };

  let finalTotal = Object.values(grandTotal).reduce((acc, cur) => acc + cur, 0);

  return (
    <>
      <div className="myCart-con">
        <table border={1}>
          <thead>
            <tr>
              <td>Sl no</td>
              <td>Title</td>
              <td>Category</td>
              <td>image</td>
              <td>price</td>
              <td>Quantity & Total</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {cartData.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="empty-cart">
                    <h2>🛒 Your Cart is Empty</h2>
                    <button
                      className="shop-btn"
                      onClick={() => navigate("/userportal/product")}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              cartData.map((item, index) => {
                let { id, title, price, category, image } = item;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{title}</td>
                    <td>
                      <strong>{category.toUpperCase()}</strong>
                    </td>
                    <td className="image">
                      <img src={image} alt={image} />
                    </td>
                    <td>₹ {Math.floor(price * 80)}/-</td>
                    <td>
                      <CartCounter
                        price={price}
                        id={id}
                        setGrandTotal={updateGrandTotal}
                      />
                    </td>

                    <td onClick={() => handleDelete(id)}>
                      <DeleteOutlineIcon className="delete-icon" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <h3>Grand Total : {finalTotal}/-</h3>
      </div>
    </>
  );
};

export default CartItems;
