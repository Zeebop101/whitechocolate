import React, { useState } from "react";

// import payment from "./img/payment.png";
import apple from "./img/applegoogle.svg";
import google from "./img/google.svg";
import visa from "./img/visa.svg";
import mastercard from "./img/mastercard.svg";
import americanexpress from "./img/americanexpress.svg";
import toast, { Toaster } from "react-hot-toast";

import "./Stripe.scss";
import axios from "axios";

function CheckOutHandle(order, firstName, lastName, checked) {
  // axios.post("https://whitechocolate.herokuapp.com/api/tickets/add", {
  //   firstName: firstName,
  //   lastName: lastName,
  //   regular: order.find((item) => (item.id === 1 ? item.quantity : 0)),
  // });

  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");

  if (firstname.value != "" && lastname.value != "" && checked === true) {
    toast.loading("Bis gleich.");
    fetch("https://whitechocolate.herokuapp.com/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: order,
        firstName: firstName,
        lastName: lastName,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }

  if (checked === false) {
    toast.error("Bitte die AGB's bestätigen.");
  }

  if (lastName == "") {
    toast.error("Bitte Nachnamen eintragen.");
  }

  if (firstName == "") {
    toast.error("Bitte Vornamen eintragen.");
  }
}

function Stripe({
  count_vip,
  count_premium,
  count_regular,
  firstName,
  lastName,
  checked,
}) {
  const order = [];

  // const vip = {};
  // const premium = {};
  // const regular = {};

  if (count_vip) {
    console.log("Check VIP");
    const vip = { id: 3, quantity: count_vip };
    order.push(vip);
  }

  if (count_premium) {
    console.log("Check PREMIUM");
    const premium = { id: 2, quantity: count_premium };
    order.push(premium);
  }

  if (count_regular) {
    console.log("Check Regular");
    const regular = { id: 1, quantity: count_regular };
    order.push(regular);
  } else {
  }

  return (
    <div>
      <Toaster />
      <p className="stripe-checkout-title">Bezahlen:</p>
      <button
        className="stripe-checkout"
        onClick={() => CheckOutHandle(order, firstName, lastName, checked)}
      >
        <img className="stripe-checkout-image" src={apple} alt="" />
        <img className="stripe-checkout-image" src={visa} alt="" />
        <img className="stripe-checkout-image" src={mastercard} alt="" />
        <img className="stripe-checkout-image" src={americanexpress} alt="" />
        {/* {count_vip}--{count_premium}--{count_regular} */}
      </button>
    </div>
  );
}

export default Stripe;
