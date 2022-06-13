import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 100 });

export const saveOnePageToCache = (key, value) => {
  myCache.set(key, value, 60);
};

export const checkCachePage = (key) => {
  return myCache.has(key);
};

export const getOnePageToCache =  (key) => {
  return myCache.get(key);
};
