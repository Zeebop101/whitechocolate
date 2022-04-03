import React, { useState } from "react";
import "./CustomerName.scss";

function CustomerName({ setFirstName, setLastName }) {
  const [verifiFirst, setVerifiFirst] = useState("none");
  const [verifiLast, setVerifiLast] = useState("none");

  return (
    <div className="customerName">
      <input
        id="firstname"
        type="text"
        placeholder="Vorname"
        className={`validation-${verifiFirst}`}
        onChange={(e) => {
          e.target.value ? setVerifiFirst("green") : setVerifiFirst("red");
          setFirstName(e.target.value);
        }}
        onFocus={(e) => {
          if (verifiFirst === "green") {
            setVerifiFirst("green");
          } else {
            setVerifiFirst("red");
          }
        }}
      />

      <input
        id="lastname"
        type="text"
        placeholder="Nachname"
        className={`validation-${verifiLast}`}
        onChange={(e) => {
          e.target.value ? setVerifiLast("green") : setVerifiLast("red");
          setLastName(e.target.value);
        }}
        onFocus={(e) => {
          if (verifiLast === "green") {
            setVerifiLast("green");
          } else {
            setVerifiLast("red");
          }
        }}
      />
    </div>
  );
}

export default CustomerName;
