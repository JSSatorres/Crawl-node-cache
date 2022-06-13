import crawlTableRow from "../utils/utils.js";

export async function scrapOnePage(req, res) {
  try {
    res.status(200).send({
      data: "info",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function crawlerMoreThanOnePage(req, res) {
  try {
    res.status(200).send({
      data: "totalInfo",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function crawlerPage(req, res) {
  try {
    const titles = await crawlTableRow({
      url: "https://news.ycombinator.com/",
      selectorTableRow: ".athing",
      selectorTag: ".titlelink",
    });
    const links = await crawlTableRow({
      url: "https://news.ycombinator.com/",
      selectorTableRow: ".athing",
      selectorTag: ".sitestr",
    });
    const authors = await crawlTableRow({
      url: "https://news.ycombinator.com/",
      selectorTableRow: ".subtext",
      selectorTag: ".hnuser",
    });
    const comments = await crawlTableRow({
      url: "https://news.ycombinator.com/",
      selectorTableRow: ".subtext",
      selectorTag: ".subtext a:nth-child(6)",
    });

    const data = titles.map((title, index) => {
      return {
        title: title.info,
        link: links[index]?.info,
        author: authors[index]?.info,
        comments: comments[index]?.info,
        control: index,
      };
    });

    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}
