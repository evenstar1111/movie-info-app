export function setCookie(key, value) {
  if (process.browser) cookies.set(key, value, { expires: 7 });
}

export function getCookie(key) {
  if (process.browser) {
    return cookies.get(key);
  }
}

export function removeCookie(key) {
  if (process.browser) cookies.remove(key);
}

export const storeInLocalStorage = (key, value) => {
  if (process.browser) localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  if (process.browser) {
    return JSON.parse(localStorage.getItem(key));
  }
};
