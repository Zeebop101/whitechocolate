import html2canvas from "html2canvas";
import jspdf from "jspdf";

const savePdf = () => {
  const domElement = document.querySelector("#ticket-container");
  html2canvas(domElement, {
    onclone: (document) => {
      document.querySelector("#save-button").style.visibility = "hidden";
    },
  }).then((canvas) => {
    const img = canvas.toDataURL("image/jpeg");
    const pdf = new jspdf();
    pdf.addImage(imgData, "JPEG", 0, 0, 500, 500);
    pdf.save("filename.pdf");
  });
};

const EmailHtml = () => {
  return <div id="ticket-container">EmailHtml</div>;
};

export default EmailHtml;
