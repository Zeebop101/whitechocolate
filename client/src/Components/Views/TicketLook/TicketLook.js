import React from "react";
import "./TicketLook.scss";
import logo from "./img/rund.svg";
import qr from "./img/qr.svg";

function TicketLook() {
  return (
    <div class="ticketlook">
      <img className="ticketlook-logo" src={logo} alt="" />
      <div className="ticketlook-title">
        <p>Y O U R</p>
        <p>TICKET</p>
      </div>
      <img src={qr} alt="" className="ticketlookg-qr" />
    </div>
  );
}

export default TicketLook;
