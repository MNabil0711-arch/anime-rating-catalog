require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const animeRoutes = require("./src/routes/anime.routes");
const { notFound, errorHandler } = require("./src/middlewares/error.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Anime Rating Catalog API is running" });
});

app.use("/anime", animeRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
});