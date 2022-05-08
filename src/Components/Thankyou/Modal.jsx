import * as React from "react";
import Logo from "../Assets/swiggy.svg";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import { v4 as uuidv1 } from 'uuid';
const style = {
  position: "absolute",
  top: "53%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export function BasicModal() {
  const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
  };
  const id=uuidv1(v1options);
  const navigate = useNavigate();

  const handleClose = () => {
    window.scrollTo(0, 0);
    localStorage.setItem("Cart", JSON.stringify([]));
    navigate("/restaurants");
  };
  window.scrollTo(0, 0);
  return (
    <div class="content">
      <div class="wrapper-1">
        <div class="wrapper-2">
          <img src={Logo} alt="" className="modal_image" />
          <h1 className="modal_h1">Thankyou</h1>
          <p>
            Order Id
          </p>
          <p>
          {id}
          </p>
          <button class="go-home" onClick={handleClose}>
            <a>go home</a>
          </button>
          
        </div>
      </div>
      <div class="pyro">
          <div class="before"></div>
          <div class="after"></div>
        </div>
      </div>
  );
}
