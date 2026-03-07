import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../assets/Styles/viewmore.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { toast } from "react-toastify";

const ViewMore = () => {
  let location = useLocation();
  let bool = location.pathname.startsWith("/userportal");

  let params = useParams();
  // console.log(params.id)
  let productId = params.id;

  let [card, setCard] = useState({});
  let fecthApi = async () => {
    let productData = await axios.get(
      `http://localhost:4000/Products/${productId}`,
    );
    setCard(productData.data);
  };

  useEffect(() => {
    fecthApi();
  }, [productId]);
  // console.log(card)

  let { id, title, price, description, category, image, rating } = card;
  const navigate = useNavigate();

  const handleCart = async (id) => {
    let cartData = await axios.get(`http://localhost:4000/Products/${id}`);

    let AvailableCartData = await axios.get("http://localhost:4000/Mycart");
    let trueData = AvailableCartData.data.map((item) => item.id === id);
    // console.log(trueData)
    let IsAvailable = String(trueData).includes(true)
    // console.log(IsAvailable)

    let bool = window.confirm("Do You want to add to Cart");
    if (bool) {
      if (IsAvailable){
        toast.dark("already Exist");
      } else {
        await axios.post("http://localhost:4000/Mycart", cartData.data);
        toast.success("Cart added successfully");
        navigate("/userportal/cartitems");
      }
    } else {
      toast.error("item Not Added to cart");
    }
  };

  return (
    <>
      <div className="viewmore">
        <button className="Exit" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </button>

        <div className="title">
          <h1>{title}</h1>
        </div>

        <div className="viewmore-con">
          <div className="image">
            <img src={image} alt={title} />
          </div>

          <div className="details">
            <h2>₹ {Math.floor(price * 90)} /-</h2>

            <h4 className="rating">
              <span className="rating-value">
                ⭐ &nbsp; {rating && rating.rate} / 5
              </span>
              <span className="Reviews">({rating && rating.count})</span>
            </h4>

            <div className="para">
              <h4>
                <strong>Category : </strong>
                {category}
              </h4>
              <p>{description}</p>
            </div>

            {bool && (
              <button className="buy-btn" onClick={() => handleCart(id)}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMore;
