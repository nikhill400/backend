
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use("/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Hi, I am working");
});

app.listen(5000, () => {
  console.log("Now running on port 5000");
});



