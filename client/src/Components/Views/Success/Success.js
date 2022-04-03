import React, { useEffect, useRef, useState } from "react";
import Events from "../../Events/Events.js";
import Tickets from "../../Tickets/Tickets.js";
import Guestcode from "../../Guestcode/Guestcode.js";
import Footer from "../../Footer/Footer.js";
import "./Success.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SuccessView() {
  const [data, setData] = useState("null");
  const navigate = useNavigate();

  const successRef = useRef(null);
  const executeScroll = () =>
    successRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    executeScroll();
    axios
      .get("https://whitechocolate.herokuapp.com/api/tickets/get-latest-ticket")
      .then((response) => setData(response.data));
  }, []);
  return (
    <div>
      <Events />
      {data ? (
        <>
          <div ref={successRef} className="success">
            <div className="success-header">
              <p>
                Dein Einkauf war erfolgreich,{" "}
                {data.firstName + " " + data.lastName}!
              </p>
            </div>

            <div className="success-amount">
              <p>Date: {data.date}</p>
              {data.regular ? <p>Regular Tickets: {data.regular}</p> : null}
              {data.premium ? <p>Premium Tickets: {data.premium}</p> : null}
              {data.vip ? <p>VIP Tickets: {data.vip}</p> : null}
            </div>

            <div className="success-footer">
              <p>
                Das Ticket wurde an {data.email} geschickt. Bitte überprüfe auch
                deinen Spam Ordner.
              </p>
              <p>
                Falls es Probleme gibt oder Fragen bestehen, kontaktiere uns:
                contact@white-chocolate.berlin
              </p>
            </div>
            <button className="success-button" onClick={() => navigate("/")}>
              Mehr Tickets kaufen
            </button>
          </div>
        </>
      ) : null}

      <Guestcode />
      <Footer />
    </div>
  );
}

export default SuccessView;
