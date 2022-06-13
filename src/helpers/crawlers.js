import fetch from "node-fetch";
import * as cheerio from "cheerio";

/**
 * crawled the tags given inside a row of a table
 * @param {String} url the url of the paged to crawled
 * @param {String} selectorTableRow  the css selector of a row inside a table
 * @param {String} selectorTag the css selector of the tags to crawl
 * @returns {Array<Object>} Array with element in the selectorTag
 */

export const crawlTableRow = async (url, selectorTableRow, selectorTag) => {
  const response = await fetch(url);
  const html = await response.text();

  let data = [];
  const $ = cheerio.load(html);
  let tableRow = $("tr").find(selectorTableRow).toArray();

  let i = 1;
  for (let elem of tableRow) {
    let sliceData = $(elem).find(selectorTag).text();
    data = [...data, { info: sliceData, control: i }];
    i += 1;
  }
  return data;
};

/**
 * call the function crawlTableRow with the diferent params are needed to crawled, and map all the result to return the page crawled
 * @param {Number} pagesNumber the number of the page wanted
 * @returns {Array<Object>}  the elements crawled of the page
 */
export const crawlDataPage = async (pagesNumber) => {
  const titles = await crawlTableRow(
    `https://news.ycombinator.com/news?p=${pagesNumber}`,
    ".athing",
    ".titlelink"
  );
  const links = await crawlTableRow(
    `https://news.ycombinator.com/news?p=${pagesNumber}`,
    ".athing",
    ".sitestr"
  );
  const authors = await crawlTableRow(
    `https://news.ycombinator.com/news?p=${pagesNumber}`,
    ".subtext",
    ".hnuser"
  );
  const comments = await crawlTableRow(
    `https://news.ycombinator.com/news?p=${pagesNumber}`,
    ".subtext",
    ".subtext a:nth-child(6)"
  );

  const data = await titles.map((title, index) => {
    return {
      title: title.info,
      link: links[index]?.info,
      author: authors[index]?.info,
      comments: comments[index]?.info,
      control: index,
    };
  });
  return data;
};
