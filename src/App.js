import {LandingPage} from './Components/LandingPage/LandingPage'
import {Navbar} from './Components/RestaurantPage/navbar'
import './App.css';
import {PreLoader} from './Components/PreLoader'
import { Food_Main } from './Components/RestaurantPage/Food_Main';
import {Food_Detail} from './Components/RestaurantPage/Food_Detail'
import { Address } from './Components/CheckoutPage/Address'
import React, { useState, useEffect } from "react";
function App() {
  const [loading, isLoading] = useState(false);
 
  useEffect(() => {
    isLoading(true)
    fakePromise(3500).then(() =>isLoading(false))
  }, [])
   
  function fakePromise(ms) {
    return new Promise((resolve => setTimeout(resolve, ms))
    )}
  return (
    <>
      {/* {loading?<PreLoader/>:<Food_Main/>} */}
     {/* <LandingPage /> */}
      {/* <Navbar/> */}
      {/* <Food_Main/> */}
      {/* <PreLoader/> */}
      <Food_Detail/>
      {/* <Address/> */}
      {/* <PaymentDetails/> */}
    </>
  );
}

export default App;
