export const storeInsSessionStorage = (key, value) => {
   if (process.browser) sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (key) => {
   if (process.browser) {
      return JSON.parse(sessionStorage.getItem(key));
   }
};
