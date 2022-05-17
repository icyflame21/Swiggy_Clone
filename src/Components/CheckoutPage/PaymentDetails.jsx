import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import Button from "@mui/material/Button";
import "./PaymentDetails.css";
import Veg from "../Assets/veg.jpg";
import NonVegan from "../Assets/NonVeg.jpg";
import { Navbar } from "../RestaurantPage/Navbar";
import { Address } from "./Address";
import Coupoun from "../Assets/coupon.jpg";
import Coupoun_2 from "../Assets/coupon_2.jpg";
import Coupoun_3 from "../Assets/coupon_3.jpg";
export const PaymentDetails = () => {
  const [isDraweropen, setisDraweropen] = useState(false);
  const [couponApplied, isCouponApplied] = useState(false);
  const [discountAmt, isdiscountAmt] = useState(0);
  const [discount_1, isDiscount_1] = useState(30);
  const [discount_2, isDiscount_2] = useState(20);
  const [discount_3, isDiscount_3] = useState(50);
  const [state, setState] = useState([]);

  let total_amount;
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];
    setState(cart);
  }, []);

  const handleChange = (amt) => {
    total_amount = state.map((e) => (e = e.price*e.q)).reduce((a, b) => a + b, 0);
    total_amount = (+total_amount - +total_amount * (amt / 100)).toFixed(2);
    isdiscountAmt(+total_amount);
    isCouponApplied(true);
    setisDraweropen(false);
  };

  const qHandler = (e) => {
    let id=(e.target.parentElement.id)
      let index=-1
      for (let i = 0; i < state.length; i++) {
        if (state[i].id == id) {
          index=i
        }
      }
    let temp = [...state]
      if (e.target.innerHTML === "+") temp[index].q++
      else if (temp[index].q !== 1) temp[index].q--
      else temp.splice(index,1)
      setState(temp)
      localStorage.setItem("Cart", JSON.stringify(temp));
  }
  

  return (
    <>
      <Navbar />
      <Address />
      <Drawer
        anchor="right"
        open={isDraweropen}
        onclose={() => {
          setisDraweropen(false);
        }}
      >
        <Box role="presentation" p={4} width="400px">
          <CloseIcon
            onClick={() => {
              setisDraweropen(false);
            }}
            style={{ cursor: "pointer", position: "absolute", left: "30px" }}
            className="close_address"
          />
          <div className="coupon_img">
            <img src={Coupoun} alt="" />
          </div>
          <div className="button_save">
            {" "}
            <Button
              className="btn_address"
              variant="contained"
              onClick={() => {
                handleChange(discount_1);
              }}
            >
              APPLY
            </Button>
          </div>
          <div className="coupon_img">
            <img src={Coupoun_2} alt="" />
          </div>
          <div className="button_save">
            {" "}
            <Button
              className="btn_address"
              variant="contained"
              onClick={() => {
                handleChange(discount_2);
              }}
            >
              APPLY
            </Button>
          </div>
          <div className="coupon_img">
            <img src={Coupoun_3} alt="" />
          </div>
          <div className="button_save">
            {" "}
            <Button
              className="btn_address"
              variant="contained"
              onClick={() => {
                handleChange(discount_3);
              }}
            >
              APPLY
            </Button>
          </div>
        </Box>
      </Drawer>
      <div>
        <div className="cart_body">
          <div className="cart_title">
            <div className="image_box">
              <img src={JSON.parse(localStorage.getItem("foodId")).img_url} />
            </div>
            <div className="image_title">
              <p className="image_titlename">
                {JSON.parse(localStorage.getItem("foodId")).name}
              </p>
              <p className="address">Delta Square, Baramunda, Delta Square</p>
            </div>
          </div>
          <div className="items_div_parent">
            {state
              ? state.map((e) => (
                  <div className="items_div" id={e.id}>
                    {e.veg ? (
                      <img src={Veg} alt="" className="logo_veg_nonVeg" />
                    ) : (
                      <img src={NonVegan} alt="" className="logo_veg_nonVeg" />
                    )}
                    <p className="product">{e.name}</p>
                    <button className="decrease" onClick={qHandler}>
                      -
                    </button>
                    <p className="value">{e.q}</p>
                    <button className="increase" onClick={qHandler}>
                      +
                    </button>
                    <p className="price">&#8377;{e.price}</p>
                  </div>
                ))
              : ""}
          </div>
          <button
            className="applynow"
            onClick={() => {
              setisDraweropen(true);
            }}
          >
            &nbsp;&nbsp; &nbsp;&nbsp;Apply Coupon&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <p className="billdetails">Bill Details</p>
          <div className="itemdetails">
            <p className="bill_details_user">Item Total</p>
            <p className="amount">
              {" "}
              &#8377;
              {couponApplied
                ? discountAmt
                : state
                    .map((e) => (e = e.price * e.q))
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
            </p>
          </div>
          <div className="itemdetails">
            <p className="bill_details_user">Delivery Fee | 4.6kms</p>
            <p className="amount">
              <strike>&#8377;39.00</strike>&nbsp;&nbsp;FREE
            </p>
          </div>

          <div className="bordertotal"></div>
          <div className="itemdetails">
            <p className="bill_details_user">Taxes and Charges</p>
            <p className="amount">FREE</p>
          </div>
          <div className="total_pay_for_user">
            <p className="amount_tag">TO PAY</p>
            <span className="amount_to_paid">
              {" "}
              &#8377;{" "}
              {couponApplied
                ? discountAmt
                : state
                    .map((e) => (e = e.price*e.q))
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
