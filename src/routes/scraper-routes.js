import express from "express";

import {
  crawlerPage,
  crawlerMoreThanOnePage
} from "../controllers/scraper-controllers.js";

const routerScraper = express.Router();

// routerScraper.get("/1", scrapOnePage);
routerScraper.get("/1", crawlerPage)
routerScraper.get("/:pages", crawlerMoreThanOnePage);

export default routerScraper;
