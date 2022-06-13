async function scrapOnePage(req, res) {

  try {
    res.status(200).send({
      data: "info",
    });
  } catch (error) {
    console.log(error);
  }
}

async function scrapXPages(req, res) {
  try {
    res.status(200).send({
      data: "totalInfo",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { scrapOnePage, scrapXPages };
