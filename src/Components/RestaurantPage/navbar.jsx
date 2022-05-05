import React, { useState } from "react";
import Logo from "../Assets/swiggy.svg";
import Arrow from "../Assets/arrow.svg";
import Cart from "../Assets/cart.png";
import Search from "../Assets/search.svg";
import Discount from "../Assets/discount.svg";
import Help from "../Assets/help.svg";
import User from "../Assets/user.png";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";


import "./navbar.css";
function Navbar() {
  const [isDraweropen, setisDraweropen] = useState(false);
  const [isDrawerRegisterOpen, setisDrawerRegisterOpen] = useState(false);
  return (
    <>
      <Drawer
        anchor="right"
        open={isDraweropen}
        onclose={() => {
          setisDraweropen(false);
        }}
      >
        <Box role="presentation" p={4} width="550px">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              setisDraweropen(false);
            }}
            style={{ cursor: "pointer" }}
          />
          <div className="login_form">
            <div className="left_div">
              <h2>Login</h2>
              <p className="link_register">
                or <a href="">create an account</a>
              </p>
            </div>
            <hr className="hr_line_drawer_nav" />
            <div className="right_div">
              <img
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
                className="food_wrap"
              />
            </div>
            <form>
              <input
                type="number"
                name="Number"
                placeholder="Phone Number"
                className="Number_input"
              />
              <br />

              <input
                type="submit"
                value="LOGIN"
                className="login_btn"
                autoFocus={true}
                spellCheck="false"
              />
            </form>
            <div className="foot_text">
              <p>
                By clicking on Login, I accept the terms & Conditions & Privacy
                Policy
              </p>
            </div>
          </div>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={isDrawerRegisterOpen}
        onclose={() => {
          setisDrawerRegisterOpen(false);
        }}
      >
        <Box role="presentation" p={6} width="400px">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              setisDrawerRegisterOpen(false);
            }}
            style={{ cursor: "pointer" }}
          />
          <div className="login_form">
            <div className="left_div">
              <h2>Sign up</h2>
              <p className="link_register">
                or <a href="">login to your account</a>
              </p>
            </div>
            <hr className="hr_line_drawer_nav" />
            <div className="right_div">
              <img
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
                className="food_wrap"
              />
            </div>
            <form>
              <input
                type="number"
                name="Number"
                placeholder="Phone Number"
                className="Number_input_1"
              />
              <br />
              <input
                type="text"
                name="user_name"
                placeholder="Name"
                className="Number_input_1"
              />
              <br />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="Number_input_1"
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="Number_input"
              />
              <br />

              <input
                type="submit"
                value="CONTINUE"
                className="login_btn"
                autoFocus={true}
                spellCheck="false"
              />
            </form>
            <div className="foot_text">
              <p>
                By clicking on Login, I accept the terms & Conditions & Privacy
                Policy
              </p>
            </div>
          </div>
        </Box>
      </Drawer>

      <nav className="navbar">
        <img src={Logo} alt="" className="logo" />
        <div className="div1_nav">
          <p className="other">Other</p>
          <div className="location">
            Bhubaneswar, Odisha, India &nbsp;
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>
        <div className="div2_nav">
          <p className="search">
            <img src={Search} alt="" className="search_icon" />
            Search{" "}
          </p>
        </div>
        <div className="div3_nav">
          <p className="offers">
            <img src={Discount} alt="" className="discount_icon" />
            Offers <span className="new">NEW</span>{" "}
          </p>
        </div>
        <div className="div4_nav">
          <p className="help">
            <img src={Help} alt="" className="help_icon" />
            Help
          </p>
        </div>
        <div className="div5_nav">
          <p
            className="sign_in"
            onClick={() => {
              setisDrawerRegisterOpen(true);
            }}
          >
            <img src={User} alt="" className="user_icon" />
            Sign In
          </p>
        </div>
        <div className="div6_nav">
          <p className="cart">
            <img src={Cart} alt="" className="cart_icon" />
            Cart
          </p>
        </div>
      </nav>
    </>
  );
}

export { Navbar };
