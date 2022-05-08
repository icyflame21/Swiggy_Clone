import React, { useState, useEffect } from "react";
import Logo from "../Assets/swiggy.svg";
import Arrow from "../Assets/arrow.svg";
import Cart from "../Assets/cart.png";
import Search from "../Assets/search.svg";
import Discount from "../Assets/discount.svg";
import Help from "../Assets/help.svg";
import User from "../Assets/user.png";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isDraweropen, setisDraweropen] = useState(false);
  const [user_signin, setUser_signin] = useState(false);
  const [user_details, setUser_details] = useState(null);
  const [login, setLogin] = useState(true);
  const [signIn, setsignIn] = useState(false);
  const [number, setNumber] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [len, setLen] = useState(0);
  const location = JSON.parse(localStorage.getItem("Location"));
  let cart = JSON.parse(localStorage.getItem("Cart")) || [];
  const navigate =useNavigate()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.name !== "" ) {
      setUser_details(user);
      setUser_signin(true);
      setsignIn(true);
    }    
  }, []);


  useEffect(() => {
    setLen(cart.length);
  }, [cart]);


  

  function handleSubmit(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.number ==="") {
      alert("No user found in Data Base ! Sign in to get Started");
    }
    setLogin(false);
  }
  function handleSignin(e) {
    e.preventDefault();
    let temp = {
      name: name,
      email: email,
      number: number,
    };
    localStorage.setItem("user_details", JSON.stringify(temp));
    alert("Account Created successfully");
    setisDraweropen(false);
    window.location.reload(true);
  }
  let cart_length = JSON.parse(localStorage.getItem("Cart")) || [];
  return (
    <>
      {signIn ? "" : (
        <Drawer
          anchor="right"
          open={isDraweropen}
          onClose={() => {
            setisDraweropen(false);
          }}
        >
          <Box role="presentation" p={4} width="500px">
            <CloseIcon
              className="close_icon"
              onClick={() => {
                setisDraweropen(false);
              }}
              style={{ cursor: "pointer" }}
            />
            {login ? (
              <div className="login_form">
                <div className="left_div">
                  <h2>Login</h2>
                  <p className="link_register">
                    or{" "}
                    <a
                      onClick={() => setLogin(false)}
                      style={{ cursor: "pointer" }}
                    >
                      create an account
                    </a>
                  </p>
                </div>
                <hr className="hr_line_drawer" />
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
                    autoFocus={true}
                    spellCheck="false"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="submit"
                    value="SUBMIT"
                    className="login_btn"
                    onClick={handleSubmit}
                  />
                </form>
                <div className="foot_text">
                  <p>
                    By clicking on Login, I accept the terms & Conditions &
                    Privacy Policy
                  </p>
                </div>
              </div>
            ) : (
              <div className="login_form">
                <div className="left_div">
                  <h2>Sign up</h2>
                  <p className="link_register">
                    or{" "}
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => setLogin(true)}
                    >
                      login to your account
                    </a>
                  </p>
                </div>
                <hr className="hr_line_drawer" />
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
                    autoFocus={true}
                    spellCheck="false"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Name"
                    className="Number_input_1"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="Number_input_1"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="password"
                      name="password"
                    placeholder="Password"
                    className="Number_input"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <br />

                  <input
                    type="submit"
                    value="CONTINUE"
                    className="login_btn"
                    onClick={handleSignin}
                  />
                </form>

                <div className="foot_text">
                  <p>
                    By clicking on Login, I accept the terms & Conditions &
                    Privacy Policy
                  </p>
                </div>
              </div>
            )}
          </Box>
        </Drawer>
      )
        
      }
      <nav className="navbar">
        <img src={Logo} alt="" className="logo" />
        <div className="div1_nav">
          <p className="other">Other</p>
          <div className="location">
            {location} &nbsp;
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
              setisDraweropen(true);
            }}
          >
            <img src={User} alt="" className="user_icon" />
            {user_signin && user_details.name ? user_details.name : "Sign In"}
          </p>
        </div>
        <div className="div6_nav">
          { len!==0? (
            <Link to="/payment" style={{ textDecoration: "none" }}>
              <p className="cart">
                <img src={Cart} alt="" className="cart_icon" />
                Cart
              </p>
            </Link>
          ) : (
            <p className="cart">
              <img src={Cart} alt="" className="cart_icon" />
              Cart
            </p>
          )}
          <span className="cart_num">{ len}</span>
        </div>
      </nav>
    </>
  );
}

export { Navbar };
