import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import Button from "@mui/material/Button";
import "./Address.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/swiggy.svg";
import Firebase from "../../Firebase";
let data = ["1234 5678 1764 5678", "Biswaranjan Subudhi", "10/25", "123"];

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const Address = () => {
  const [isDraweropen, setisDraweropen] = useState(false);
  const [address_add, setAddress_add] = useState(false);
  const [address_add_status, setAddress_add_status] = useState(false);
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [check, setCheck] = useState(false);
  const [payment, setPayment] = useState(false);
  const [time, isTime] = useState("");
  const [check_value, setCheck_value] = useState("");
  const [inp, setInp] = useState(data);
  const [isLogin_user, setIsLogin_user] = useState(false);
  const [login, setLogin] = useState(true);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDraweropen_login, setisDraweropen_login] = useState(false);
  const [otp, setOtp] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [otp_valid, setOtp_valid] = useState("");
  const [user_verified, setUser_verified] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("https://meeshodb.herokuapp.com/razorpay", {
      method: "POST",
      body: JSON.stringify({
        amount: localStorage.getItem("total") || 100,
      }),
    }).then((t) => t.json());
    let t = JSON.stringify(localStorage.getItem("total")) || 100;
    const options = {
      key: "rzp_test_OnubQmqY8GahSs",
      currency: data.currency,
      amount: t * 100,
      order_id: data.id,
      name: "Swiggy",
      description: "Thank you for Ordering",
      image: "https://images2.imgbox.com/45/f9/i5AetHvK_o.jpg",
      handler: function (response) {
        alert("Payment request was successfull !!");
      },
      prefill: {
        name: "Biswaranjan Subudhi",
        email: "biswaranjan.cuh@gmail.com",
        phone_number: "9090538595",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    navigate("/thankyou");
  };

  const handleSaveAddress = () => {
    isTime(JSON.parse(localStorage.getItem("foodId")));
    setAddress_add(true);
    setAddress_add_status(true);
    setisDraweropen(false);
  };

  useEffect(() => {
    setAddress(address);
    setCheck_value(check_value);
    setCheck(check);
    localStorage.setItem("Address", JSON.stringify(address));
    if (check) {
      localStorage.setItem("Address_Type", JSON.stringify(check_value));
    }
  }, [address, check_value, check]);

  const handlePayment = () => {
    let div_1 = document.querySelector("#add_address_user_section");
    let div = document.querySelector("#save_address");
    div_1.style.display = "none";
    div.classList.add("btn_address_new");
    div.innerText = "SAVED";
    setPayment(true);
  };

  const changeHandler = (e) => {
    let newInp = [...inp];
    let { id, value } = e.target;
    newInp[+id] = value;
    setInp(newInp);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      setLocation(success.coords);
    });
    let userCheck = JSON.parse(localStorage.getItem("user_details"));
    if (userCheck.name === "") {
      setIsLogin_user(true);
    }
    let user_address_local = JSON.parse(localStorage.getItem("Address"));
    let user_address_type_local = JSON.parse(
      localStorage.getItem("Address_Type")
    );
    isTime(JSON.parse(localStorage.getItem("foodId")));
    if (user_address_local !== "" || user_address_type_local !== "") {
      setisDraweropen(false);
      setAddress_add_status(true);
    }
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    if (user_details.name === "") {
      setUser_verified(true);
    }
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_details"));
    let id = JSON.parse(localStorage.getItem("verificationId"));
    if (
      user.name == "" ||
      user.email == "" ||
      user.number == "" ||
      id.verificationId == ""
    ) {
      let temp = {
        name: name,
        email: email,
        number: number,
      };
      localStorage.setItem("user_details", JSON.stringify(temp));
    }
  }, [name, email, number]);

  // Firebase OTP Authentication
  function handleSubmit_Otp_sigin(e) {
    e.preventDefault();
    const code = otp_valid;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        setVerificationId(user.uid);
        localStorage.setItem("verificationId", JSON.stringify(user.uid));
        alert("Account created successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen_login(false);
  }

  function handleSubmit_Otp_login(e) {
    e.preventDefault();
    const code = otp_valid;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        let id = JSON.parse(localStorage.getItem("verificationId"));
        if (id !== user.uid) {
          alert(
            "Verification failed ! To Place the Order account must be verified"
          );
        } else {
          alert("User Verified Success!");
          window.location.reload(true);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen_login(false);
  }

  const configureCaptcha_signIn = () => {
    window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          onSigninSubmit();
          alert("Recaptcha verified");

        },
        defaultCountry: "IN",
      }
    );
  };

  const configureCaptcha_login = () => {
    window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {
          onLogInSubmit();
          alert("Recaptcha verified");

        },
        defaultCountry: "IN",
      }
    );
  };

  const onSigninSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.name !== "" || user.email !== "" || user.number !== "") {
      configureCaptcha_signIn();
      const phoneNumber = "+91" + number;
      const appVerifier = window.recaptchaVerifier;
      Firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          alert("OTP Sent Successfully !");
        })
        .catch((error) => {
          alert(error.message);
        });
      setOtp(true);
      setisDraweropen_login(true);
    }
  };

  const onLogInSubmit = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (user.number !== "") {
      configureCaptcha_login();
      const phoneNumber = "+91" + number;
      const appVerifier = window.recaptchaVerifier;
      Firebase.auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          alert("OTP Sent Successfully !");
        })
        .catch((error) => {
          alert(error.message);
        });
      setOtp(true);
      setisDraweropen_login(true);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={isDraweropen_login}
        onClose={() => {
          setisDraweropen_login(false);
        }}
      >
        <Box role="presentation" p={4} width="500px">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              setisDraweropen_login(false);
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
                <div id="sign-in-button"></div>
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
                  value="CONTINUE"
                  className="login_btn"
                  onClick={onLogInSubmit}
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
                <div id="sign-in-button"></div>
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
                  onClick={onSigninSubmit}
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

      {otp ? (
        <Drawer
          anchor="right"
          open={isDraweropen_login}
          onClose={() => {
            setisDraweropen_login(false);
          }}
        >
          <Box role="presentation" p={4} width="500px">
            <CloseIcon
              className="close_icon"
              onClick={() => {
                setisDraweropen_login(false);
              }}
              style={{ cursor: "pointer" }}
            />
            <div className="login_form">
              <div className="left_div">
                <h2>Enter OTP</h2>
              </div>
              <form>
                <input
                  type="number"
                  name="Number"
                  placeholder="Enter the OTP"
                  className="Number_input"
                  value={otp_valid}
                  onChange={(e) => {
                    setOtp_valid(e.target.value);
                  }}
                />
                <br />
                <input
                  type="submit"
                  value="SUBMIT"
                  className="login_btn"
                  onClick={
                    login ? handleSubmit_Otp_login : handleSubmit_Otp_sigin
                  }
                />
              </form>
              <div className="foot_text">
                <p>
                  By clicking on Login, I accept the terms & Conditions &
                  Privacy Policy
                </p>
              </div>
            </div>
          </Box>
        </Drawer>
      ) : (
        ""
      )}

      <div className="main_div_user">
        {isLogin_user ? (
          <div className="login_div">
            Login / Register <br />
            <Button
              className="btn_address"
              variant="contained"
              onClick={() => {
                setLogin(true);
                setisDraweropen_login(true);
              }}
            >
              LOGIN / REGISTER
            </Button>
          </div>
        ) : (
          ""
        )}

        <Drawer
          anchor="left"
          open={isDraweropen}
          onclose={() => {
            setisDraweropen(false);
          }}
        >
          <Box role="presentation" p={4} width="400px" className="address_box">
            <CloseIcon
              onClick={() => {
                setisDraweropen(false);
              }}
              style={{ cursor: "pointer", position: "absolute", right: "30px" }}
              className="close_address"
            />
            <iframe
              width="400px"
              height="400px"
              src={`https://api.mapbox.com/styles/v1/nifty658/cl2tg7el3002l14pelopffxie.html?title=false&access_token=pk.eyJ1IjoibmlmdHk2NTgiLCJhIjoiY2wydDB2eW8wMDQ2bTNrazQybHdpaGd1MyJ9.Zu_154GZs6sdRHr1Og6V8g&zoomwheel=true#10/${location.latitude}/${location.longitude}`}
              title="Streets"
              style={{ border: "none", marginTop: "50px", borderRadius: "7px" }}
            ></iframe>

            <div className="input_address">
              <input
                type="text"
                className="add_address"
                placeholder="Add Address"
                value={address}
                spellCheck="false"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className="div_checkbox_address">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="Home"
                  value="Home"
                  className="check"
                  onChange={(e) => {
                    setCheck(e.target.checked);
                    setCheck_value(e.target.value);
                  }}
                />
                <span className="check_Box">&nbsp;Home</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="Default"
                  value="Default"
                  className="check"
                  onChange={(e) => {
                    setCheck(e.target.checked);
                    setCheck_value(e.target.value);
                  }}
                />
                <span className="check_Box">&nbsp;Default</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="Office"
                  value="Office"
                  className="check"
                  onChange={(e) => {
                    setCheck(e.target.checked);
                    setCheck_value(e.target.value);
                  }}
                />
                <span className="check_Box">&nbsp;Office</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="button_save">
              {" "}
              <Button
                className="btn_address"
                variant="contained"
                onClick={handleSaveAddress}
              >
                Save Address
              </Button>
            </div>
          </Box>
        </Drawer>
        {user_verified ? (
          ""
        ) : (
          <div className="address_div">
            Address <br />
            {address_add || address_add_status ? (
              <div className="user_address">
                <h2>{JSON.parse(localStorage.getItem("Address_Type"))}</h2>
                <p>{JSON.parse(localStorage.getItem("Address"))}</p>
                <p style={{ fontWeight: "600" }}> {time.average_time} MINS</p>
              </div>
            ) : (
              ""
            )}
            <Button
              id="add_address_user_section"
              className="btn_address"
              variant="contained"
              onClick={() => {
                setisDraweropen(true);
              }}
            >
              {!address_add && !address_add_status
                ? "Add New Address"
                : "Edit Address"}
            </Button>
            {address_add_status ? (
              <Button
                className="btn_address"
                id="save_address"
                variant="contained"
                onClick={handlePayment}
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </div>
        )}

        <div className="payment_div">
          Payment <br />
          {payment ? (
            <div class="wrapper">
              <div class="checkout_wrapper">
                <div class="product_info">
                  <img src={Logo} alt="product" />
                  <div class="content_info">
                    <h3>
                      Enjoy your <br />
                      &nbsp;&nbsp;Food
                    </h3>
                  </div>
                </div>
                <div class="checkout_form">
                  <p>Enter Your Card Details</p>
                  <div class="details">
                    <div class="section">
                      <input
                        type="text"
                        id="0"
                        placeholder="Card Number"
                        value={inp[0]}
                        onChange={changeHandler}
                      />
                    </div>
                    <div class="section">
                      <input
                        type="text"
                        id="1"
                        placeholder="Cardholder Name"
                        value={inp[1]}
                        onChange={changeHandler}
                      />
                    </div>
                    <div class="section last_section">
                      <div class="item">
                        <input
                          type="text"
                          id="2"
                          placeholder="Expiry Date"
                          value={inp[2]}
                          onChange={changeHandler}
                        />
                      </div>
                      <div class="item">
                        <input
                          type="text"
                          id="3"
                          placeholder="CVV"
                          value={inp[3]}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div class="btn">
                      <a onClick={handleClick}>Pay Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
