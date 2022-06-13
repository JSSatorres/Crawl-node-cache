const express = require("express");
const {
  scrapOnePage,
  scrapXPages,
} = require("../controllers/scraper-controllers");

const routerScraper = express.Router();

routerScraper.get("/1", scrapOnePage);
routerScraper.get("/:pages", scrapXPages);

module.exports = routerScraper;
