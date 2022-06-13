import {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
  checkKeysCacheExist,
} from "../helpers/cache.js";

import { crawlDataPage } from "../helpers/crawlers.js";
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function crawlerOnePage(req, res) {
  console.log(checkCachePage("page1"));
  if (checkCachePage("page1") === true) {
    const data = await getOnePageToCache("page1");
    return res.send({ data: data });
  }
  try {
    const data = await crawlDataPage(1);
    await saveOnePageToCache("page1", data);
    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
 * @param {String} req 
 * @param {Array<Object>} res 
 */
export async function crawlerMoreThanOnePage(req, res) {
  const { numberOfPagesWanted } = req.params;

/**
 * @type {Array} Store the Total Result of crawl all pages
 */
  let dataAllPages = [];
/**
 *  @type {Number} the number of pages are stored in cache
 */
  const pagesNotToCrawl = await checkKeysCacheExist(numberOfPagesWanted)
/**
 * 
 */
  const pagesToCrawl = numberOfPagesWanted - pagesNotToCrawl

  try {
    for (let i = 1; i <= pagesToCrawl; i++) {
      let dataOnePage = await crawlDataPage(i);
      await saveOnePageToCache(`page${i}`, dataOnePage);
      dataAllPages = [...dataAllPages.concat(dataOnePage)];
    }
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}
