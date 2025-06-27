require("dotenv").config();
const express = require("express");
const cors = require("cors");
const animeRoutes = require("./src/routes/animeRoutes");
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/anime", animeRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
