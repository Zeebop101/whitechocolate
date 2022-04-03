import React, { useState } from "react";
import "./Guestcode.scss";
import CustomerName from "../CustomerName/CustomerName.js";
import qrcode from "./img/qrcode.svg";
import logo from "../Events/img/logo/rund.svg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

var validator = require("email-validator");

function GuestCodeHandle(
  firstName,
  lastName,
  email,
  setVerifi,
  setFirstName,
  setLastName
) {
  if (firstName && lastName && validator.validate(email)) {
    toast.success(
      "Der Guest-Code wurde per Mail verschickt. Bitte überprüfe auch deinen Spam Ordner."
    );

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    axios
      .post("http://localhost:5000/api/guest/add", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        date: "12/12/12",
      })

      .then((response) => {
        if (response.status === 200) {
          axios
            .post("http://localhost:5000/api/guest/send-email", {
              _id: response.data._id,
              firstName: firstName,
              lastName: lastName,
              email: email,
            })
            .then((reponse) => {
              //do anything to give feedback
            });
        } else if (response.status === 204) {
          console.log("Guest was not added, he already had a code!");
        }
      });
  }

  if (validator.validate(email) == false) {
    toast.error("Bitte E-Mail Adresse eintragen.");
    setVerifi("red");
  }

  if (lastName == "") {
    toast.error("Bitte Nachnamen eintragen.");
    // setFirstName("red");
  }

  if (firstName == "") {
    toast.error("Bitte Vornamen eintragen.");
  }
}

function Guestcode() {
  const [verifi, setVerifi] = useState("none");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const [focus, setFocus] = useState("red");

  return (
    <div className="guestcode-container">
      <Toaster />
      <img className="guestcode-logo" src={logo} alt="" />
      <div className="guestcode-qr">
        <img src={qrcode} alt="" />
      </div>
      <div className="guestcode">
        <h1>Guest-Code</h1>
        <div className="guestcode-sub">
          <p>50% Rabatt auf den Eintrittspreis.</p>
          <p>Gilt nur für die Afterparty! - bis 01:00H.</p>
        </div>

        <CustomerName setFirstName={setFirstName} setLastName={setLastName} />

        <input
          className={`validation-${verifi}`}
          id="email"
          type="email"
          placeholder="E-Mail"
          onChange={(e) => {
            validator.validate(e.target.value)
              ? setVerifi("green")
              : setVerifi("red");

            setEmail(e.target.value);
          }}
          onFocus={(e) =>
            verifi === "green" ? setVerifi("green") : setVerifi("red")
          }
        />
        <button
          onClick={() =>
            GuestCodeHandle(
              firstName,
              lastName,
              email,
              setVerifi,
              setLastName,
              setFirstName
            )
          }
        >
          Guest-Code Erhalten
        </button>
      </div>
    </div>
  );
}

export default Guestcode;
