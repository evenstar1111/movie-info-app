import cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';
import {
  search_base,
  KEY,
  com_dis_base,
  movie_base,
} from '../config_file';

export const searchMovies = async (term) => {
  try {
    const res = await fetch(`${search_base}?${KEY}&query=${term}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
};

export const discoverMovies = async (page) => {
  const pn = page ? page : '';
  try {
    const res = await fetch(`${com_dis_base}&page=${pn}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
};

export const findMovieDetail = async (movie_id) => {
  try {
    const res = await fetch(`${movie_base}${movie_id}?${KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
};

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

export const storeMovies = (key, value) => {
  if (process.browser)
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalMovies = (key) => {
  if (process.browser) {
    return JSON.parse(localStorage.getItem(key));
  }
};
