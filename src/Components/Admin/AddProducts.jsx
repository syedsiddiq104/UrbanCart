import React, { useState } from "react";
import "../../assets/Styles/addproducts.css";
import axios from "axios";

const AddProducts = () => {
  let [newProducts, setNewProducts] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  let handleInput = (e) => {
    let keyname = e.target.name;
    let keyvalue = e.target.value;

    if (keyname === "rate" || keyname === 'count') {
      setNewProducts({
        ...newProducts,
        rating: {
          ...newProducts.rating,
          [keyname]: keyvalue,
        },
      });
    } else {
      setNewProducts({ ...newProducts, [keyname]: keyvalue });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProducts);
    axios.post("http://localhost:4000/Products", newProducts);

    setNewProducts({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
      rating: {
        rate: "",
        count: "",
      },
    });
  };

  return (
    <div className="addproducts-con">
      <h1>ADD <br /> PRODUCTS</h1>
      <div className="addProducts">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            onChange={handleInput}
            name="title"
            value={newProducts.title}
          />
          <input
            type="number"
            placeholder="Enter price in $"
            onChange={handleInput}
            name="price"
            value={newProducts.price}
          />
          <input
            type="text"
            placeholder="Enter description"
            onChange={handleInput}
            name="description"
            value={newProducts.description}
          />
          <input
            type="text"
            placeholder="Enter category"
            onChange={handleInput}
            name="category"
            value={newProducts.category}
          />
          <input
            type="text"
            placeholder="Enter image URL"
            onChange={handleInput}
            name="image"
            value={newProducts.image}
          />
          <input
            type="number"
            placeholder="Enter rating"
            min={0}
            max={5}
            onChange={handleInput}
            name="rate"
            value={newProducts.rating.rate}
          />
          <input
            type="number"
            placeholder="Enter count"
            onChange={handleInput}
            name="count"
            value={newProducts.rating.count}
          />
          <button type="submit">ADD PRODUCTS</button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
