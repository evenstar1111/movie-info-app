export const discoverUrl = (query_str, key) => {
   const { type, lan, pg, srt, wcst, wcrw, wppl, wgnr, wkw } = query_str;

   return `https://api.themoviedb.org/3/discover/${
      type ? type : 'movie'
   }?${key}&language=${lan ? lan : 'en-US'}&page=${pg ? pg : 1}&sort_by=${
      srt ? srt : 'popularity.desc'
   }&include_adult=false&include_video=&with_cast=${wcst ? wcst : ''}&with_crew=${wcrw ? wcrw : ''}&with_people=${
      wppl ? wppl : ''
   }&with_genres=${wgnr ? wgnr : ''}&without_genres=&with_keywords=${wkw ? wkw : ''}&without_keywords=`;
};

export const discoverTvsUrl = (query_str, key) => {
   const { pg } = query_str;
   return `https://api.themoviedb.org/3/discover/tv?${key}&language=en-US&sort_by=popularity.desc&page=${
      pg ? pg : '1'
   }&timezone=America%2FNew_York&include_null_first_air_dates=false`;
};

export const searchUrl = (type, kw, key) => {
   return `https://api.themoviedb.org/3/search/${type ? type : 'movie'}?${key}&language=en-US&query=${
      kw ? kw : ''
   }&page=1&include_adult=false`;
};

export const movieDetUrl = (m_id, key) => {
   return `https://api.themoviedb.org/3/movie/${m_id ? m_id : ''}?${key}`;
};

export const personDetUrl = (p_id, key) => {
   return `https://api.themoviedb.org/3/person/${p_id ? p_id : ''}?${key}`;
};

export const tvDetUrl = (tv_id, key) => {
   return `https://api.themoviedb.org/3/tv/${tv_id}?${key}&language=en-US`;
};

export const collecDetUrl = (col_id, key) => {
   return `https://api.themoviedb.org/3/collection/${col_id}?${key}&language=en-US`;
};
