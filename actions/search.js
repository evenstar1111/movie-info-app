import fetch from 'isomorphic-fetch';

export const searchMovis = async (term, setMovies) => {
  const res = await fetch(`${API_URL}s=${term}`);

  const data = await res.json();

  if (!data.Error) setMovies(data);

  console.log(data);
};

const API_URL = 'http://www.omdbapi.com/?apikey=b011fefe&';
