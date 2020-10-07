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

//post request handlers
export const fetchPostReq = async (url, objData) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objData),
  });

  if (!response.ok) {
    return {
      error: response.statusText,
    };
  }

  const data = await response.json();
  return data;
};
