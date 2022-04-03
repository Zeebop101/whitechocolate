import React, { useEffect, useRef, useState } from "react";
import "./Tickets.scss";
import Paypal from "../Paypal/Paypal.js";
import Stripe from "../Stripe/Stripe.js";
import CustomerName from "../CustomerName/CustomerName.js";
import logo from "../Events/img/logo/rund.svg";
import barcode from "./img/barcode.svg";
import location from "./img/location.svg";
import StripeCheckOut from "react-stripe-checkout";
import Agb from "../Agb/Agb";
import axios from "axios";

const Tickets = ({ buyTickets, setBuyTickets }) => {
  const [count, setCount] = useState(false);
  const [product, setProduct] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const [openA, setOpenA] = useState(false);

  console.log(firstName);
  console.log(lastName);

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (buyTickets) {
      executeScroll();
      setBuyTickets(false);
    }
  }, [buyTickets]);

  useEffect(() => {
    axios
      .get("https://whitechocolate.herokuapp.com/api/tickets/info")
      .then((response) => setProduct(response.data));
  }, []);

  const [count_regular, setCountRegular] = useState(0);
  const [count_premium, setCountPremium] = useState(0);
  const [count_vip, setCountVip] = useState(0);
  const [total_amount, setTotalAmount] = useState(0);

  function plusCount(e) {
    let parent_element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .className;

    if (parent_element == "tickets-container tickets-regular") {
      setCountRegular((prevCount) => prevCount + 1);
      setTotalAmount((prevCount) => prevCount + product[0].priceInEuro);
    } else if (parent_element == "tickets-container tickets-premium") {
      setCountPremium((prevCount) => prevCount + 1);
      setTotalAmount((prevCount) => prevCount + product[1].priceInEuro);
    } else {
      setCountVip((prevCount) => prevCount + 1);
      setTotalAmount((prevCount) => prevCount + product[2].priceInEuro);
    }
  }

  function minusCount(e) {
    let parent_element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .className;

    if (
      parent_element == "tickets-container tickets-regular" &&
      count_regular
    ) {
      setCountRegular((prevCount) => (!prevCount ? 0 : prevCount - 1));
      setTotalAmount((prevCount) =>
        !prevCount ? 0 : prevCount - product[0].priceInEuro
      );
    } else if (
      parent_element == "tickets-container tickets-premium" &&
      count_premium
    ) {
      setCountPremium((prevCount) => (!prevCount ? 0 : prevCount - 1));
      setTotalAmount((prevCount) =>
        !prevCount ? 0 : prevCount - product[1].priceInEuro
      );
    } else if (parent_element == "tickets-container tickets-vip" && count_vip) {
      setCountVip((prevCount) => (!prevCount ? 0 : prevCount - 1));
      setTotalAmount((prevCount) =>
        !prevCount ? 0 : prevCount - product[2].priceInEuro
      );
    } else {
    }
  }

  function BuyTickets() {
    if (total_amount) {
      setCount(!count);
    }
  }

  // return "Hello World";
  if (product.length !== 0) {
    return (
      <div>
        <div ref={myRef} className="tickets">
          <div className="tickets-venue">
            <h3 id="buytickets">White Chocolate</h3>
            <p>Sa. 23.04.2022 · Einlass 21 Uhr</p>
            <div className="tickets-venue-footer">
              <img src={location} alt="" />
              <p>Ayoka Berlin</p>
              <p>· Friedrichstraße 180-184 · 10117 Berlin </p>
            </div>
          </div>
          <div className="tickets-title">
            <h2>Tickets</h2>
          </div>
          <div className="ticket-shop">
            <div className="tickets-container tickets-regular">
              <div
                className="tickets-background"
                style={{ backgroundColor: "#004360" }}
              >
                <img src={logo} alt="" />
                <img src={barcode} alt="" />
              </div>

              <div className="tickets-info">
                <div className="tickets-info-header">
                  <p>Regular</p>
                  <p>{product[0].priceInEuro} €</p>
                </div>
                <div className="tickets-info-details">
                  <p>Comedy Show & Afterparty</p>
                  <p>· Freie Sitzplätze</p>
                </div>
                <div className="tickets-info-amount">
                  <div className="choice">
                    <button className="plus" onClick={minusCount}>
                      -
                    </button>

                    <span className="amount">
                      <p>{count_regular}</p>
                    </span>

                    <button className="minus" onClick={plusCount}>
                      +
                    </button>
                  </div>

                  <div className="summe">
                    <p>{count_regular * product[0].priceInEuro} €</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tickets-container tickets-premium">
              <div
                className="tickets-background"
                style={{ backgroundColor: "#004E40" }}
              >
                <img src={logo} alt="" />
                <img src={barcode} alt="" />
              </div>

              <div className="tickets-info">
                <div className="tickets-info-header">
                  <p>Premium</p>
                  <p>{product[1].priceInEuro} €</p>
                </div>
                <div className="tickets-info-details">
                  <p>Comedy Show & Afterparty</p>
                  <p>· Bestuhlt</p>
                </div>
                <div className="tickets-info-amount">
                  <div className="choice">
                    <button className="plus" onClick={minusCount}>
                      -
                    </button>

                    <span className="amount">
                      <p>{count_premium}</p>
                    </span>

                    <button className="minus" onClick={plusCount}>
                      +
                    </button>
                  </div>

                  <div className="summe">
                    <p>{count_premium * product[1].priceInEuro} €</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tickets-container tickets-vip">
              <div
                className="tickets-background"
                style={{ backgroundColor: "#513a00" }}
              >
                <img src={logo} alt="" />
                <img src={barcode} alt="" />
              </div>

              <div className="tickets-info">
                <div className="tickets-info-header">
                  <p>VIP</p>
                  <p>{product[2].priceInEuro} €</p>
                </div>
                <div className="tickets-info-details">
                  <p>Comedy Show & Afterparty</p>
                  <p>· Tischplatz & Service</p>
                </div>
                <div className="tickets-info-amount">
                  <div className="choice">
                    <button className="plus" onClick={minusCount}>
                      -
                    </button>

                    <span className="amount">
                      <p>{count_vip}</p>
                    </span>

                    <button className="minus" onClick={plusCount}>
                      +
                    </button>
                  </div>

                  <div className="summe">
                    <p>{count_vip * product[2].priceInEuro} €</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tickets-summe">
              <p>Summe: {total_amount} €</p>
            </div>

            <button className="tickets-button" onClick={() => BuyTickets()}>
              Checkout
            </button>
          </div>
          {count && (
            <div>
              <CustomerName
                setFirstName={setFirstName}
                setLastName={setLastName}
              />
              <div className="tickets-agb">
                <input
                  className="tickets-agb-input"
                  type="checkbox"
                  name=""
                  id="checkbox-agb"
                  onChange={() => setChecked(!checked)}
                />
                <p className="tickets-agb-text">
                  Hiermit bestätige ich, die{" "}
                  <button
                    className="tickets-agb-link"
                    onClick={() => setOpenA(true)}
                  >
                    AGB's
                  </button>{" "}
                  zur Kenntnis genommen zu haben und akzeptiere diese.
                </p>
                <Agb open={openA} onClose={() => setOpenA(false)}></Agb>
              </div>
              <Stripe
                firstName={firstName}
                lastName={lastName}
                count_vip={count_vip}
                count_premium={count_premium}
                count_regular={count_regular}
                checked={checked}
              />
              {/* <Paypal /> */}
            </div>
          )}
        </div>
      </div>
    );
  } else return null;
};

export default Tickets;
