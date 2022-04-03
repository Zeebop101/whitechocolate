import React, { useEffect, useRef, useState } from "react";
import Events from "../../Events/Events.js";
import Tickets from "../../Tickets/Tickets.js";
import Guestcode from "../../Guestcode/Guestcode.js";
import Footer from "../../Footer/Footer.js";
import "./Cancel.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CancelView() {
  const navigate = useNavigate();

  const successRef = useRef(null);
  const executeScroll = () =>
    successRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    executeScroll();
  }, []);
  return (
    <div>
      <Events />
      <div ref={successRef} className="cancel">
        <div className="cancel-header">
          <p>Das hat leider nicht geklappt.</p>
        </div>

        <div className="cancel-footer">
          <p>Probiere es gern erneut.</p>
        </div>
        <button className="cancel-button" onClick={() => navigate("/")}>
          Nochmal versuchen
        </button>
      </div>
      <Guestcode />
      <Footer />
    </div>
  );
}

export default CancelView;
