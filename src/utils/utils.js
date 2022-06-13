import fetch from "node-fetch";
import * as cheerio from "cheerio";

const crawlTableRow = async ({ url, selectorTableRow, selectorTag }) => {
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

export default crawlTableRow;
