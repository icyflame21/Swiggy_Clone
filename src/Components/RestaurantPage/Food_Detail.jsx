import React, { useState,useEffect } from "react";
import DummyImg from "../Assets/1.jfif";
import OfferImg from "../Assets/offerImg.jpg";
import Veg from "../Assets/veg.jpg";
import NonVegan from "../Assets/NonVeg.jpg";
import "./Food_Detail.css";
import { Navbar } from "./navbar";
import { data } from "../../restaurantData";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  border: '1px solid lightgray',
  borderRadius:'7px',
  boxShadow: 24,
  p: 2,
};
export const Food_Detail = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState([]);
  const [mdata , setMdata] = useState([])
  const [Click, isClick] = useState(false);
  const [Value,isValue]=useState("");
  let selectedFood = JSON.parse(localStorage.getItem('foodId'))

  useEffect(() => {
    setData(selectedFood) 
    setShowData(selectedFood.items)
  }, [])
  
  
  const handleOpen = (data) => {
    console.log(data)
    setMdata(data)
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

  

  const filterData = (e) => {
    let links = e.currentTarget.querySelectorAll("div");
    console.log(links)
    links.forEach((btn) => {
      if (btn.innerHTML === e.target.innerHTML)
        btn.classList.add("active_filter");
      else btn.classList.remove("active_filter");
    });
    let fil = e.target.innerHTML.toLowerCase();
    let newarr = data.items.filter((item) => item.category.toLowerCase() == fil)
    setShowData([...newarr])
    isClick(true)
    isValue(e.target.innerText)
  }
  
  return (
    <>
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modal_window">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {mdata ? mdata.name : ""}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} color="success" >
            <div className="food_img_modal">
              <img src={mdata?mdata.img_url:""} alt="" />
            </div>
            <p className="modal_description" ><i class="fa fa-check" aria-hidden="true"></i>&nbsp;Added to your cart</p>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Navbar />
      <div className="topbar">
        <div className="topbar_content">
          <div className="food_img_topbar">
            <img src={data?data.img_url:""} alt="" />
          </div>
          <div className="food_details_section">
            <h2 className="heading">{data?data.name:""} </h2>

            <p className="cuisines" >{ data?data.cuisines.join(","):"" }</p>
        
            <p className="hotel_location">
              Delta Square, Baramunda, Delta Square
            </p>
            <div className="food_overview">
              <p className="food_rating">
                <i class="fas fa-star "></i>
                <b>&nbsp;{ data?data.rating:""}</b> <br />
                {Math.floor(Math.random() *((500-100)+100).toFixed())}+ Ratings
              </p>
              <p className="food_timing">
                <b>{data?data.average_time:""}MINS</b>
                <br />
                Delivery Time
              </p>
              <p className="food_pricing">
                {" "}
                <b>&#8377;{ data?data.average_cost:""}</b> <br />
                Cost for two
              </p>
            </div>
          </div>
          <div className="offer-section">
            <img src={OfferImg} alt="" className="offer_img" />
          </div>
        </div>
      </div>
      <div className="food_products">
        <h4 className="title">{Click?Value:"Recommended" }</h4>
        <p className="itemCount">{data?(data.items.length*2):""}&nbsp;ITEMS</p>

        {showData?showData.map((ele, index) => (
          <div className="food_products_card" key={index}>
          <div className="card_left_div">
            <div className="veg_logo">
                {ele.veg ? (<img src={Veg} alt="" />) : (<img src={NonVegan} alt="" />)}
                {ele.best_seller?<p className="best_seller"><i class="fas fa-star"></i>&nbsp;BEST SELLER</p>:""}
            </div>
              <h4 className="product_title">{ele.name}</h4>
              <p className="product_descrip">{ele.description}</p>
              <p className="product_price">&#8377;{ ele.price}</p>
          </div>
          <div className="card_right_div">
            <div className="food_img">
              <img src={ele.img_url} alt="" />
            </div>
            <button className="add_cart" onClick={()=>handleOpen(ele)}>ADD</button>
          </div>
        </div>
        )):""}
        

        <div className="cart_empty">
          <h2 className="empty_cart">Cart Empty</h2>
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_480/Cart_empty_-_menu_2x_ejjkf2"
            alt=""
            className="empty_cart_img"
          />
          <p className="empty_cart_para">
            Good food is always cooking! <br /> Go ahead, order some yummy items
            from the menu.
          </p>
        </div>
      </div>
      <div className="side_section">
        <p className="side_section_filters_recommend" onClick={filterData}>Recommended</p>
        <p className="side_section_filters" onClick={filterData}>WEDNESDAY EXCLUSIVES</p>
        <p className="side_section_filters" onClick={filterData}>MATCH DAY SPECIALS (SAVE UPTO 32%)</p>
        <p className="side_section_filters" onClick={filterData}>STAY HOME SPECIALS</p>
        <p className="side_section_filters" onClick={filterData}>BIG SAVE COMBOS</p>
        <p className="side_section_filters" onClick={filterData}>BIRYANI BUCKETS (NEW)</p>
        <p className="side_section_filters" onClick={filterData}>BURGERS</p>
        <p className="side_section_filters" onClick={filterData}>SNACKS</p>
        <p className="side_section_filters" onClick={filterData}>SIDES & BEVERAGES</p>
      </div>
    </>
  );
};
