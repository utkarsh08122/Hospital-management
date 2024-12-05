const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const empRouter = require("./routers/empRouter");
const userRouter = require("./routers/userRouter");
const appoinmenetRouter = require("./routers/appoinmenetRouter");
const cloudinary = require("cloudinary").v2;

var cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

cloudinary.config({
  cloud_name: "dutux5hgm",
  api_key: "845913675266747",
  api_secret: "PO2SzhqZjm0egzSWalI9MhAtZBU",
});

app.use(express.json({ limit: "10mb" }));

app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/auth", authRouter);
app.use("/emp", empRouter);
app.use("/user", userRouter);
app.use("/book", appoinmenetRouter);

const PORT = process.env.PORT || 4000;
dbConnect();

app.listen(PORT, () => {
  console.log(`listen on port in ${PORT}`);
});
