import React from "react";
import "./Paypal.scss";
import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout.js";

export default function PayPal() {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <div className="paypal-checkout">
        <Checkout />
        {/* product={product} */}
      </div>
    </PayPalScriptProvider>
  );
}

{
  /* <PayPalButton
  options={{
    clientId:
      "AXzpUG08zjFzcuViijAU5U5L7EuOVDAXUHgaMZzBXi7n5CYuQBHrJE468LIM0jI9RC0spe_9SXRfSf8u",
    currency: "EUR",
    disableFunding: "card,sepa",
  }}
  amount="12.99"
  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"

  onSuccess={(details, data) => {
    alert("Transaction completed by " + details.payer.name.given_name);
    console.log({ details, data });

    // OPTIONAL: Call your server to save the transaction
    //   return fetch("/paypal-transaction-complete", {
    //     method: "post",
    //     body: JSON.stringify({
    //       orderId: data.orderID,
    //     }),
    //   });
  }}
/>; */
}
