import express from "express";

import {
  crawlerOnePage,
  crawlerMoreThanOnePage
} from "../controllers/crawl-controllers.js";

const routerScraper = express.Router();

routerScraper.get("/1", crawlerOnePage)
routerScraper.get("/:numberPagesToCraw", crawlerMoreThanOnePage);

export default routerScraper;
