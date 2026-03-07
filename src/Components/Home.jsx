import { useLocation, useNavigate } from "react-router-dom";
import "../assets/Styles/home.css";
// import img1 from "../assets/Images/HomeImages/image copy 5.png";
// import img2 from "../assets/Images/HomeImages/image copy 2.png";
// import img3 from "../assets/Images/HomeImages/image copy 4.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  let location = useLocation();
  // console.log(location.pathname)

  let bool = location.pathname.startsWith("/adminportal");
  let navigate = useNavigate();

  let navigateProducts = () => {
    navigate(bool ? "/adminportal/product" : "/userportal/product");
  };

  let [productData, setProductData] = useState([]);
  const fetchProductsData = async () => {
    let response = await axios.get(`http://localhost:4000/Products`);
    // console.log(response.data);
    setProductData(response.data.slice(0,4));
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const onclickFeature = (id) => {
    navigate( `../viewmore//${id}`)
  }
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Timeless Elegance</h1>
          <p>Curated collections crafted for modern sophistication.</p>
          <button
            onClick={() =>
              navigate(bool ? "/adminportal/product" : "/userportal/product")
            }
          >
            Explore Collection
          </button>
        </div>
      </section>

      <section className="categories">
        <h2 className="section-title">Shop By Category</h2>

        <div className="category-grid">
          <div className="category-card men" onClick={navigateProducts}>
            <span>Men</span>
          </div>

          <div className="category-card women" onClick={navigateProducts}>
            <span>Women</span>
          </div>

          <div className="category-card jewellery" onClick={navigateProducts}>
            <span>Jewellery</span>
          </div>

          <div className="category-card accessories" onClick={navigateProducts}>
            <span>Accessories</span>
          </div>
        </div>
      </section>

      {/* <section className="featured">
        <h2 className="section-title">Featured Pieces</h2>

        <div className="product-grid">

          <div className="product-card">
            <img
              src={img3}
              alt="Beige Coat"
            />
            <h3>Classic Beige Coat</h3>
            <p>$120</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img
              src={img1}
              alt="Black Dress"
            />
            <h3>Elegant Black Dress</h3>
            <p>$150</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img
              src={img2}
              alt="Gold Necklace"
            />
            <h3>Minimal Gold Necklace</h3>
            <p>$80</p>
            <button>Add to Cart</button>
          </div>

        </div>
      </section> */}

      <section className="featured">
        <h2 className="section-title">Featured Pieces</h2>

        <div className="product-grid" >
          {productData.map((items) => {
            let { id, image, title, price } = items;

            return (
              <div className="product-card" key={id} onClick={() => onclickFeature(id)}>
                <img src={image} alt={title} />
                <h3>{title}</h3>
                <p>{price}</p>
                <button>View More</button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="promo">
        <h2>New Season Arrivals</h2>
        <p>Elevated silhouettes for effortless sophistication.</p>
        <button onClick={navigateProducts}>Shop Now</button>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="foot-box">
            <h3>FashionStore</h3>
            <p>
              Premium fashion curated for timeless style and modern elegance.
              Designed for people who value quality and sophistication.
            </p>
          </div>

          <div className="foot-box">
            <h3>Quick Links</h3>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Jewellery</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div className="foot-box">
            <h3>Customer Service</h3>
            <ul>
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="foot-box">
            <h3>Contact</h3>
            <p>Email: support@fashionstore.com</p>
            <p>Phone: +91 12345 67890</p>
            <div className="socials">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 FashionStore. All rights reserved. <br />
            <br /> Design & Developed By - <strong>Syed Siddiq</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
