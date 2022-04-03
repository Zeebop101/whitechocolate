const connectDB = require("./db");
const fileUpload = require("express-fileupload");
const nodeHtmlToImage = require("node-html-to-image");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const guestRoutes = require("./routes/guestRoutes");
const path = require("path");

const Ticket = require("./models/ticketModel");
const Guest = require("./models/guestModel");

require("dotenv").config();

//STRIPE
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
connectDB();
const app = express();

const qrOption = {
  margin: "7",
  width: "175",
  color: {
    dark: "#FFF", // Blue dots
    // light: "#0000", // Transparent background
    light: "#000", // Transparent background
  },
};

// let testAccount = await nodemailer.createTestAccount();

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

const sendEmail = async (createdTicket) => {
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

  const bufferImage = await QRCode.toDataURL(
    createdTicket._id.toString(),
    qrOption
  );

  let myImage = await nodeHtmlToImage({
    output: "./image.png",
    html: `<html><body style="background-color: red;"><img src="${bufferImage}"></img><Hello world!</body></html>`,
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"White Chocolate" <contact@white-chocolate.club>', // sender address
    to: createdTicket.email, // list of receivers
    subject: "White Chocolate - Ticket/s", // Subject line
    text: "", // plain text body
    html: `    
    <div style="color: black">
        <div>Hallo ${createdTicket.firstName},</div>
        <br />
        <div>vielen Dank für deinen Ticketkauf. Diesen findest du anbei als QR-Code.</div><br />
        <div>Zeige uns diesen am Eingang vor und die Show kann beginnen.</div>
        <br />
        <div>Die Afterparty ist mit in diesem Ticket inkludiert.</div>
        <br />
        <div>Wir sehen uns am ${createdTicket.date} im <b>Ayoka Berlin</b>, Friedrichstraße 180-184, 10117 Berlin.</div>
        <br />
        <div><b>Einlass:</b> 21:00 Uhr</div>
        <div><b>Comedy Show:</b> 22:00 Uhr</div>
        <div><b>Afterparty</b>: 23:00 Uhr</div>
        <br>
        <div>Wir freuen uns</div>
        _____________________________
        <br /><br />
        <b>Beste Grüße</b>
        <br /><br />
        <p>
        <img style="float: left; width: 3.5rem" src="cid:my-qr-code-1-1-1" /> 
        </p>
        
        <br /><br /><br /><br /><br />
        <h3>White Chocolate</h3>
        <p>Email: contact@white-chocolate.club<br /><p>Website: www.white-chocolate.club</p>
    </div>`,
    attachments: [
      {
        filename: "footerlogo.png",
        path: __dirname + "/footerlogo.png",
        cid: "my-qr-code-1-1-1",
      },
      {
        filename: "ticket.png",
        path: bufferImage,
      },
      // {
      //   filename: "ticket.png",
      //   path: "./image.png",
      // },
    ], // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

//MIDDLEWARE
app.use(fileUpload());
// app.use(express.urlencoded());
app.use("/webhook", express.raw({ type: "*/*" }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// MIDDLEWARE STRIPE RAW BODY

//MIDDLEWARE

app.use("/api/events", eventRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/guest", guestRoutes);

app.use(cors());
const { getStoreItems } = require("./storeItems");

////// GUEST CODE /////

app.get("api/guest/add"),
  async (req, res) => {
    console.log(req.body);
  };

// ROUTES
app.post("/create-checkout-session", async (req, res) => {
  try {
    let storeItems = getStoreItems();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // billing_address_collection: "required",
      // customer: true,
      // customer_creation: "always",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems[item.id - 1];
        // console.log(JSON.stringify(storeItem, null, 2));

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInEuro * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        items: JSON.stringify(req.body.items),
        firstName: JSON.stringify(req.body.firstName),
        lastName: JSON.stringify(req.body.lastName),
      },
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Webhook Stripe
const endpointSecret =
  "whsec_dd95f09a58bd97d8206a9868b187bd5c81f23487442f3895e5e9da2212d231f1";
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

const fulfillOrder = (session) => {
  const data = session.metadata;
  const items = JSON.parse(data.items);
  const firstName = JSON.parse(data.firstName);
  const lastName = JSON.parse(data.lastName);

  let regCount, vipCount, premiumCount;

  items.map((item) => {
    if (item.id === 1) regCount = item.quantity;
    else if (item.id === 2) premiumCount = item.quantity;
    else vipCount = item.quantity;
  });

  // TODO: fill Metadatme in
  Ticket.create(
    {
      email: session.customer_details.email,
      firstName: firstName,
      lastName: lastName,
      regular: regCount,
      premium: premiumCount,
      vip: vipCount,
      date: "23/04/2022",
    },
    (err, createdTicket) => {
      if (err) {
        console.log(err);
        //res.status(400).send("Error entering data into the db!");
        console.log("not done");
      } else {
        // send mail with defined transport object
        sendEmail(createdTicket);
      }
    }
  );
  //console.log("Fulfilling order", session);
  // console.log(session.payment_intent.charges);
};

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the purchase...

      fulfillOrder(session);
    }

    response.status(200);
  }
);

// Server static ssets if in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//listen

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', console.log(PORT + " - SERVER RUNNING!"));
