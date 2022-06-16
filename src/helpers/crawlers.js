const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

/**
 * crawled the tags given inside a row of a table
 * @param {String} url the url of the paged to crawled
 * @param {String} selectorTableRow  the css selector of a row inside a table
 * @param {String} selectorTag the css selector of the tags to crawl
 * @returns {Array<Object>} Array with element in the selectorTag
 */

const crawlTableRow = async (url, selectorTableRow, selectorTag) => {
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
 *
 * @param {*} titles
 * @param {*} links
 * @param {*} authors
 * @param {*} comments
 * @returns
 */
const objectCrawl = (titles, links, authors, comments) => {
  const data = titles.map((title, index) => {
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

/**
 * call the function crawlTableRow with the diferent params are needed to crawled, and map all the result to return the page crawled
 * @param {Number} pagesNumber the number of the page wanted
 * @returns {Array<Object>}  the elements crawled of the page
 */
const crawlDataPage = async (pagesNumber) => {
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
  const data = await objectCrawl(titles, links, authors, comments);
  return data;
};

/**
 * check it is posible to transform into a number the request params
 * @param {String} reqParmams the value of the request params
 * @returns {Boolean} true is posible to parse into a number, false if the parse to a number return a false
 */
const isNumber = (reqParmams) => {
  const checkParam = parseInt(reqParmams);
  if (isNaN(checkParam) === true) {
    return false;
  }
  return true;
};

module.exports = { crawlTableRow, crawlDataPage, objectCrawl, isNumber };

