const Guest = require("../models/guestModel");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const nodeHtmlToImage = require("node-html-to-image");

// import Logo from "./img/rund.svg";

// const YourTicket = require("./img/YourTicket.svg");
// const Logo = require("./img/rund.svg");

// @desc    Adds a new Guestcode
// @route   POST /api/guest/add
// @access  Public

// @desc    Sends an emaiil to the gust
// @route   POST /api/guest/send-email
// @access  Public

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer.from(bitmap).toString("base64");
}

const sendEmail = async (req, res) => {
  const { _id, firstName, lastName, email, date } = req.body;
  const qrOption = {
    margin: "7",
    width: "175",
    color: {
      dark: "#FFF", // Blue dots
      // light: "#0000", // Transparent background
      light: "#000", // Transparent background
    },
  };
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ionos.de",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@white-chocolate.club", // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  const bufferImage = await QRCode.toDataURL(_id.toString(), qrOption);

  let myImage = await nodeHtmlToImage({
    output: "./image.png",
    html: `
          <html>
              <body style="background-color: black; width: 18.75rem; height: 34.375rem;  display: grid; justify-content: center; justify-items: center; grid-template-rows: repeat(3, minmax(min-content, max-content)); border-radius: 1.75rem; background: radial-gradient( 100.52% 93.01% at 0% 0%, #d39f6a 0%,rgba(75, 41, 73, 0) 100%);" >
               <img className="ticketlook-logo" src="./footerlogo.png" alt="" style="z-index: 2; width:10rem; height:10rem;" />
                <div style="display: grid; color: white; padding-top: 2.278rem; padding-bottom: 4.625rem; grid-template-rows: repeat(2, minmax(min-content, max-content));">
                  <p style="font-size: 1.625rem; line-height: 2.813rem; font-weight: 700;">Y O U R</p>
                  <p style="font-size: 2.75rem; line-height: 2.813rem; font-weight: 700;">TICKET</p>
                </div>
                <img style="width: 9.375rem; height: 9.375rem;" src=${bufferImage} alt=""/>
              </body>
          </html>
          `,
  });
  // </div><img src="${bufferImage}"></img>
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"WHITE CHOCOLATE" <contact@white-chocolate.club>', // sender address
    to: email, // list of receivers
    subject: "Guest-Code", // Subject line
    text: "", // plain text body
    html: `    <div style="color: black">
     Hallo ${firstName},
      <br />
      <br />
      <div>
        <div>anbei findest du deinen persönlichen Guest-Code.</div><br />
        <div>Lasse diesen am Eingang scannen und du erhälst 50% Nachlass für die Party bis 01:00 Uhr.</div>
      </div>
      <br />
      <div>
        <div>Bitte beachte, dieser Guest-Code ist nur für den Eintritt der Party, nicht für die Comedy Show.</div>
        <div>Falls du auch zur Comedy Show möchtest, kaufe dir bitte ein Ticket auf unserer Webseite:</div>
        <br />
        <div>Wir sehen uns am 23.04.2022 im <b>Ayoka Berlin</b>, Friedrichstraße 180-184, 10117 Berlin.</div>
        <br />
        <div><b>Einlass:</b> 21:00 Uhr</div>
        <div><b>Comedy Show:</b> 22:00 Uhr</div>
        <div><b>Afterparty</b>: 23:00 Uhr</div>
        <br>
        <div>Wir freuen uns.</div>
        _____________________
        <br /><br />
        <b>Beste Grüße</b>
        <br /><br />
        <p>
        <img style="float: left; width: 3.5rem" src="cid:my-qr-code-1-1-1" /> 
        </p>
        
        <br /><br /><br /><br /><br />
        <h3>White Chocolate</h3>
        <p>Email: contact@white-chocolate.club<br /><p>Website: www.white-chocolate.club</p>

          

      </div>
    </div>`,
    attachments: [
      {
        filename: "footerlogo.png",
        path: __dirname + "/footerlogo.png",
        cid: "my-qr-code-1-1-1",
      },
      {
        filename: "guestcode.png",
        // path: "./image.png",
        path: bufferImage,
      },
    ], // html body
  });
};

// @desc    Adds a new Guestcode
// @route   POST /api/guest/add
// @access  Public

const addGuest = (req, res) => {
  const { firstName, lastName, email, date } = req.body;
  // Guest.find({ email: email, date: date }, (err, foundGuest) => {
  //if (foundGuest.length === 0) {
  Guest.create(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      date: date,
    },
    (err, createdGuest) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error entering data into the db!");
      } else {
        res.status(200).json(createdGuest);
      }
      //   }
      //);
      //} else {
      //res.status(204).send("Guest already generated code!");
      //}
    }
  );
};

module.exports = {
  addGuest,
  sendEmail,
};
