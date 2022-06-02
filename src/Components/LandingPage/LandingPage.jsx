import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import LoadingSpinner from "../LoaderSpinner";
import "./LandingPage.css";
import Animation from "./Animation";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import { cities } from "../../data";
import { useNavigate } from "react-router-dom";
import Firebase from "../../Firebase";
let id;
function Card(props) {
  return (
    <>
      <div className="car">
        <div>
          <img
            style={{ width: props.widthy, height: props.heighty }}
            src={props.imgsrc}
          />
        </div>
        <div>
          <h3>{props.texty}</h3>
        </div>
        <div>
          <p>{props.para}</p>
        </div>
      </div>
    </>
  );
}

export function LandingPage() {
  const [isDraweropen, setisDraweropen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);
  const [login, setLogin] = useState(true);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [otp_valid, setOtp_valid] = useState("");
  let navigate = useNavigate();
  let API_KEY = "5bdc9bb5e105da7714d3b4fda20a88c6";

  function check() {
    let user = JSON.parse(localStorage.getItem("user_details"));
    if (!query) {
      document.querySelector(".trip1").style.display = "block";
    } else if (user.name == "" || user.email == "" || user.number == "") {
      alert(
        "You can visit the restaurants page\nYou have to login to place orders"
      );
      navigate("/restaurants");
    } else {
      alert("Welcome to restaurant page");
      navigate("/restaurants");
    }
  }

  useEffect(() => {
    if (!query) return;

    let temp = document.querySelector(".trip1");
    if (temp) temp.style.display = "none";
    id = setTimeout(() => {
      let temp = [];
      let c = 0;
      for (let i = 0; i < cities.length; i++) {
        if (c === 5) break;
        if (cities[i].toLowerCase().includes(query.toLowerCase())) {
          temp.push(cities[i]);
          c++;
        }
      }
      setRes(temp);
    }, 300);
    return () => clearTimeout(id);
  }, [query]);

  function geoLocation() {
    setisLoading(true);
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=en`
      )
        .then((response) => response.json())
        .then((name) => {
          setTimeout(() => {
            let fetch = `${name.city.name}, ${name.city.country}`;
            setQuery(fetch);
            setisLoading(false);
          }, 1000);
        })
        .catch(() => {
          setisLoading(false);
          setQuery("");
        });
    });
  }

  let text = [
    "Game night?",
    "Cooking Gone Wrong?",
    "Late night at office?",
    "Movie marathon?",
    "Unexpected guests?",
    "Hungry?",
  ];
  const [change, setChange] = useState(text[0]);
  useEffect(() => {
    help();
  }, [change]);
  function help() {
    var i = 0;
    setInterval(() => {
      if (i === 6) {
        i = 0;
      }
      if (i < 6) {
        setChange(text[i]);
        i++;
      }
    }, 2000);
  }

  localStorage.setItem("Location", JSON.stringify(query));

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("verificationId"));
    let user = JSON.parse(localStorage.getItem("user_details"));
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

  useEffect(() => {
    setOtp_valid(otp_valid);
  }, [otp_valid]);

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
        alert("Account created successfully Login Now !");
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen(false);
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
            "Verification failed ! \n No User ID found But you can visit the resturants page"
          );
          navigate("/restaurants");
        } else {
          alert("User Verified Success!");
          navigate("/restaurants");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    setOtp(false);
    setisDraweropen(false);
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
      setisDraweropen(true);
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
      setisDraweropen(true);
    }
  };

  return (
    <>
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
                <div id="sign-in-button"></div>
                <input
                  type="number"
                  name="Number"
                  placeholder="Phone Number"
                  className="Number_input"
                  autoFocus={true}
                  spellCheck={false}
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
                  spellCheck={false}
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
            <div className="login_form">
              <div className="left_div">
                <h2>Enter OTP</h2>
              </div>
              <form>
                <input
                  type="number"
                  name="Number"
                  autoFocus={true}
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

      <div
        className="split"
        onClick={() => {
          document.querySelector(".suggestion").style.display = "none";
        }}
      >
        <div className="left">
          <div className="check0">
            <div>
              <img src="https://d1ye2ocuext585.cloudfront.net/images/s/Swiggy_Logo_9.png" />
            </div>

            <div className="hing">
              <div>
                <button
                  id="login"
                  onClick={() => {
                    setLogin(true);
                    setisDraweropen(true);
                  }}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  id="signup"
                  onClick={() => {
                    setLogin(false);
                    setisDraweropen(true);
                  }}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
          <Animation />
          <div className="trip" id="appending">
            <div className="check">
              <input
                className="chinu"
                id="inputt"
                type="text"
                placeholder="Enter your delivery location"
                autoFocus={true}
                spellCheck={false}
                onChange={(e) => setQuery(e.target.value)}
                value={isLoading ? "Fetching your current location..." : query}
              />

              <button className="posey" onClick={geoLocation}>
                <i className="far fa-location" /> Locate Me
              </button>

              <button onClick={check} id="changing" value="toogle_food">
                {isLoading ? <LoadingSpinner /> : "Find Food"}
              </button>
            </div>
          </div>
          <div className="trip1" style={{ display: query ? "" : "none" }}>
            Please add your delivery location
          </div>
          <article
            className="suggestion"
            style={{
              display: query ? "" : "none",
            }}
          >
            {res.map((i, index) => (
              <div
                key={index}
                style={{
                  borderBottom:
                    index === res.length - 1
                      ? "0px"
                      : "1px solid rgb(229, 229, 229)",
                }}
                className="show"
              >
                <p
                  className="city-name show city"
                  onClick={() => {
                    setQuery(i);
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp;{" "}
                  {i}
                </p>
              </div>
            ))}
          </article>
          <div style={{ marginBottom: "40px", marginTop: "50px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "grey" }}>
              POPULAR CITIES IN INDIA
            </h3>
            <div style={{ paddingRight: "15px" }} className="popular alterflex">
              <div style={{ color: "grey" }}>Ahmedabad</div>
              <div style={{ color: "lightgray" }}>Bangalore</div>
              <div style={{ color: "grey" }}>Chennai</div>
              <div style={{ color: "lightgray" }}>Delhi</div>
              <div style={{ color: "grey" }}>Gurgaon</div>
              <div style={{ color: "lightgray" }}>Hyderabad</div>
              <div style={{ color: "grey" }}>Kolkata</div>
              <div style={{ color: "lightgray" }}>Mumbai</div>
              <div style={{ color: "grey" }}>Pune &nbsp;&</div>
              <div style={{ color: "lightgray" }}>more.</div>
            </div>
          </div>
        </div>

        <div className="right">
          <img
            style={{
              width: "755px",
              height: "100%",
              objectFit: "cover",
              objectPosition: "-3px -27px",
            }}
            src="https://web.archive.org/web/20210903175246im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
          />
        </div>
      </div>
      <div className="two">
        <Card
          imgsrc="https://web.archive.org/web/20210903175337im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf"
          widthy="105px"
          heighty="199px"
          texty="No Minimum Order"
          para="Order in for yourself or for the group, with no restrictions on order value"
        />
        <Card
          imgsrc="https://web.archive.org/web/20210903175338im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy"
          widthy="112px"
          heighty="206px"
          texty="Live Order Tracking"
          para="Know where your order is at all times, from the restaurant to your doorstep"
        />
        <Card
          imgsrc="https://web.archive.org/web/20210903175339im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
          widthy="124px"
          heighty="188px"
          texty="Lightning-Fast Delivery"
          para="Experience Swiggy's superfast delivery for food delivered fresh & on time
          "
        />
      </div>
      <div className="three">
        <div className="do">
          <h1>
            Restaurants in
            <br /> your pocket
          </h1>
          <p>
            Order from your favorite restaurants & track on the go, with the
            all-new Swiggy app.
          </p>
          <div className="do1">
            <a href="https://play.google.com/store/apps/details?id=in.swiggy.android">
              <img
                style={{ height: "54px" }}
                src="https://web.archive.org/web/20210903175340im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp"
              />
            </a>
            <a href="https://itunes.apple.com/in/app/swiggy-food-order-delivery/id989540920">
              <img
                style={{ height: "54px" }}
                src="https://web.archive.org/web/20210903175341im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty"
              />
            </a>
          </div>
        </div>
        <div className="do2">
          <div>
            <img
              className="set"
              src="https://web.archive.org/web/20210903175342im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n"
              alt=""
            />
          </div>
          <div>
            <img
              className="set1"
              src="https://web.archive.org/web/20210903175343im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer2 />
      <footer>
        <img
          className="footer_logo"
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza"
          width="200px"
          height="60px"
        />
        <p style={{ color: "white", fontSize: "21px" }}>&copy; 2022 Swiggy</p>
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="icons"
        >
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-facebook_tfqsuc"
            width="24"
            height="24"
          />
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-pinterest_kmz2wd"
            width="24"
            height="24"
          />
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-instagram_b7nubh"
            width="24"
            height="24"
          />
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-twitter_gtq8dv"
            width="24"
            height="24"
          />
        </div>
      </footer>
    </>
  );
}
