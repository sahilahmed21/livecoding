require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
});
