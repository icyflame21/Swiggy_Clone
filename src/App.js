import React from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import "./App.css";
import { Food_Main } from "./Components/RestaurantPage/Food_Main";
import { Food_Detail } from "./Components/RestaurantPage/Food_Detail";
import { PaymentDetails } from "./Components/CheckoutPage/PaymentDetails";
import {ThankYou} from "./Components/Thankyou/Thankyou";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurants" element={<Food_Main />} />
        <Route path="/food/:id" element={<Food_Detail />} />
        <Route path="/payment" element={<PaymentDetails />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;
