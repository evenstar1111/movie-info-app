export type CommonContentProps = {
   backdrop_path: string;
   genre_ids: number[];
   genres?: ContentMetaWName[];
   id: number;
   original_language: string;
   overview: string;
   popularity: number;
   poster_path: string;
   homepage?: string;
   vote_average: number;
   vote_count: number;
   status?: string;
   tagline?: string;
};

export type ContentMetaWName = {
   id: number;
   name: string;
};
