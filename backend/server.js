require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const budgetRoutes = require("./routes/budget");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
