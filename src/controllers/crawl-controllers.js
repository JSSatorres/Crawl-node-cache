import { crawlDataPage} from "../utils/crawlers.js";

export async function crawlerOnePage(req, res) {
  try {
    const data = await crawlDataPage(1)
    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function crawlerMoreThanOnePage(req, res) {
  const {numberPagesToCraw } = req.params;
  let dataAllPages = []
  try {
    for (let i = 0; i <= numberPagesToCraw; i++) {
      let dataOnePage =  await crawlDataPage(i)
      dataAllPages.push(dataOnePage)
    }
    res.status(200).send({
      data: dataAllPages,
    });
  } catch (error) {
    console.log(error);
  }
}
