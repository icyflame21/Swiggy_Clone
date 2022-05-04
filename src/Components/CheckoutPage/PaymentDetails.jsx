import React, { Component } from "react";


export const PaymentDetails = () => {
  return (
    <>
      <div>
        <div className="cart_body">
          <div className="cart_title">
            <div className="image_box">
              <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/fowmgp1wbfubz43hpo4i" />
            </div>
            <div className="image_title">
              <p className="image_titlename">Domino's Pizza</p>
              <p className="address">Milki Mohhalla</p>
              <div className="borderx"></div>
            </div>
          </div>
          <div className="item_count">
            <div className="image_title">
              <p className="item_name">Peppy Paneer</p>
              <p className="Customize">Customize</p>
            </div>

            <div className="button_count">
              <button className="subtract">-</button>
              <p className="count">1</p>
              <button className="add">+</button>
            </div>
            <p className="rupee">&#8377;1200</p>
          </div>
          <button className="applynow">
            &nbsp;&nbsp; &nbsp;&nbsp;Apply Coupon
          </button>
          <p className="billdetails">Bill Details</p>
          <p className="itemdetails">
            Item Total <span className="spams"> &#8377;190</span>
          </p>
          <p className="itemdetails">
            Delivery partner fee <span className="spames"> &#8377;27</span>
          </p>

          <div className="bordertotal"></div>
          <p className="itemdetails">
            Taxes and Charges <span className="spamess"> &#8377;27</span>
          </p>
          <div className="bordertotals"></div>
          <p className="itemdetailes">
            TO PAY
            <span className="spamesss"> &#8377;248</span>
          </p>
        </div>
      </div>
    </>
  );
};
