import express from "express";
import morgan from "morgan";
import routerScraper from "./routes/scraper-routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(routerScraper);

export default app;
