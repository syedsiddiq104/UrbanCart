import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartCounter = ({price, id, setGrandTotal}) => {

  const [count, setCount] = useState(1);


  const handleInc = () => {
    let newval = count + 1
    setCount(newval);
  };

  const handleDcr = async () => {
    if (count > 1) {
      let newval = count - 1
    setCount(newval);
    }else{
    let bool = window.confirm("Do you want to delete item from cart");

    if (bool) {
      await axios.delete(`http://localhost:4000/Mycart/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 1600);
        toast.success("Item deleted from cart");
    } else {
      toast.dark("Item not deleted");
    }

    }
  };

  let total = Math.floor(price * 80) * count;

  useEffect(() => {
    setGrandTotal(id, total);
  }, [count]);
  

  return (
    <>
    <div className="quantity">
     <div className="box">
       <button onClick={handleDcr}>-</button>
      <span>{count}</span>
      <button onClick={handleInc}>+</button>
     </div>
     <hr className="vline"></hr>
      <div className="box">
        <span>Total: ₹ {total}/-</span>
      
      </div>
    </div>
    </>
    
  );
};

export default CartCounter;