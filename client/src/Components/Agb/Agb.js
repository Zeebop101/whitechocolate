import React from "react";

const IMPRESSUM_STYLES = {
  position: "fixed",
  display: "grid",
  gridTemplateRows: "repeat(3,minmax(min-content,max-content))",
  width: "100%",
  height: "70%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "2rem",
  zIndex: 1000,
  overflow: "scroll",
};

const OVERLAY_STYLES = {
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  padding: "2rem",
  zIndex: 1000,
};

const BUTTON_STYLES = {
  position: "absolute",
  right: "1rem",
  top: "1rem",
  fontSize: "1.3rem",
  backgroundColor: "lightgrey",
};

const PARAGRAPH_STYLES = {
  textAlign: "left",
  marginTop: "2rem",
};

function AGB({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES} className="impressum-overlay"></div>
      <div className="Impressum" style={IMPRESSUM_STYLES}>
        <h1>AGB's</h1>
        <p style={PARAGRAPH_STYLES}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eum
          consequuntur vitae nulla quam ipsum quis! Error nam dignissimos iure
          ad doloribus minima aperiam excepturi enim quod incidunt illo optio
          ipsa officiis, sed facilis? Repellat, debitis error enim, veritatis
          praesentium ipsum eligendi, dolor sed placeat voluptatum recusandae
          ut? Temporibus modi ad accusantium accusamus soluta, illum, quisquam
          ipsam, iusto maxime deleniti vero eaque consectetur obcaecati
          exercitationem fugiat? Illum assumenda nemo, vel totam quis deleniti
          officia fuga quidem quam voluptas iusto, sapiente hic quas. Dolores
          possimus ducimus ex dolorem dolore inventore iure debitis nesciunt,
          quia pariatur, vitae similique quae ratione sed ab reprehenderit! A
          magni architecto minus asperiores impedit dicta veritatis eaque
          maiores nemo iusto. Architecto quisquam, amet fugiat debitis molestias
          praesentium.
        </p>
        <button
          style={BUTTON_STYLES}
          className="impressum-close"
          onClick={onClose}
        >
          <>&#10006;</>
        </button>
      </div>
    </>
  );
}

export default AGB;
