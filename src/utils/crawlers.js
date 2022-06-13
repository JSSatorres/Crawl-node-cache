import fetch from "node-fetch";
import * as cheerio from "cheerio";

export const crawlTableRow = async ({ url, selectorTableRow, selectorTag }) => {
  const response = await fetch(url);
  const html = await response.text();

  let data = [];
  const $ = cheerio.load(html);
  let tableRow = $("tr").find(selectorTableRow).toArray();

  let i = 1
  for (let elem of tableRow) {
    let sliceData = $(elem).find(selectorTag).text();
    data = [...data,{info:sliceData ,control:i}];
    i += 1
  }
  return data;
};

export const crawlDataPage = async (pagesNumber) => {
  const titles = await crawlTableRow({
    url: `https://news.ycombinator.com/news?p=${pagesNumber}`,
    selectorTableRow: ".athing",
    selectorTag: ".titlelink",
  });
  const links = await crawlTableRow({
    url: `https://news.ycombinator.com/news?p=${pagesNumber}`,
    selectorTableRow: ".athing",
    selectorTag: ".sitestr",
  });
  const authors = await crawlTableRow({
    url: `https://news.ycombinator.com/news?p=${pagesNumber}`,
    selectorTableRow: ".subtext",
    selectorTag: ".hnuser",
  });
  const comments = await crawlTableRow({
    url: `https://news.ycombinator.com/news?p=${pagesNumber}`,
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
  return data
};




crawlDataPage(2)