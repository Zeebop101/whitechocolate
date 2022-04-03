import React, { useState } from "react";
import "./Footer.scss";
import wclogo from "./img/wclogo.svg";
import fypedlogo from "./img/fypedlogo.svg";
import Impressum from "../Impressum/Impressum.js";
import Datenschutz from "../Datenschutz/Datenschutz";
import Agb from "../Agb/Agb";

function Footer() {
  const [openI, setOpenI] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openA, setOpenA] = useState(false);
  return (
    <div className="footer">
      <img src={wclogo} alt="" className="footer-wc-logo" />
      <img src={fypedlogo} alt="" className="footer-fyped-logo" />
      <div className="footer-links">
        <button className="footer-impressum" onClick={() => setOpenI(true)}>
          Impressum
        </button>

        <Impressum open={openI} onClose={() => setOpenI(false)}></Impressum>

        {/* ----------- */}

        <button className="footer-datenschutz" onClick={() => setOpenD(true)}>
          Datenschutz
        </button>

        <Datenschutz open={openD} onClose={() => setOpenD(false)}></Datenschutz>

        {/* ----------- */}

        <button className="footer-agb" onClick={() => setOpenA(true)}>
          AGB's
        </button>

        <Agb open={openA} onClose={() => setOpenA(false)}></Agb>
      </div>
    </div>
  );
}

export default Footer;
