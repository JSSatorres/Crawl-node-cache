const express = require("express");
const morgan = require("morgan");
const routerScraper = require("./routes/scraper-routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json())
app.use(routerScraper);

module.exports = app;
