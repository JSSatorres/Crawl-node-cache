const express = require('express');

const {
  crawlerOnePage,
  crawlerMoreThanOnePage
} = require("../controllers/crawl-controllers");

const routerScraper = express.Router();

routerScraper.get("/1", crawlerOnePage)
routerScraper.get("/:numberOfPagesWanted", crawlerMoreThanOnePage);


module.exports = routerScraper;
