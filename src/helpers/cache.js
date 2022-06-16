const NodeCache = require("node-cache");

//TODO change 100seconds to 300
const myCache = new NodeCache({ stdTTL: 30 });

/**
 * stores a page that has been crawled
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @param {Array<Object>} value info to store in the cache
 * @returns {void}
 */

const saveOnePageToCache = async (key, value) => {
  await myCache.set(key, value, 60);
};

/**
 * check if the key is in the cache
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @returns {Boolean} true: key is stored in cache, false: key is not stored in cache
 */

const checkCachePage = async(key) => {
  console.log("esta es la key", key);
  const keyCache = await myCache.has(key)
  console.log("estee",keyCache);
  return keyCache;
};

/**
 * gets the cache value of a given key
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @returns the value of a given key
 */

const getOnePageToCache = (key) => {
  return myCache.get(key);
};

/**
 * check the highest page number in cache, have a  decreasing loop when it finds a page in cache the loop finish, this means all the lower pages are in cache and it is not necesary to crawl
 * @param {Number} numberToCheck maximum number of pages to be crawled
 * @returns  {Number} the highest number page in cache
 */

const checkKeysCacheExist = async (numberToCheck) => {
  const keysToCheck = await myCache.keys();
  let highestNumberPageCached = 0;

  for (let i = numberToCheck; 1 <= i; i--) {
    if (keysToCheck.includes(`page${i}`) === true) {
      let highestNumberPageCached = i;
      console.log(
        " si entraaaaa highestNumberPageCached",
        highestNumberPageCached
      );
      return highestNumberPageCached;
    }
  }
  console.log("no entraaaa highestNumberPageCached", highestNumberPageCached);
  return highestNumberPageCached;
};
/**
 * get the pages are stored in cache
 * @param {*} numberToCheck the number of pages are checked which were in cache
 * @returns {Array<Object>} all the pages in cache
 */

const getPagesInCached = async (numberToCheck) => {
  const keysToCheck = await myCache.keys();
  // let keyPagesInCached =[]
  // console.log("keys ",keysToCheck);
  // console.log(numberToCheck);
  let pagesGetitFromCached = [];

  for (let i = numberToCheck; 0 < i; i--) {
    console.log(keysToCheck.includes(`page${i}`));
    if (keysToCheck.includes(`page${i}`) === true) {
      const onePageGetitFromCached = await getOnePageToCache(`page${i}`);
      console.log(`page${i}`);
      pagesGetitFromCached = [
        ...pagesGetitFromCached.concat(onePageGetitFromCached),
      ];
    }
  }

  return pagesGetitFromCached;
};

module.exports = {
  saveOnePageToCache,
  checkCachePage,
  getOnePageToCache,
  checkKeysCacheExist,
  getPagesInCached,
  myCache
};
