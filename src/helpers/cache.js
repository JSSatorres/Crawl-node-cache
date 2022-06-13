import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 100 });

/**
 * stores a page that has been crawled
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @param {Array} value info to store in the cache
 * @returns {void}
 */

export const saveOnePageToCache = (key, value) => {
  myCache.set(key, value, 60);
};

/**
 * check if the key is in the cache
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @returns {Boolean} true: key is stored in cache, false: key is not stored in cache
 */

export const checkCachePage = (key) => {
  console.log("esta es la key", key);
  return myCache.has(key);
};

/**
 * gets the cache value of a given key
 * @param {String} key the key to safe in node-cache, key format: page+Number
 * @returns the value of a given key
 */

export const getOnePageToCache = (key) => {
  return myCache.get(key);
};

/**
 * check the highest number of page in cache, when it finds a page in cache it ends, this means all the lower ones are in cache
 * @param {Number} numberToCheck maximum number of pages to be crawled
 * @returns  {Number} the highest number page in cache
 */

export const checkKeysCacheExist = async (numberToCheck) => {
  const keysToCheck = await myCache.keys();
  let highestNumberPageCached = 0;
  console.log("keys ", keysToCheck);
  console.log("el numero de comprobacion", numberToCheck);

  for (let i = numberToCheck; 1 <= i; i--) {
    console.log("esta oncuida la key", keysToCheck.includes(`page${i}`));
    if (keysToCheck.includes(`page${i}`) === true) {
      let highestNumberPageCached = i;
      break;
    }
  }
  return highestNumberPageCached;
};
/**
 * 
 * @param {*} numberToCheck 
 * @returns 
 */

export const getPagesInCached = async (numberToCheck) => {
  const keysToCheck = await myCache.keys();
  // let keyPagesInCached =[]
  // console.log("keys ",keysToCheck);
  // console.log(numberToCheck);

  for (let i = numberToCheck; 0 < i; i--) {
    console.log(keysToCheck.includes(`page${i}`));
    if (keysToCheck.includes(`page${i}`) === true) {
      const onePageGetitFromCached = await getOnePageToCache(`page${i}`);
      pagesGetitFromCached = [
        ...pagesGetitFromCached.concat(onePageGetitFromCached),
      ];
    }
  }
  return pagesGetitFromCached;
};
