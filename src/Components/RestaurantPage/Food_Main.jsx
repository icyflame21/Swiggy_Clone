import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Food_Main.css";
import { data } from "../../restaurantData";
import Discount from "../Assets/discount.svg";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Box } from "@mui/material";
import { Navbar } from "./Navbar";
import ScrollToTop from "react-scroll-to-top";
import { useWindowScroll } from "react-use";
import { useNavigate } from "react-router-dom";
import { PreLoader } from "../PreLoader";
const Img = styled.img`
  cursor: pointer;
  display: block;
  marginright: 20px;
  width: 250px;
  objectfit: contain;
  height: 250px;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    backface-visibility: visible;
  }
`;

const Wrapper = styled.header`
  max-width: 100vw;
  margin-top: 90px;
  background: #171a29;
`;
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  lazyLoading: "progressive",
  useCSS: true,
};
function Food_Main() {
  const navigate = useNavigate();
  // Preloader Fake Promise
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 3000);
  }, []);

  
  const handleClick = (id) => {
    localStorage.setItem("foodId", JSON.stringify(data[+id]));
    navigate(`/food/${id}`);
  };

  const [foodItems, setfoodItems] = useState([]);
  const [isDraweropen, setisDraweropen] = useState(false);

  useEffect(() => {
    setfoodItems(data);
  }, []);

  const { x, y } = useWindowScroll();
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrolled((y / height) * 100);
  }, [y]);

  const sortingLinks = (e) => {
    let btns = e.currentTarget.querySelectorAll("p");
    btns.forEach((btn) => {
      if (btn.innerHTML === e.target.innerHTML)
        btn.classList.add("active_link");
      else btn.classList.remove("active_link");
    });
    let newArr = [...foodItems];
    if (e.target.innerHTML === "Delivery Time") {
      newArr.sort((a, b) => a.average_time - b.average_time);
    } else if (e.target.innerHTML === "Cost: Low To High") {
      newArr.sort((a, b) => a.average_cost - b.average_cost);
    } else if (e.target.innerHTML === "Cost: High To Low") {
      newArr.sort((a, b) => b.average_cost - a.average_cost);
    } else if (e.target.innerHTML === "Rating") {
      if (newArr.rating == "N/A") {
        newArr.rating = 0;
      }
      newArr.sort((a, b) => b.rating - a.rating);
    }
    setfoodItems(newArr);
  };

  const clear_btn = () => {
    let inputs = document.querySelectorAll(".check");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };
  window.document.onload = function () {
    window.document.addEventListener("load", clear_btn, true);
  };
  const showRestaurants = () => {
    let foodForm = document.getElementById("foodForm");
    let checkBoxes = foodForm.querySelectorAll('input[type="checkbox"]');
    let result = [];
    checkBoxes.forEach((item) => {
      if (item.checked) {
        result.push(item.value.toLowerCase());
      }
    });
    let array = [],
      resturantId = [];
    for (var i = 0; i < data.length; i++) {
      let cuisines = data[i].cuisines;
      for (var j = 0; j < cuisines.length; j++) {
        if (
          result.includes(cuisines[j].toLowerCase().trim()) &&
          !resturantId.includes(data[i].id)
        ) {
          array.push(data[i]);
          resturantId.push(data[i].id);
        }
      }
    }
    setfoodItems(array);
    setisDraweropen(false);
  };
  return loading ? (
    <PreLoader />
  ) : (
    <>
      <div className="scroll-container">
        <div className="indicator" style={{ width: `${scrolled}%` }}></div>
      </div>{" "}
      <ScrollToTop smooth color="#fc8019" />
      <Navbar />
      <Drawer
        anchor="right"
        open={isDraweropen}
        onClose={() => {
          setisDraweropen(false);
        }}
      >
        <Box role="presentation" p={6} width="500px">
          <CloseIcon
            className="close_icon"
            onClick={() => {
              setisDraweropen(false);
            }}
            style={{ cursor: "pointer" }}
          />
          <span className="h2">&nbsp;Filters</span>
          <div className="cuisines" id="foodForm">
            <div className="cuisine_1">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="american"
                  value="american"
                  className="check"
                />
                <span className="check_Box">&nbsp;American</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="bakery"
                  value="bakery"
                  className="check"
                />
                <span className="check_Box">&nbsp;Bakery</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_2">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="bengali"
                  value="bengali"
                  className="check"
                />
                <span className="check_Box">&nbsp;Bengali</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="beverages"
                  value="beverages"
                  className="check"
                />
                <span className="check_Box">&nbsp;Beverages</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_3">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="biryani"
                  value="biryani"
                  className="check"
                />
                <span className="check_Box">&nbsp;Biryani</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="chinese"
                  value="chinese"
                  className="check"
                />
                <span className="check_Box">&nbsp;Chinese</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_4">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="combo"
                  value="combo"
                  className="check"
                />
                <span className="check_Box">&nbsp;Combo</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="continental"
                  value="continental"
                  className="check"
                />
                <span className="check_Box">&nbsp;Continental</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_5">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="desserts"
                  value="desserts"
                  className="check"
                />
                <span className="check_Box">&nbsp;Desserts</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="fast_food"
                  value="fast food"
                  className="check"
                />
                <span className="check_Box">&nbsp;Fast Food</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_6">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="healthy_food"
                  value="healthy food"
                  className="check"
                />
                <span className="check_Box">&nbsp;Healthy Food</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="ice_cream"
                  value="ice cream"
                  className="check"
                />
                <span className="check_Box">&nbsp;Ice Cream</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_7">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="indian"
                  value="indian"
                  className="check"
                />
                <span className="check_Box">&nbsp;Indian</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="italian"
                  value="italian"
                  className="check"
                />
                <span className="check_Box">&nbsp;Italian</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_8">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="sea_food"
                  value="sea food"
                  className="check"
                />
                <span className="check_Box">&nbsp;Sea Food</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="snacks"
                  value="snacks"
                  className="check"
                />
                <span className="check_Box">&nbsp;Snacks</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_9">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="north_indian"
                  value="north indian"
                  className="check"
                />
                <span className="check_Box">&nbsp;North Indian</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="oriya"
                  value="oriya"
                  className="check"
                />
                <span className="check_Box">&nbsp;Oriya</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_10">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="pastas"
                  value="pastas"
                  className="check"
                />
                <span className="check_Box">&nbsp;Pastas</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="pizzas"
                  value="pizzas"
                  className="check"
                />
                <span className="check_Box">&nbsp;Pizzas</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_11">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="punjabi"
                  value="punjabi"
                  className="check"
                />
                <span className="check_Box">&nbsp;Punjabi</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="salads"
                  value="salads"
                  className="check"
                />
                <span className="check_Box">&nbsp;Salads</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_12">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="south_indian"
                  value="south indian"
                  className="check"
                />
                <span className="check_Box">&nbsp;South Indian</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="street_food"
                  value="street food"
                  className="check"
                />
                <span className="check_Box">&nbsp;Street Food</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_13">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="sweets"
                  value="sweets"
                  className="check"
                />
                <span className="check_Box">&nbsp;Sweets</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="tandoor"
                  value="tandoor"
                  className="check"
                />
                <span className="check_Box">&nbsp;Tandoor</span>
                <div class="control_indicator"></div>
              </label>
            </div>
            <div className="cuisine_14">
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="thai"
                  value="thai"
                  className="check"
                />
                <span className="check_Box">&nbsp;Thai</span>
                <div class="control_indicator"></div>
              </label>
              <label class="control control-checkbox">
                <input
                  type="checkbox"
                  id="thalis"
                  value="thalis"
                  className="check"
                />
                <span className="check_Box">&nbsp;Thalis</span>
                <div class="control_indicator"></div>
              </label>
            </div>
          </div>
          <button className="clear_btn" onClick={clear_btn}>
            CLEAR
          </button>
          <button className="show_food_btn" onClick={showRestaurants}>
            SHOW RESTAURANTS
          </button>
        </Box>
      </Drawer>
      <Wrapper>
        <div style={{ background: "#171a29", padding: "30px 180px" }}>
          <div className="container my-3">
            <Slider {...settings}>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/jkcbdbr3qdjuzgjepkjx"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/xax7qfs6dbmzdmzxq1dh"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/c59djn2nskqlf0ork6wc"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/qd0mwkv1mk3bxyy3x5fm"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/rl8zesrkte88twzgbma5"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/lgxbfmjfi9ba7sqbliek"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/ztpd5q9awnmmnefczn5x"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/jcjcvebiczqe5jr2vijo"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rs4krvosxjt6i5wyefvy"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/kmewp8efed0ev7yvfyx6"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/marketing-dashboard/carousel/e8qsywpath9uli7tnikc"
                  alt="promotion img"
                />
              </div>
              <div className="col">
                <Img
                  src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/marketing-dashboard/carousel/bmp2yqaaqouptllxmkei"
                  alt="promotion img"
                />
              </div>
            </Slider>
          </div>
        </div>
      </Wrapper>
      <div className="container_navbar">
        <div className="nav_food">
          <h2 className="restaurantNum">{foodItems.length} restaurants</h2>
          <div className="action_buttons" onClick={sortingLinks}>
            <p className="link">Relevance</p>
            <p className="link">Delivery Time</p>
            <p className="link">Rating</p>
            <p className="link">Cost: Low To High</p>
            <p className="link">Cost: High To Low</p>
            <p
              className="filter_link"
              onClick={() => {
                setisDraweropen(true);
              }}
            >
              Filters&nbsp;<i class="fa fa-filter"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="container_card">
        {foodItems.map((food_data) => (
          <>
            <div
              className="food_card"
              key={food_data.id}
              onClick={() => handleClick(food_data.id)}
            >
              {food_data.promoted && (
                <div className="promoted" id="is_promote">
                  PROMOTED
                </div>
              )}
              <img
                src={food_data.img_url}
                alt="Food_Image"
                className="food_image"
              ></img>
              <h4 className="Header_card">{food_data.name}</h4>
              <p className="para_card">{food_data.cuisines.join(",")}</p>
              <div className="food_details">
                <div
                  className="rating"
                  style={{
                    backgroundColor:
                      food_data.rating < 4 ? "#db7c38" : "#48c479",
                  }}
                >
                  <i class="far fa-star"></i>&nbsp;{food_data.rating}
                </div>
                <div className="average_time">
                  {food_data.average_time}&nbsp;MINS
                </div>
                <div className="average_price">
                  &#8377;{food_data.average_cost} FOR TWO
                </div>
              </div>
              <div className="footer">
                <img src={Discount} alt="" className="discount_icon" />
                50% off | use TRYNEW
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export { Food_Main };
