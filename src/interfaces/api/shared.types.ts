export type CommonDiscoverQParams<SortBy extends string> = {
   language?: string;
   page?: string;
   sort_by?: SortBy;
   with_genres?: string;
   without_genres?: string;
   with_keywords?: string;
   without_keywords?: string;
   include_adult?: boolean;
   with_origin_country?: string;
   with_original_language?: string;
};

export type CommonSearchQParams = {
   query: string;
   language?: string;
   page?: number;
   include_adult?: boolean;
};
