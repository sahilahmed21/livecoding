const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/auth");
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});
const app = express();
app.use(express.json());
        
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
})