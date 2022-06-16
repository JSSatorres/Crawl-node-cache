const {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
  checkKeysCacheExist,
  getPagesInCached,
} = require("../helpers/cache.js");

const { crawlDataPage, isNumber } = require("../helpers/crawlers");
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function crawlerOnePage(req, res) {
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

async function crawlerMoreThanOnePage(req, res) {
  const { numberOfPagesWanted } = req.params;
  console.log(numberOfPagesWanted);

  if ((isNumber(numberOfPagesWanted)) === false)
    return res.json("Not a Number");

  let dataAllPages = [];
  let numberOfPagesWantedToNumber = parseInt(numberOfPagesWanted);
  let stringPagesNotToCrawl = await checkKeysCacheExist(numberOfPagesWantedToNumber);
  let pagesNotToCrawl = parseInt(stringPagesNotToCrawl);
  let pagesToCrawl = numberOfPagesWantedToNumber - pagesNotToCrawl;

  console.log("umberOfPagesWanted", numberOfPagesWantedToNumber);

  //TODO cuando se hace dos veces la misma peticion falla
  //TODO cuando no se recoge la cache va bien la longitud del dat pero cuando entras las paginas de cache algo falla
  // console.log( "pagesInCache antes del forrrrrrrrr", pagesInCache)
  console.log("pagesNotToCrawl antes del forrrrrrrrr", pagesNotToCrawl);
  console.log("numberOfPagesWantedToNumber antes del forrrrrrrrr",numberOfPagesWantedToNumber);
  console.log("pagesToCrawl antes del forrrrrrrrr", pagesToCrawl);

  try {
   


    //crwling pages are not in cache
    for (let i = pagesNotToCrawl; i < numberOfPagesWantedToNumber; i++) {
      console.log(".............", i);
      //TODO el indice que paso deberia ser 1 e i=0 por lo tanto sumo 1
      let dataOnePage = await crawlDataPage(i+1);

      //es cero no hay paginas para traer decache
      console.log("dataOnePage antes del forrrrrrrrr", dataOnePage.lenght);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa      ",`page${i+1}`);

      await saveOnePageToCache(`page${i+1}`, dataOnePage);

      dataAllPages = [...dataAllPages.concat(dataOnePage)];

      console.log("dataAllPages las que se van metiendo antes del ifff", dataAllPages.length);
      console.log("justo antes del ultimo if no entra", pagesNotToCrawl);

    }
     //cachting pages in cache
    if (pagesNotToCrawl  !== 0) {
      console.log("pagesNotToCrawl", pagesNotToCrawl);
      const pagesInCache = await getPagesInCached(pagesNotToCrawl);
      console.log("pagesInCache dentro del iffffff", pagesInCache.length);
      dataAllPages = [...dataAllPages.concat(pagesInCache)];
      console.log(dataAllPages.length);
    }
    console.log("dataAllPages", dataAllPages.length);
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { crawlerOnePage, crawlerMoreThanOnePage };
