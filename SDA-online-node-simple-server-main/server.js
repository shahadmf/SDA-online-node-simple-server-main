import express from "express";
import morgan from "morgan";
import "dotenv/config";

import productsRoute from "./routes/productsRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(productsRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello New World</h1>");
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});