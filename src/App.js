import {LandingPage} from './Components/LandingPage/LandingPage'
import {Navbar} from './Components/RestaurantPage/navbar'
import './App.css';
import { Food_Main } from './Components/RestaurantPage/Food_Main';
import {Food_Detail} from './Components/RestaurantPage/Food_Detail'
import { PreLoader } from './Components/PreLoader'
import {PaymentDetails} from './Components/CheckoutPage/PaymentDetails' 
function App() {
  return (
    <>
     {/* <LandingPage /> */}
      {/* <Navbar/> */}
      <Food_Main/>
      {/* <PreLoader/> */}
      {/* {<Food_Detail/>} */}
      {/* <PaymentDetails/> */}
    </>
  );
}

export default App;
