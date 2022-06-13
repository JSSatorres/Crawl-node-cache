import {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
  checkKeysCacheExist,
  getPagesInCached
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
  console.log(numberOfPagesWanted);

/**
 * @type {Array} Store the Total Result of crawl all pages
 */
  let dataAllPages = [];
/**
 *  @type {Number} the number of pages are stored in cache
 */


let stringPagesNotToCrawl = await checkKeysCacheExist( numberOfPagesWanted)
let pagesNotToCrawl = parseInt( stringPagesNotToCrawl)+1


console.log("umberOfPagesWanted",numberOfPagesWanted);

const pagesToCrawl =  numberOfPagesWanted - pagesNotToCrawl
//TODO cuando se hace dos veces la misma peticion falla
//TODO cuando no se recoge la cache va bien la longitud del dat pero cuando entras las paginas de cache algo falla
  try {
    for (let i = pagesNotToCrawl; i <= numberOfPagesWanted; i++) {
      console.log(".............",i);
      let dataOnePage = await crawlDataPage(i);

      await saveOnePageToCache(`page${i}`, dataOnePage);
      dataAllPages = [...dataAllPages.concat(dataOnePage)];
      console.log( "dataAllPages antes del ifff",dataAllPages.length)
      if (pagesNotToCrawl-1!==0) {
        console.log("pagesNotToCrawl",pagesNotToCrawl);
        const pagesInCache = await  getPagesInCached(pagesNotToCrawl)
        console.log( "pagesInCache dentro del iffffff", pagesInCache.length)
        dataAllPages = [...dataAllPages.concat(pagesInCache)]
      }
    }
    console.log( "dataAllPages",dataAllPages.length)
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}
