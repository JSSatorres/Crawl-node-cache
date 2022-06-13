import express from "express";

import {
  crawlerPage,
  crawlerMoreThanOnePage
} from "../controllers/crawl-controllers.js";

const routerScraper = express.Router();

routerScraper.get("/1", crawlerPage)
routerScraper.get("/:pages", crawlerMoreThanOnePage);

export default routerScraper;
