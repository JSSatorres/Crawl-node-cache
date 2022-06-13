import {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
} from "../helpers/cache.js";

import { crawlDataPage } from "../helpers/crawlers.js";

export async function crawlerOnePage(req, res) {
  console.log(checkCachePage("page1"));
  if (checkCachePage("page1") === true) {
    const data = await getOnePageToCache("page1");
    return res.send({ data: data });
  }
  try {
    const data = await crawlDataPage(1);
    await saveOnePageToCache ("page1",data);
    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function crawlerMoreThanOnePage(req, res) {
  const { numberPagesToCraw } = req.params;
  let dataAllPages = [];
  try {
    for (let i = 0; i <= numberPagesToCraw; i++) {
      let dataOnePage = await crawlDataPage(i);
      dataAllPages.push(dataOnePage);
    }
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}
