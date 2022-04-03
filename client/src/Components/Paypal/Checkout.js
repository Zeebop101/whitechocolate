import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const product = {
    description: "Regular Ticket",
    price: 29,
  };

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (orderID) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("Thank you for purchasing.");
  }

  if (error) {
    alert(error);
  }

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        onClick={(data, actions) => {
          const hasBought = false;
          if (hasBought) {
            setError("You Already bought tickets.");
            return actions.reject();
          } else {
            return actions.resolve;
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_unit: [
              {
                description: product.description,
                amount: {
                  value: product.price,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("ORDER", order);

          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
}

export default Checkout;
