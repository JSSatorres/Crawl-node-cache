const {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
  checkKeysCacheExist,
  getPagesInCached,
} = require("../helpers/cache.js");

const { crawlDataPage, isNumber } = require("../helpers/crawlers");

/**
 *call checkCachePage to check if de page1 is in cache and if the page1 is not in cache call checkCachePage and return the data crawled of page1
 * @returns {Array<Object>} the data in cache of page1 or the data crawled of page1
 */

async function crawlerOnePage(req, res) {
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
 *call checkCachePage to check how many pages are in cache, if de page is in cache returt it and add the pages that are not in cacheand instead of calling crawlDataPage
 * @param {String} req the params of url to know how many pages have to return
 * @param {Array<Object>} res the pages are cached and the pages have to crawl 
 */

async function crawlerMoreThanOnePage(req, res) {

  //checking req.params could be a number
  const { numberOfPagesWanted } = req.params;
  if ((isNumber(numberOfPagesWanted)) === false)
    return res.json("Not a Number");

  //initialising constants and converting them to numbers
  let dataAllPages = [];
  let numberOfPagesWantedToNumber = parseInt(numberOfPagesWanted);
  let stringPagesNotToCrawl = await checkKeysCacheExist(numberOfPagesWantedToNumber);
  let pagesNotToCrawl = parseInt(stringPagesNotToCrawl);
  let pagesToCrawl = numberOfPagesWantedToNumber - pagesNotToCrawl;

  try {
    //crawling pages are not in cache
    for (let i = pagesNotToCrawl; i < numberOfPagesWantedToNumber; i++) {
      let dataOnePage = await crawlDataPage(i+1);
      await saveOnePageToCache(`page${i+1}`, dataOnePage);
      dataAllPages = [...dataAllPages.concat(dataOnePage)];
    }
     //cachting pages in cache
    if (pagesNotToCrawl  !== 0) {
      const pagesInCache = await getPagesInCached(pagesNotToCrawl);
      dataAllPages = [...dataAllPages.concat(pagesInCache)];
    }
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { crawlerOnePage, crawlerMoreThanOnePage };
