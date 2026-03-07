import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/Styles/product.css";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

const Product = () => {
  let location = useLocation()
  let bool = location.pathname.startsWith("/adminportal")


  let [products, setProducts] = useState([]);
  let fetchApi = async () => {
    try {
      let ApiData = await axios.get("http://localhost:4000/Products");
      setProducts(ApiData.data);
    } catch (error) {
      console.log("server not found", error);
    }
  };
  // console.log(products);
  useEffect(() => {
    fetchApi();
  }, []);

  let [filterData, setFilter] = useState([]);
  let handleFilter = (e) => {
    let value = e.target.innerText;
    // console.log(value);

    setFilter(
      value === "All"
        ? products
        : products.filter((item) => item.category === value),
    );
  };

  let handleDelete = (id) => {
    // console.log(id)
    let bool = confirm("Do you want to delete ");
    if (bool) {
      axios.delete(`http://localhost:4000/Products/${id}`);
      alert("Product is deleted", id);
      window.location.reload();
    } else {
      alert("Product is not deleted");
    }
  };

  let navigate = useNavigate();
  let handleViewMore = (id) => {
    navigate(`../viewmore/${id}`);
  };
  return (
    <>
      <div className="Product-Con">
        <ul className="category-list">
          <li onClick={handleFilter}> All</li>
          <li onClick={handleFilter}> men's clothing</li>
          <li onClick={handleFilter}> women's clothing</li>
          <li onClick={handleFilter}> electronics</li>
          <li onClick={handleFilter}> jewelery</li>
        </ul>

        {/* <select className="category-list" onChange={handleFilter}>
          <option value="All">All</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
        </select> */}

        <div className="product-grid">
          {(filterData.length === 0 ? products : filterData).map((item) => {
            let { id } = item;
            // console.log(id)
            return (
              <div
                className="products-card"
                key={id}
                onClick={() => handleViewMore(id)}
              >
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p className="price">₹ {Math.floor(item.price * 90)} /-</p>
                <div className="card-btn">
                  <button onClick={() => handleViewMore(id)}>
                    View Details
                  </button>
                  {bool && <button onClick={() => handleDelete(id)}>
                    <DeleteOutlineSharpIcon />
                  </button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
