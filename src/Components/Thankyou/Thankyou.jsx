import React from "react";
import {BasicModal} from "./Modal";

export function ThankYou() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BasicModal />
      <h1 style={{ textAlign: "center", margin: "20px 0 250px" }}>
        Order Placed
      </h1>
    </div>
  );
}