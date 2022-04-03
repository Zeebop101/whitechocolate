import React, { useEffect, useRef, useState } from "react";
import Events from "../../Events/Events.js";
import Tickets from "../../Tickets/Tickets.js";
import Guestcode from "../../Guestcode/Guestcode.js";
import Footer from "../../Footer/Footer.js";
import TicketLook from "../TicketLook/TicketLook.js";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./HomeView.scss";
import Logo from "./img/logohori.svg";

function HomeView() {
  const [buyTickets, setBuyTickets] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="scale-loader">
          {" "}
          <img className="loading-logo" src={Logo} alt="" />
          <h3>Hip Hop meets Comedy</h3>
          <ScaleLoader color={"#FFF"} loading={loading} size={50} />
        </div>
      ) : (
        <div>
          {" "}
          <Events buyTickets={buyTickets} setBuyTickets={setBuyTickets} />
          <Tickets buyTickets={buyTickets} setBuyTickets={setBuyTickets} />
          <Guestcode />
          <Footer />
        </div>
      )}

      {/* <TicketLook /> */}
    </div>
  );
}

export default HomeView;
