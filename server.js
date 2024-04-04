const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { sendMail } = require("./Services/nodemailer");

const PORT = process.env.PORT || 6969;

const corsOptions = {
  origin: "*", // Allow requests from all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  optionsSuccessStatus: 200,
};

// Log request origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));

//API Rputes Here
app.post("/api/form", (req, res) => {
  console.log("Received POST request to /api/form");
  const data = req.body;
  console.log(data, "Processing form data...");

  //   // Route to serve the index.html file
  // app.get('/', (req, res) => {
  //   res.sendFile(__dirname + '/public/index.html');
  // });

  // Perform any server-side processing or validation here
  // For example, you can save the data to a database
  console.log(req.body, "api data");
  console.log("Received data:", data);

  // Respond to the client (customize the response as needed)
  res.json({ message: "Data received successfully" });

  // Send Mail From Form
  sendMail(data, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent:", info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
